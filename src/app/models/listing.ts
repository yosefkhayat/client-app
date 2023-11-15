export interface Listing {
    id:         string;
    address:    string;
    city:       string;
    region:     string;
    postalCode: string;
    price:      number;
    area:       number;
    dateTime:   Date | null;
}
