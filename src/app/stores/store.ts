
import ListingStore from "./listingStore";
import { createContext, useContext } from "react";

interface Store {
    listingStore: ListingStore
}

export const store: Store = {
    listingStore: new ListingStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}