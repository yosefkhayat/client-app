import { makeAutoObservable, runInAction } from "mobx";
import { Listing } from "../models/listing";
import agent from "../api/agent";
import { v4 as uuid} from 'uuid'

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
        return Array.from(this.listingRegistry.values()).sort((a, b) =>
            Date.parse(a.dateTime.toString()) - Date.parse(b.dateTime.toString()));
    }

    loadListings = async () => {
        try {
            const listings = await agent.Listings.list();
            listings.forEach(listing => {
                this.listingRegistry.set(listing.id, listing);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);

            this.setLoadingInitial(false);        
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    selectListing = (id: string) => {
        this.selectedListing = this.listingRegistry.get(id);
    }

    cancelSelectedListing = () => {
        this.selectedListing = undefined;
    }

    openForm = (id?: string) => {
        id ? this.selectListing(id) : this.cancelSelectedListing();
        this.editMode = true;
    }

    closeForm = () => {
        this.editMode = false;
    }

    createListing = async (listing: Listing) => {
        this.loading = true;
        listing.id = uuid();
        try {
            await agent.Listings.create(listing);
            runInAction(() => {
                this.listingRegistry.set(listing.id, listing);
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
                this.listingRegistry.set(listing.id, listing);
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
                if (this.selectedListing?.id === id) this.cancelSelectedListing();
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