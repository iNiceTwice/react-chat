export interface HomeState {
    authOption: "login" | "register" | "guest" | null
}

export interface User {
    username: string,
    email:string,
    password:string
}