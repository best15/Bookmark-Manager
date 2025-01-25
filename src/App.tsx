import { createContext, useEffect, useState } from 'react'
import './App.css'
import file from './db.json'
import BooksTable from './components/BooksTable';
import { BookContextType, BookType } from './types';

const initialConextValue: BookContextType = {
  books: [],
  updateBookList: () => {},
};

export const BookContext = createContext(initialConextValue);

function App() {
 const { data } = file;
 const [books, setBooks] = useState<BookType[]>(data);

 useEffect(() => {
  console.log('actual data', data);
    const bookmarks = localStorage.getItem("Bookmarks");
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      const updatedBooks = books.map((book) => {
        const bookmark = parsedBookmarks.find(({ id }: { id: string }) => id === book.id);
        if (bookmark) {
          return { ...book, isRead: bookmark.isRead };
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  }, [data]);

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

 const contextValue = {
    books,
    updateBookList,
  };

  return (
    <BookContext.Provider value={contextValue}>
      <BooksTable />
    </BookContext.Provider>
  )
}

export default App
