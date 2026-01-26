import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, type FormEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import type { PostData } from "@/types";

export default function CreatePosts () {
    const [createdPost, setCreatedPost] = useState<PostData | null>(null);
    const createPost = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const endpoint = '/api/posts/create';
            const url = new URL(endpoint, location.href);
            const method = 'POST';
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
            setCreatedPost(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Card>
            <CardHeader className="gap-4">
            <CardTitle className="text-3xl font-bold">Create Post</CardTitle>
            <CardDescription>
                Create a new post using the form below.
            </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={createPost} className="flex flex-col items-start gap-2">
                    <Label htmlFor="title" className="sr-only">
                        Title
                    </Label>
                    <Input id="title" type="text" name="title" placeholder="Post title" />
                    <Label htmlFor="description" className="sr-only">
                        Description
                    </Label>
                    <Textarea id="description" name="description" placeholder="Post description..." />
                    <Label htmlFor="author" className="sr-only">
                        Author
                    </Label>
                    <Input id="author" type="text" name="author" placeholder="Author name" />
                    <Label htmlFor="duration" className="sr-only">
                        Duration
                    </Label>
                    <Input id="duration" type="text" name="duration" placeholder="Duration in minutes" />
                    <Button type="submit" variant="default">
                        Create
                    </Button>
                </form>
                {createdPost && (
                    <div className="mt-4 p-4 border rounded bg-green-50 w-full">
                        <h3 className="text-lg font-bold mb-2">Post Created Successfully!</h3>
                        <pre className="whitespace-pre-wrap break-all">{JSON.stringify(createdPost, null, 2)}</pre>
                    </div>
                )}
            </CardContent>
        </Card>
      </>
    )
}