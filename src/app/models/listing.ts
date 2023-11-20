import { Profile } from "./profile";

export interface Listing {
    id:         string;
    address:    string;
    city:       string;
    region:     string;
    postalCode: string;
    price:      number;
    area:       number;
    dateTime: Date | null;
    description: string;
    creatorUsername: string;
    isCancelled: boolean;
    isVisiting: boolean;
    isCreator: boolean;
    creator?: Profile;
    visitors: Profile[];
}

export class Listing implements Listing {
    constructor(init?: ListingFormValues) {
        Object.assign(this, init);
    }
}

export class ListingFormValues {
    id?: string = undefined;
    address: string = '';
    city: string = '';
    region: string = '';
    postalCode: string = '';
    price: number = 0;
    area: number = 0;
    dateTime: Date | null = null;
    description: string = '';

    constructor(listing?: ListingFormValues) {
        if (listing) {
            this.id = listing.id;
            this.address = listing.address;
            this.city = listing.city;
            this.region = listing.region;
            this.postalCode = listing.postalCode;
            this.price = listing.price;
            this.area = listing.area;
            this.dateTime = listing.dateTime;
            this.description = listing.description;
        }
    }
}
