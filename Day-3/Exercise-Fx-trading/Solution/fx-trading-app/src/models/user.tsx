export interface User {
    id?: number;
    username: string;
    email?: string
    password: string;
    confirmPassword?: string;
}

export interface AuthResponse {
    username?: string;
    token?: string
    message?: string;
    status?: number;
}