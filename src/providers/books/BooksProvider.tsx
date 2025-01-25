
import { createContext, ReactNode, useEffect, useState } from 'react'
import { BookContextType, BookType } from '@/types';
import file from '@/db.json'

const initialConextValue: BookContextType = {
  books: [],
  updateBookList: () => {},
};

const BooksContext = createContext(initialConextValue);

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookType[]>([]);

  const fetchBooks = async () => {
    const { data } = file;
    const bookmarks = localStorage.getItem("Bookmarks");
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      const updatedBooks = data.map((book) => {
        const bookmark = parsedBookmarks.find(({ id }: { id: string }) => id === book.id);
        if (bookmark) {
          return { ...book, isRead: bookmark.isRead };
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  };

  const updateBookList = (id: string) => {
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, isRead: !book.isRead };
      }
      return book;
    });
    setBooks(updatedBooks);
    localStorage.setItem("Bookmarks", JSON.stringify(updatedBooks.map(({ id, isRead }) => ({ id, isRead }))));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={{ books, updateBookList}}>{children}</BooksContext.Provider>
  );
}

export { BooksProvider, BooksContext }
