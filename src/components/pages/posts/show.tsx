import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import type { PostData } from "@/types";
import { isAuthenticated, isAuthorized } from "@/lib/auth";

export default function ShowPost () {
    const { id } = useParams();
    const [ post_data, setPostData ] =  useState<PostData | null>(null);

    useEffect(() => {
        async function fetchPosts() {
            const response = await fetch('/api/posts/'+id);
            const data = await response.json();
            setPostData(data);
        }
        fetchPosts();
    }, [id]);

    return (
        <>
            <Card>
                <CardHeader className="gap-4">
                    <div className="flex justify-between">
                        <CardTitle className="text-3xl font-bold">{post_data?.post?.title ?? 'Not Found'}</CardTitle>
                        <div className="flex gap-4">
                            {isAuthenticated() && isAuthorized(post_data?.post?.author ?? '') && (
                                <Button asChild variant="outline">
                                    <Link to={`/posts/${id}/edit`}>
                                    Edit
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                    <CardDescription>
                        {post_data?.post?.author_name ?? post_data?.post?.author ?? 'Unknown Author'} - {post_data?.post?.duration ?? 'N/A'} minutes read
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {post_data?.post?.description ?? 'No description available.'}
                </CardContent>
            </Card>
        </>
    )
}