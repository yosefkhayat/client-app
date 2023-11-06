import { makeAutoObservable, runInAction } from "mobx";
import { Listing } from "../models/listing";
import agent from "../api/agent";

export default class ListingStore {
    listingRegistry = new Map<string, Listing>();
    selectedListing: Listing | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor() {
        makeAutoObservable(this)
    }

    get listingByDate() {
        return Array.from(this.listingRegistry.values());
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
        this.listingRegistry.set(listing.id, listing);
    }

    private getListing = (id: string) => {
        return this.listingRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    createListing = async (listing: Listing) => {
        this.loading = true;
        try {
            await agent.Listings.create(listing);
            runInAction(() => {
                this.setListing(listing);
                this.selectedListing = listing;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateListing = async (listing: Listing) => {
        this.loading = true;
        try {
            await agent.Listings.update(listing);
            runInAction(() => {
                this.setListing(listing);
                this.selectedListing = listing;
                this.editMode = false;
                this.loading = false;
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
}