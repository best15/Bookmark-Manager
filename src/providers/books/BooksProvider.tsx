
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import short from "short-uuid";
import { BookContextType, BookType, BookUpdates } from "@/types";
// import data from "@/db.json";
import { toast } from "react-toastify";

const initialConextValue: BookContextType = {
  selectedBook: null,
  books: [],
  popup: {
    isOpen: false,
    setIsOpen: () => {},
  },
  setBooks: () => {},
  setSelectedBook: () => {},
  addBook: () => {},
  deleteBook: () => {},
  updateBook: () => {},
};

const BooksContext = createContext(initialConextValue);

const BooksProvider = ({ children }: { children: ReactNode }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);

  const fetchBooks = async () => {
    const bookmarks = localStorage.getItem("Bookmarks");
    if (books.length && bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      const updatedBooks = books.map((book) => {
        const bookmark = parsedBookmarks.find(
          ({ id }: { id: string }) => id === book.id
        );
        if (bookmark) {
          return { ...book, isRead: bookmark.isRead };
        }
        return book;
      });
      setBooks(updatedBooks);
    }
  };

  const addBook = useCallback(
    (book: BookUpdates) => {
      const newBookId = short.generate();
      const newBook = { ...book, id: newBookId as string };
      const updatedBooks = [newBook, ...books];
      setBooks(updatedBooks as BookType[]);
      toast.success("Book added successfully");
      localStorage.setItem(
        "Bookmarks",
        JSON.stringify(updatedBooks.map(({ id, isRead }) => ({ id, isRead })))
      );
    },
    [books]
  );

  const updateBook = useCallback(
    (id: string, updates: BookUpdates) => {
      const updatedBooks = books.map((book) => {
        if (book.id === id) {
          return { ...book, ...updates };
        }
        return book;
      });
      setBooks(updatedBooks);
      localStorage.setItem(
        "Bookmarks",
        JSON.stringify(updatedBooks.map(({ id, isRead }) => ({ id, isRead })))
      );
    },
    [books]
  );

  const deleteBook = useCallback(
    (id: string) => {
      const updatedBooks = books.filter((book) => book.id !== id);
      setBooks(updatedBooks);
      localStorage.setItem(
        "Bookmarks",
        JSON.stringify(updatedBooks.map(({ id, isRead }) => ({ id, isRead })))
      );
    },
    [books]
  );

  const contextValue = useMemo(
    () => ({
      books,
      popup: {
        isOpen: isDialogOpen,
        setIsOpen: setIsDialogOpen,
      },
      addBook,
      deleteBook,
      updateBook,
      selectedBook,
      setBooks,
      setSelectedBook,
    }),
    [addBook, books, deleteBook, isDialogOpen, selectedBook, updateBook]
  );

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BooksContext.Provider value={contextValue}>
      {children}
    </BooksContext.Provider>
  );
};

export { BooksProvider, BooksContext }
