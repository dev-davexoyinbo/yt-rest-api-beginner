import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 3003;

app.use(bodyParser.json());

// Middleware to log request methods and status codes
app.use((req: Request, res: Response, next: NextFunction) => {
  res.on("finish", () => {
    console.log(
      `[${new Date().toISOString()}] ${req.method} ${req.url} - ${res.statusCode}`,
    );
  });
  next();
});
interface Blog {
  id: number;
  title: string;
  content: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: "Introduction to TypeScript",
    content: "TypeScript is a strongly typed superset of JavaScript.",
  },
  {
    id: 2,
    title: "Building REST APIs with Express",
    content: "Express makes building APIs fast and easy.",
  },
  {
    id: 3,
    title: "Authentication in Node.js",
    content: "Learn how to secure your APIs using authentication techniques.",
  },
];

// Middleware for authentication
const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Bearer secret-token") {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  next();
};

// Create a blog (Authenticated)
app.post("/blogs", authenticate, (req: Request, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ message: "Title and content are required" });
    return;
  }
  const newBlog: Blog = { id: blogs.length + 1, title, content };
  blogs.push(newBlog);
  res.status(201).json(newBlog);
});

// Get all blogs
app.get("/blogs", (_req: Request, res: Response) => {
  res.json(blogs);
});

// Get a single blog by ID
app.get("/blogs/:id", (req: Request, res: Response) => {
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  res.json(blog);
});

// Update a blog by ID (Authenticated)
app.put("/blogs/:id", authenticate, (req: Request, res: Response) => {
  const blog = blogs.find((b) => b.id === parseInt(req.params.id));
  if (!blog) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  const { title, content } = req.body;
  if (title) blog.title = title;
  if (content) blog.content = content;
  res.json(blog);
});

// Delete a blog by ID (Authenticated)
app.delete("/blogs/:id", authenticate, (req: Request, res: Response) => {
  const index = blogs.findIndex((b) => b.id === parseInt(req.params.id));
  if (index === -1) {
    res.status(404).json({ message: "Blog not found" });
    return;
  }
  blogs.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
