import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { PostListData } from "@/types";
import { isAuthenticated, isAuthorized } from "@/lib/auth";

export default function ListPosts () {
    const [ post_data, setPostData ] =  useState<PostListData | null>();

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPostData(data);
        }
        fetchPosts();
    }, []);

    const deletePost = async (id: string | number, event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        event.preventDefault();
        
        try {
            const endpoint = `/api/posts/${id}`;
            const url = new URL(endpoint, location.href);
            const method = 'DELETE';

            const res = await fetch(url, { method });
            const data = await res.json();
            
            // Remove the deleted post from the state
            setPostData((prevData: any) => {
                if (!prevData) return prevData;
                return {
                    ...prevData,
                    posts: prevData.posts.filter((post: any) => post.id !== id)
                };
            });
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <>
            <Card>
                <CardHeader className="gap-4">
                <CardTitle className="text-3xl font-bold">List Posts</CardTitle>
                <CardDescription>
                    List of all posts will appear here.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <ItemGroup className="gap-4">
                    {post_data?.posts?.map((post) => (
                        <Item key={post.id} variant="outline" asChild role="listitem">
                            <Link to={`/posts/${post.id}`}>
                                <ItemMedia variant="image">

                                </ItemMedia>
                                <ItemContent>
                                    <ItemTitle className="line-clamp-1">
                                    {post.title} -{" "}
                                    <span className="text-muted-foreground">{post.author_name ?? post.author} {post.author_email && `(${post.author_email})`}</span>
                                    </ItemTitle>
                                    <ItemDescription>{post.description}</ItemDescription>
                                </ItemContent>
                                <ItemContent className="flex-none text-center items-end">
                                    <ItemDescription>{post.duration} min</ItemDescription>
                                    {isAuthenticated() && isAuthorized(post.author) && (
                                        <Button onClick={(e) => deletePost(post.id, e)} type="button" variant="destructive">
                                            Delete
                                        </Button>
                                    )}
                                </ItemContent>
                            </Link>
                        </Item>
                        ))}
                    </ItemGroup>
                </CardContent>
            </Card>
        </>
    )
}