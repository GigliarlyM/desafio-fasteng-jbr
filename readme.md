# Fasteng JBR

This repository contains two main components: a client-side application (`fasteng-jbr-client`) and a server-side application (`fasteng-jbr-server`).

## fasteng-jbr-client

- **Name:** fasteng-jbr-client
- **Version:** 0.1.0
- **Description:** A Next.js client application for managing books. It interacts with the `fasteng-jbr-server` API to fetch, add, and delete book records.
- **Key Technologies:**
    - Next.js (v16.0.2)
    - React (v19.2.0)
    - Axios (v1.13.2) for API communication
    - React Toastify (v11.0.5) for notifications
    - Tailwind CSS for styling

## fasteng-jbr-server

- **Name:** fasteng-jbr-server
- **Version:** 0.0.1
- **Description:** An Express.js server that provides a RESTful API for book management. It handles data persistence and serves as the backend for the client application.
- **Key Technologies:**
    - Express.js (v5.1.0)
    - MongoDB (via Mongoose v8.19.3)
    - CORS (v2.8.5) for cross-origin resource sharing
    - TypeScript (v5.9.3)

## Server API Endpoints

The server exposes the following endpoints for book management:

- **`GET /livros`**: Fetches a list of all books from the database.
- **`POST /livros`**: Adds a new book to the database. The book data should be sent in the request body.
- **`DELETE /livros/:id`**: Deletes a book from the database based on its unique ID.

## Getting Started

(Further instructions on how to set up and run the client and server would go here.)
