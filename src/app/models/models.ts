export interface loginRequest {
    username: string;
    password: string;
}

export interface loginResponse {
    token: string;
    success: boolean;
}

export interface RegisterRequest {
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
}