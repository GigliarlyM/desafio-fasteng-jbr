import axios from "axios";
import { Book } from "./types";

const API_URL = "http://localhost:8080/livros";

export const getBooks = async (): Promise<Book[]> => {
  const response = await axios.get<Book[]>(API_URL);
  return response.data;
};

export const addBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const response = await axios.post<Book>(API_URL, book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
