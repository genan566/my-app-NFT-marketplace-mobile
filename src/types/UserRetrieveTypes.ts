
export interface UserRetrieveInterface2 {
    email: string,
    pseudo: string,
    name: string,
    image: string | null,
    id?: number,
}
export interface UserRetrieveInterface extends UserRetrieveInterface2 {
    is_staff: boolean,
    is_superuser: boolean,
}

