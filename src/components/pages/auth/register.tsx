import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { FormEvent } from "react"
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const navigate = useNavigate();
    
    const register = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const endpoint = '/api/users/create';
            const url = new URL(endpoint, location.href);
            const method = 'POST';
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;
            const confirmPassword = formData.get("confirmPassword") as string;

            const res = await fetch(url, { 
                method, 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password, confirmPassword}),
            });

            const data = await res.json();

            if(data.registerSuccess) {
                navigate('/login', { replace: true });
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
        <div className="flex justify-center items-center">
            <Card className="min-w-sm">
                <CardHeader className="gap-4">
                <CardTitle className="text-3xl font-bold">Register</CardTitle>
                <CardDescription>
                    Enter your details to create an account.
                </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={register} method="POST">
                        <Label htmlFor="name" className="mb-2">Name:</Label>
                        <Input type="text" id="name" name="name" required className="mb-4" />
                        <Label htmlFor="email" className="mb-2">Email:</Label>
                        <Input type="email" id="email" name="email" required className="mb-4" />
                        <Label htmlFor="password" className="mb-2">Password:</Label>
                        <Input type="password" id="password" name="password" required className="mb-4" />
                        <Label htmlFor="confirmPassword" className="mb-2">Confirm Password:</Label>
                        <Input type="password" id="confirmPassword" name="confirmPassword" required className="mb-4" />
                        <Button type="submit">Register</Button>
                    </form>
                </CardContent>
            </Card>
            </div>
        </>
    )
}