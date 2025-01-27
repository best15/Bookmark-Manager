import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import short from "short-uuid";
import { toast } from "react-toastify";

import { BookmarkContextType, BookmarkType, BookmarkUpdates } from "@/types";

const initialConextValue: BookmarkContextType = {
  bookmarks: [],
  selectedBookmark: null,
  loading: true,
  popup: {
    isOpen: false,
    setIsOpen: () => {},
  },
  setBookmarks: () => {},
  setSelectedBookmark: () => {},
  addBookmark: () => {},
  deleteBookmark: () => {},
  updateBookmarks: () => {},
};

const BookmarksContext = createContext(initialConextValue);

const BookmarksProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookmarks, setBookmarks] = useState<BookmarkType[]>([]);
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkType | null>(
    null
  );

  const fetchBookmarks = async () => {
    const bookmarks = localStorage.getItem("Bookmarks");
    if (bookmarks) {
      const parsedBookmarks = JSON.parse(bookmarks);
      setBookmarks(parsedBookmarks);
    }
    setLoading(false);
  };

  const addBookmark = useCallback(
    (bookmark: BookmarkUpdates) => {
      const newBookmarkId = short.generate();
      const newBookmark = { ...bookmark, id: newBookmarkId as string };
      const updatedBooks = [newBookmark, ...bookmarks];
      setBookmarks(updatedBooks as BookmarkType[]);
      toast.success("Bookmark added successfully");
      localStorage.setItem("Bookmarks", JSON.stringify(updatedBooks));
    },
    [bookmarks]
  );

  const updateBookmarks = useCallback(
    (id: string, updates: BookmarkUpdates) => {
      const updatedBooks = bookmarks.map((bookmark) => {
        if (bookmark.id === id) {
          return { ...bookmark, ...updates };
        }
        return bookmark;
      });
      setBookmarks(updatedBooks);
      toast.success("Bookmark updated successfully");
      localStorage.setItem("Bookmarks", JSON.stringify(updatedBooks));
    },
    [bookmarks]
  );

  const deleteBookmark = useCallback(
    (id: string) => {
      const updatedBooks = bookmarks.filter((bookmark) => bookmark.id !== id);
      setBookmarks(updatedBooks);
      localStorage.setItem("Bookmarks", JSON.stringify(updatedBooks));
      toast.success("Bookmark deleted successfully");
    },
    [bookmarks]
  );

  const contextValue = useMemo(
    () => ({
      loading,
      bookmarks,
      selectedBookmark,
      popup: {
        isOpen: isDialogOpen,
        setIsOpen: setIsDialogOpen,
      },
      addBookmark,
      deleteBookmark,
      updateBookmarks,
      setBookmarks,
      setSelectedBookmark,
    }),
    [
      loading,
      bookmarks,
      isDialogOpen,
      selectedBookmark,
      addBookmark,
      deleteBookmark,
      updateBookmarks,
    ]
  );

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <BookmarksContext.Provider value={contextValue}>
      {children}
    </BookmarksContext.Provider>
  );
};

export { BookmarksProvider, BookmarksContext };
