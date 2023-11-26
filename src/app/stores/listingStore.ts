import { makeAutoObservable, runInAction } from "mobx";
import { Listing, ListingFormValues } from "../models/listing";
import agent from "../api/agent";
import { store } from "./store";
import { Profile } from "../models/profile";

export default class ListingStore {
    listingRegistry = new Map<string, Listing>();
    selectedListing: Listing | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
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
            this.listingByCity.reduce((listings, listing) => {
                const city = listing.city;
                listings[city] = listings[city] ? [...listings[city], listing] : [listing];
                return listings;
            }, {} as {[key: string]: Listing[]})
        )
    }

    loadListings = async () => {
        this.loadingInitial = true;
        try {
            const listings = await agent.Listings.list();
            listings.forEach(listing => {
                this.setListing(listing);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);        
        }
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
}