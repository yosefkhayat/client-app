
import CommonStore from "./commonStore";
import ListingStore from "./listingStore";
import { createContext, useContext } from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStore";

interface Store {
    listingStore: ListingStore
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    listingStore: new ListingStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}