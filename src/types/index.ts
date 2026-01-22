export interface Post {
    id: number | string;
    title: string;
    description: string;
    author: string;
    duration: string;
}

export interface PostData {
    message: string;
    post: Post;
}

export interface PostListData {
    message: string;
    posts: Post[];
}