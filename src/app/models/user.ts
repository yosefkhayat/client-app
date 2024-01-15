export interface User {
    displayName: string;
    token: string;
    username: string;
    image?: string;
    roles: string[];
    email?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
    bio?: string;
}