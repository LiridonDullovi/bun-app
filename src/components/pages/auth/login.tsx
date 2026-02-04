import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription,  CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setToken } from "@/lib/token"

export default function Login() {
    
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
            const endpoint = '/api/auth/login';
            const url = new URL(endpoint, location.href);
            const method = 'POST';
            const email = formData.get("email") as string;
            const password = formData.get("password") as string;

            const res = await fetch(url, { 
                method, 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password}),
            });

            const data = await res.json();

            if(data.access_token) {
                setToken(data.access_token);
                window.location.href = "/";
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
                    <CardTitle className="text-3xl font-bold">Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access your account.
                    </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleLogin} method="POST">
                            <Label htmlFor="email" className="mb-2">Email:</Label>
                            <Input type="email" id="email" name="email" required className="mb-4" />
                            <Label htmlFor="password" className="mb-2">Password:</Label>
                            <Input type="password" id="password" name="password" required className="mb-4" />
                            <Button type="submit">Login</Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}