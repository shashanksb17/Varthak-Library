# Varthak-Library

Certainly! Below is the table of contents along with an example demonstrating how to register a new user:

### Table of Contents:

1. [Introduction](#1-introduction)
2. [Installation](#2-installation)
3. [Database Configuration](#3-database-configuration)
4. [Running the App](#4-running-the-app)
5. [APIs](#5-apis)
   - [Register a New User](#register-a-new-user)
   - [Login and Get JWT Token](#login-and-get-jwt-token)
   - [Create a New Book](#create-a-new-book)
   - [Get Books](#get-books)
6. [Note](#6-note)


### 1. Introduction:

The Library App is a Node.js application that provides APIs for managing books and user authentication. This guide will walk you through the installation, setup, and usage of the app.

### 2. Installation:

To install and run the app, follow these steps:

   ```bash
   git clone https://github.com/shashanksb17/Varthak-Library.git
   cd Varthak-Library
   npm install
   ```

### 3. Database Configuration:

Update the `.env` file with the MongoDB connection URL and JWT secret key:

   ```
   MONGO_URL=your_mongo_db_connection_url
   SECRET_KEY=your_secret_key_for_jwt
   ```

### 4. Running the App:

Start the app using:

   ```bash
   npm start
   ```

The app will be running at `http://localhost:3000`.

### 5. APIs:

#### Register a New User:

**POST /users/register**

**Request Body:**
```json
{
  "username": "sonu",
  "password": "1234",
  "roles": ["VIEWER","CREATOR","VIEW_ALL"]
}
```

**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### Login and Get JWT Token:

**POST /users/login**

**Request Body:**
```json
{
  "username": "sonu",
  "password": "1234"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "your_jwt_token"
}
```

#### Create a New Book:

**POST /books**

**Request Body:**
```json
{
  "title": "Breaking Bad"
}
```

**Response:**
```json
{
  "title": "Breaking Bad",
  "creator": "sonu",
  "createdAt": "2023-11-15T12:00:00.000Z"
}
```

#### Get Books:

**GET /books**

**Response:**
```json
[
  {
    "title": "Breaking Bad",
    "creator": "sonu",
    "createdAt": "2023-11-15T12:00:00.000Z"
  }
]
```

### 6. Note:

- Ensure you replace placeholder values (like `your_mongo_db_connection_url`, `your_secret_key_for_jwt`, `yourUsername`, `yourPassword`, and `YOUR_JWT_TOKEN`) with actual values.
- The app uses JWT for authentication. Include the JWT token obtained during login in the `Authorization` header for protected routes.

