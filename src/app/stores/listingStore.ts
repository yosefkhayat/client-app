import { makeAutoObservable, reaction, runInAction } from "mobx";
import { Listing, ListingFormValues } from "../models/listing";
import agent from "../api/agent";
import { store } from "./store";
import { Profile } from "../models/profile";
import { Pagination, PagingParams } from "../models/pagination";

export default class ListingStore {
    listingRegistry = new Map<string, Listing>();
    selectedListing: Listing | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;
    pagination: Pagination | null = null;
    pagingParams = new PagingParams();
    predicate = new Map().set('all', true);

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.predicate.keys(),
            () => {
                this.pagingParams = new PagingParams();
                this.listingRegistry.clear();
                this.loadListings();
            }
        )
    }

    setPagingParams = (pagingParams: PagingParams) => {
        this.pagingParams = pagingParams;
    }

    setPredicate = (predicate: string, value: string | Date) => {
        const resetPredicate = () => {
            this.predicate.forEach((value, key) => {
                this.predicate.delete(key);
            })
        }
        switch (predicate) {
            case 'all':
                resetPredicate();
                this.predicate.set('all', true);
                break;
            case 'isVisiting':
                resetPredicate();
                this.predicate.set('isVisiting', true);
                break;
            case 'isCreator':
                resetPredicate();
                this.predicate.set('isCreator', true);
                break;
        }
    }

    get axiosParams() {
        const params = new URLSearchParams();
        params.append('pageNumber', this.pagingParams.pageNumber.toString());
        params.append('pageSize', this.pagingParams.pageSize.toString());
        this.predicate.forEach((value, key) => { 
            params.append(key, value);
        });
        return params;
    }

    get listingByDate() {
        return Array.from(this.listingRegistry.values()).sort((a, b) =>
            a.dateTime!.getTime() - b.dateTime!.getTime());
    }
    get listingByCity() {
        return Array.from(this.listingRegistry.values()).sort((a, b) =>
            a.city.localeCompare(b.city));
    }
    
    get groupedListings() {
        return Object.entries(
            this.listingByDate.reduce((listings, listing) => {
                const dateTime = listing.dateTime!.toISOString().split('T')[0];
                listings[dateTime] = listings[dateTime] ? [...listings[dateTime], listing] : [listing];
                return listings;
            }, {} as {[key: string]: Listing[]})
        )
    }

    loadListings = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Listings.list(this.axiosParams);
            result.data.forEach(listing => {
                this.setListing(listing);
            })
            this.setPagination(result.pagination);
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);        
        }
    }

    setPagination = (pagination: Pagination) => {
        this.pagination = pagination;
    }

    loadListing = async (id: string) => {
        let listing = this.getListing(id);
        if (listing) {
            this.selectedListing = listing;
            return listing;
        } else {
            this.loadingInitial = true;
            try {
                listing = await agent.Listings.details(id);
                this.setListing(listing);
                runInAction(() => {
                    this.selectedListing = listing;

                })
                this.setLoadingInitial(false);
                return listing;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setListing = (listing: Listing) => {
        const user = store.userStore.user;
        if (user) {
            listing.isVisiting = listing.visitors!.some(
                a => a.username === user.username
            )
            listing.isCreator = listing.creatorUsername === user.username;
            listing.creator = listing.visitors?.find(x => x.username === listing.creatorUsername);
        }
        listing.dateTime = new Date(listing.dateTime!);
        this.listingRegistry.set(listing.id, listing);
    }

    private getListing = (id: string) => {
        return this.listingRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createListing = async (listing: ListingFormValues) => {
        const user = store.userStore.user;
        const visitor = new Profile(user!);
        try {
            await agent.Listings.create(listing);
            const newListing = new Listing(listing);
            newListing.creatorUsername = user!.username;
            newListing.visitors = [visitor];
            this.setListing(newListing);
            runInAction(() => {
                this.selectedListing = newListing;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateListing = async (listing: ListingFormValues) => {

        try {
            await agent.Listings.update(listing);
            runInAction(() => {
                if (listing.id) {
                    let updatedListing = { ...this.getListing(listing.id), ...listing };
                    this.listingRegistry.set(listing.id, updatedListing as Listing);
                    this.selectedListing = updatedListing as Listing;
                }    
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteListing = async (id: string) => {
        this.loading = true;
        try {
            await agent.Listings.delete(id);
            runInAction(() => {
                this.listingRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateVisitor = async () => {
        const user = store.userStore.user;
        this.loading = true;
        try {
            await agent.Listings.visit(this.selectedListing!.id);
            runInAction(() => {
                if (this.selectedListing?.isVisiting) {
                    this.selectedListing.visitors =
                        this.selectedListing.visitors?.filter(a => a.username !== user?.username);
                    this.selectedListing.isVisiting = false;
                } else {
                    const visitor = new Profile(user!);
                    this.selectedListing?.visitors?.push(visitor);
                    this.selectedListing!.isVisiting = true;
                }
                this.listingRegistry.set(this.selectedListing!.id, this.selectedListing!);
            })
        } catch (error) {
            console.log(error);
        } finally {
            runInAction(() => this.loading = false);
        }
    }

    cancelVisitaionToggle = async () => {
        this.loading = true;
        try {
            await agent.Listings.visit(this.selectedListing!.id);
            runInAction(() => {
                this.selectedListing!.isCancelled = !this.selectedListing?.isCancelled;
                this.listingRegistry.set(this.selectedListing!.id, this.selectedListing!);
            })
        } catch (erro) {

        } finally {
            runInAction(() => this.loading = false);
        }
    }

    clearSelectedListing = () => {
        this.selectedListing = undefined;
    }

    updateVisitorFollowing = (username: string) => {
        this.listingRegistry.forEach(listing => {
            listing.visitors.forEach((visitor: Profile) => {
                if (visitor.username === username) {
                    visitor.following ? visitor.followersCount-- : visitor.followersCount++;
                    visitor.following = !visitor.following;
                }
            })
        })
    }

    updateProfileDisplayName = (profile: Partial<Profile>) => {
        this.listingRegistry.forEach(listing => {
            listing.visitors.forEach(visitor => {
                if (profile.displayName &&
                    visitor.username === store.userStore.user?.username &&
                    visitor.displayName !== profile.displayName) {
                    visitor.displayName = profile.displayName;
                    visitor.bio = profile.bio;
                };
            });
            if (profile.displayName &&
                    listing.creator?.username === store.userStore.user?.username &&
                    listing.creator?.displayName !== profile.displayName)
                {
                    listing.creator!.displayName = profile.displayName;
                    listing.creator!.bio = profile.bio;
                }
        })
    }


    reset = () => {
        this.listingRegistry.clear();
        this.clearSelectedListing();

    }

}