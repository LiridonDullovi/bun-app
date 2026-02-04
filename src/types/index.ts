export interface Post {
    id: number | string;
    title: string;
    description: string;
    author: string;
    duration: string;
    author_name?: string;
    author_email?: string;
}

export interface PostData {
    message: string;
    post: Post;
}

export interface PostListData {
    message: string;
    posts: Post[];
}

export interface User {
    id: number | string;
    name: string;
    email: string;
    password: string;
}

export interface UserData {
    message: string;
    user: User;
}

export interface UserListData {
    message: string;
    users: User[];
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}