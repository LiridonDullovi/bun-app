import "./index.css";
import { Routes, Route, Link } from 'react-router-dom';
import CreatePosts from "./components/pages/posts/create";
import ShowPost from "./components/pages/posts/show";
import ListPosts from "./components/pages/posts/list";
import Index from "./components/pages/index";
import EditPost from "./components/pages/posts/edit";

export function App() {
  return (
    <div className="w-full h-full">
      <nav className="bg-gray-800 text-white p-4 mb-4">
        <ul className="flex gap-4">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link to="/posts" className="hover:underline">Posts</Link>
          </li>
          <li>
            <Link to="/new-post" className="hover:underline">New Post</Link>
          </li>
        </ul>
      </nav>
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/posts" element={<ListPosts />} />
          <Route path="/new-post" element={<CreatePosts />} />
          <Route path="/posts/:id" element={<ShowPost />} />
          <Route path="/posts/:id/edit" element={<EditPost />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
