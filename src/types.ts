export interface BookType {
  id: string;
  title: string;
  url?: string;
  category?: string;
  isRead?: boolean;
}

export interface BookUpdates {
  title?: string;
  url?: string;
  category?: string;
  isRead?: boolean;
}

export interface BookContextType {
  selectedBook: BookType | null;
  books: BookType[];
  popup: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
  setBooks: (books: BookType[]) => void;
  setSelectedBook: (book: BookType | null) => void;
  addBook: (book: BookUpdates) => void;
  updateBook: (id: string, updates: BookUpdates) => void;
  deleteBook: (id: string) => void;
}
