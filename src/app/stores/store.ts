
import CommonStore from "./commonStore";
import ListingStore from "./listingStore";
import { createContext, useContext } from "react";

interface Store {
    listingStore: ListingStore
    commonStore: CommonStore;
}

export const store: Store = {
    listingStore: new ListingStore(),
    commonStore: new CommonStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}