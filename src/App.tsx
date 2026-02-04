import "./index.css";
import { Routes, Route, Link } from 'react-router-dom';
import CreatePosts from "./components/pages/posts/create";
import ShowPost from "./components/pages/posts/show";
import ListPosts from "./components/pages/posts/list";
import Index from "./components/pages/index";
import EditPost from "./components/pages/posts/edit";
import Register from "./components/pages/auth/register";
import Login from "./components/pages/auth/login";
import { isAuthenticated } from "./lib/auth";
import { Button } from "./components/ui/button";
import { logout } from "./lib/token";

export function App() {
  return (
    <div className="w-full h-full">
      <nav className="bg-primary flex items-center text-white p-4 mb-4">
        <ul className="flex gap-4">
          <li>
            <Button asChild variant="ghost">
              <Link to="/" >Home</Link>
            </Button>
          </li>
          <li>
            <Button asChild variant="ghost">
              <Link to="/posts" >Posts</Link>
            </Button>
          </li>
          {isAuthenticated() && (
          <li>
            <Button asChild variant="ghost">
              <Link to="/new-post" >New Post</Link>
            </Button>
          </li>
          )}
        </ul>
        <ul className="flex gap-4 ml-auto">
          {isAuthenticated() ? (
            <li>
              <Button variant="ghost" onClick={logout} >Logout</Button>
            </li>
          ) :
            (
              <>
                <li>
                  <Button asChild variant="ghost">
                    <Link to="/login" >Login</Link>
                  </Button>
                </li>
                <li>
                  <Button asChild variant="ghost">
                    <Link to="/register" >Register</Link>
                  </Button>
                </li>
              </>
            )}
        </ul>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/posts" element={<ListPosts />} />
          <Route path="/new-post" element={<CreatePosts />} />
          <Route path="/posts/:id" element={<ShowPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
