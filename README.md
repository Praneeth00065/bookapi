# Book Management API 📚

This is a RESTful API for managing books, built with Node.js, Express, and MongoDB.

## 🚀 Setup Instructions

1. **Clone the Repository**
    ```sh
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install Dependencies**
    ```sh
    npm install
    ```

3. **Set Up Environment Variables**
    Create a [.env](http://_vscodecontentref_/0) file and add:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_USER_PASSWORD=your_secret_key
    PORT=5000
    ```

4. **Start the Server**
    ```sh
    npm start
    ```
    or (for development with auto-reload)
    ```sh
    npm run dev
    ```

## 📌 API Endpoints

### Authentication

#### Signup
```sh
curl -X POST http://localhost:5000/auth/signup -H "Content-Type: application/json" -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'

📌 API Endpoints
**Authentication**
**Signup**

curl -X POST http://localhost:5000/auth/signup -H "Content-Type: application/json" -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}'
**Login**
curl -X POST http://localhost:5000/auth/login -H "Content-Type: application/json" -d '{
    "email": "john@example.com",
    "password": "password123"
}'
Books
**Get All Books**
curl -X GET http://localhost:5000/books -H "token: your_jwt_token"
**Add a Book**
curl -X POST http://localhost:5000/books -H "Content-Type: application/json" -H "token: your_jwt_token" -d '{
    "title": "The Alchemist",
    "author": "Paulo Coelho",
    "publishedYear": 1988
}'
📌 Postman Collection
Open Postman.
Go to Collections > Import.
Import the postman_booksapi_collection.json (attached in the repo).
✅ Now you can test the API in Postman!
 
   


