export interface BookmarkType {
  id: string;
  title: string;
  url?: string;
  category?: string;
  isRead?: boolean;
}

export interface BookmarkUpdates {
  title?: string;
  url?: string;
  category?: string;
  isRead?: boolean;
}

export interface BookmarkContextType {
  bookmarks: BookmarkType[];
  loading: boolean;
  selectedBookmark: BookmarkType | null;
  popup: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
  };
  setBookmarks: (bookmarks: BookmarkType[]) => void;
  setSelectedBookmark: (bookmark: BookmarkType | null) => void;
  addBookmark: (bookmark: BookmarkUpdates) => void;
  updateBookmarks: (id: string, updates: BookmarkUpdates) => void;
  deleteBookmark: (id: string) => void;
}
