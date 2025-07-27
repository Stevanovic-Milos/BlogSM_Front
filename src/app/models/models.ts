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
export interface Blog {
    id: number
    title: string;
    content: string;
    author: string;
    category: string;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface MyResponse {
    message: string;
    success: boolean;
}
export interface CreateBlogRequest {
    id?: number,
    title: string;
    content: string;
    category: string;
    imageUrl: string;
}
export interface User {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role?: string;
}