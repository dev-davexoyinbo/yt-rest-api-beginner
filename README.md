# Express Blog API

## Overview
This is a simple Express-based blog API that allows users to create, read, update, and delete blog posts. The API includes authentication for modifying blog posts and logs request details.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The API will run on `http://localhost:3000`

## Endpoints

### 1. Get All Blogs
**GET** `/blogs`

#### Response:
```json
[
  {
    "id": 1,
    "title": "Introduction to TypeScript",
    "content": "TypeScript is a strongly typed superset of JavaScript."
  },
  {
    "id": 2,
    "title": "Building REST APIs with Express",
    "content": "Express makes building APIs fast and easy."
  }
]
```

---

### 2. Get a Blog by ID
**GET** `/blogs/:id`

#### Response:
```json
{
  "id": 1,
  "title": "Introduction to TypeScript",
  "content": "TypeScript is a strongly typed superset of JavaScript."
}
```

---

### 3. Create a Blog (Authenticated)
**POST** `/blogs`

#### Headers:
```json
{
  "Authorization": "Bearer secret-token"
}
```

#### Request Body:
```json
{
  "title": "New Blog Post",
  "content": "This is a new blog post."
}
```

#### Response:
```json
{
  "id": 4,
  "title": "New Blog Post",
  "content": "This is a new blog post."
}
```

---

### 4. Update a Blog (Authenticated)
**PUT** `/blogs/:id`

#### Headers:
```json
{
  "Authorization": "Bearer secret-token"
}
```

#### Request Body:
```json
{
  "title": "Updated Blog Post",
  "content": "This blog has been updated."
}
```

#### Response:
```json
{
  "id": 1,
  "title": "Updated Blog Post",
  "content": "This blog has been updated."
}
```

---

### 5. Delete a Blog (Authenticated)
**DELETE** `/blogs/:id`

#### Headers:
```json
{
  "Authorization": "Bearer secret-token"
}
```

#### Response:
```json
{
  "message": "Blog deleted successfully"
}
```

## Middleware
- **Logging:** Logs all requests with method type and status code.
- **Authentication:** Required for creating, updating, and deleting blogs.

## License
MIT


