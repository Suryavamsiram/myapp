# Flashcard App

A simple flashcard app with user authentication using JWT and MongoDB as the database.

## Features

- User registration and login
- Create, update, and delete flashcards
- Organize flashcards by category
- Secure authentication with JWT

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` file
4. Start the server: `npm run dev`

## Environment Variables

- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT

## Running the App

- Start the server: `npm run dev`
- The server will run on `http://localhost:5000`

## API Endpoints

- `/api/users/register`: Register a new user
- `/api/users/login`: Login a user
- `/api/users/me`: Get user profile (requires authentication)
- `/api/flashcards`: CRUD operations for flashcards (requires authentication)
- `/api/categories`: CRUD operations for categories (requires authentication)