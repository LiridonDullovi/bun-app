import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import "../../../index.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, type FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "react-router-dom";
import type { Post, PostData } from "@/types";

export default function EditPost () {
    const id = useParams().id;
    const [post, setPost] = useState<Post | null>(null);
    const [editedPost, setEditedPost] = useState<PostData | null>(null);

    useEffect(() => { 
        async function fetchPost() {
            const response = await fetch('/api/posts/'+id);
            const data = await response.json();
            setPost(data.post);
        }
        fetchPost();
    }, [id]);

    const editPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const endpoint = `/api/posts/${id}`;
            const url = new URL(endpoint, location.href);
            const method = 'PUT';
            const title = formData.get("title") as string;
            const description = formData.get("description") as string;
            const author = formData.get("author") as string;
            const duration = formData.get("duration") as string;

            const res = await fetch(url, { 
                method, 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({title, description, author, duration}),
            });
            const data = await res.json();
            setEditedPost(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card>
            <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Edit Post {post?.title}</CardTitle>
            <CardDescription>
                Edit the post using the form below.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={editPost} className="flex flex-col items-start gap-2">
                    <Label htmlFor="title" className="sr-only">
                        Title
                    </Label>
                    <Input id="title" type="text" name="title" placeholder="Lorem Ipsum" defaultValue={post?.title} />
                    <Label htmlFor="description" className="sr-only">
                        Description
                    </Label>
                    <Textarea id="description" name="description" placeholder="Post description..." defaultValue={post?.description} />
                    <Label htmlFor="author" className="sr-only">
                        Author
                    </Label>
                    <Input id="author" type="text" name="author" placeholder="Author name" defaultValue={post?.author} />
                    <Label htmlFor="duration" className="sr-only">
                        Duration
                    </Label>
                    <Input id="duration" type="text" name="duration" placeholder="Duration in minutes" defaultValue={post?.duration} />
                    <Button type="submit" variant="default">
                        Edit
                    </Button>
                </form>
                {editedPost && (
                    <div className="mt-4 p-4 border rounded bg-green-50 w-full">
                        <h3 className="text-lg font-bold mb-2">Post Edited Successfully!</h3>
                        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(editedPost, null, 2)}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
      </>
    )
}