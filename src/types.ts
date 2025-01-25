export interface BookType {
    id: string;
    title: string;
    url: string;
    category: string;
    isRead: boolean;
  }

export interface BookContextType {
    books: BookType[];
    updateBookList: (id: string) => void;
  }
