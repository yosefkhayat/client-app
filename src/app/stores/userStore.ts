import { makeAutoObservable, runInAction } from "mobx";
import { User, UserFormValues } from "../models/user";
import agent from "../api/agent";
import { store } from "./store";
import { history } from "../..";

export default class UserStore {
    user: User | null = null;
    userRegistry = new Map<string, User>();
    loadingInitial = false;
    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    get isLoggerdIn() {
        return !!this.user;
    }

    login = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.login(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/listings');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }


    logout = () => {
        store.commonStore.setToken(null);
        store.listingStore.reset();
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUser = async () => {
        try {
            const user = await agent.Account.current();
            runInAction(() => this.user = user);
            console.log(user);
        } catch (error) {
            console.log(error);
        }
    }

    register = async (creds: UserFormValues) => {
        try {
            const user = await agent.Account.register(creds);
            store.commonStore.setToken(user.token);
            runInAction(() => this.user = user);
            history.push('/listings');
            store.modalStore.closeModal();
        } catch (error) {
            throw error;
        }
    }

    setImage = (image: string) => {
        if (this.user) this.user.image = image;
    }

    setDisplayName = (name: string) => {
        if (this.user) this.user.displayName = name;
    }

    loadUsers = async () => {
        this.loadingInitial = true;
        try {
            const result = await agent.Account.list();
            runInAction(() => {
                result.forEach(user => {
                    this.userRegistry.set(user.username, user);
                })
            })
            this.setLoadingInitial(false);
            return result;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    deleteUser = async (username: string) => {
        this.loading = true;
        try {
            await agent.Account.delete(username);
            runInAction(() => {
                this.userRegistry.delete(username);
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    get getUsers() {
        return Array.from(this.userRegistry.values());
    }
}