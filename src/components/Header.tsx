import { useContext } from "react";

import ImportExport from "./ImportExport";

import { BookmarksContext } from "@/providers/bookmarks/BookmarksProvider";

import { BookmarkType } from "@/types";

export default function ImportFeature() {
  const { bookmarks, setBookmarks } = useContext(BookmarksContext);

  const handleExport = () => {
    const jsonData = bookmarks;
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "bookmarks.json";

    link.click();
  };

  const handleImport = (bookmarks: BookmarkType[]) => {
    setBookmarks(bookmarks);
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarks));
  };

  return (
    <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold">Bookmark Manager</h1>
      <ImportExport onImport={handleImport} onExport={handleExport} />
    </div>
  );
}
