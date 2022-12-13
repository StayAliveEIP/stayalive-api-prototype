// create a types in TypeScript associated with the user model

export interface UserType {
    _id: string;
    email: string;
    pwdHash: string;
}