"use client";

import { useState, useEffect } from "react";
import { Book } from "./lib/types";
import { getBooks, addBook, deleteBook } from "./lib/api";
import { toast } from 'react-toastify';

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState({ titulo: "", autor: "", preco: "" });

  const fetchBooks = async () => {
    try {
      const fetchedBooks = await getBooks();
      setBooks(fetchedBooks);
      toast.success("Books fetched successfully!");
    } catch (error) {
      console.error("Failed to fetch books:", error);
      toast.error("Failed to fetch books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault();
    const preco = parseFloat(newBook.preco);
    if (isNaN(preco)) {
      toast.error("Invalid price. Please enter a valid number.");
      return;
    }
    try {
      await addBook({
        titulo: newBook.titulo,
        autor: newBook.autor,
        preco: preco,
        _id: undefined
      });
      setNewBook({ titulo: "", autor: "", preco: "" });
      fetchBooks(); // Re-fetch books to update the list
      toast.success("Book added successfully!");
    } catch (error) {
      console.error("Failed to add book:", error);
      toast.error("Failed to add book.");
    }
  };

  const handleDeleteBook = async (id: string) => {
    try {
      await deleteBook(id);
      fetchBooks(); // Re-fetch books to update the list
      toast.success("Book deleted successfully!");
    } catch (error) {
      console.error("Failed to delete book:", error);
      toast.error("Failed to delete book.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <h1 className="text-4xl font-bold mb-8">Our Books</h1>

        <form onSubmit={handleAddBook} className="mb-8 w-full">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Title"
              value={newBook.titulo}
              onChange={(e) => setNewBook({ ...newBook, titulo: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={newBook.autor}
              onChange={(e) => setNewBook({ ...newBook, autor: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newBook.preco}
              onChange={(e) => setNewBook({ ...newBook, preco: e.target.value })}
              className="p-2 border rounded"
              required
            />
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Add Book
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {books.map((book) =>
            book && book._id ? (
              <div key={book._id} className="border p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{book.titulo}</h2>
                <p className="text-gray-600">Author: {book.autor}</p>
                <p className="text-lg font-bold mt-2">
                  Price: ${typeof book.preco === 'number' ? book.preco.toFixed(2) : 'N/A'}
                </p>
                <button
                  onClick={() => handleDeleteBook(book._id!)}
                  className="mt-4 p-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ) : null
          )}
        </div>
      </main>
    </div>
  );
}
