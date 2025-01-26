import { useContext } from "react";

import ImportExport from "./ImportExport";

import { BooksContext } from "@/providers/books/BooksProvider";

import { BookType } from "@/types";

export default function ImportFeature() {
  const { books, setBooks } = useContext(BooksContext);

  const handleExport = () => {
    const jsonData = books;
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "books.json";

    link.click();
  };

  const handleImport = (data: BookType[]) => {
    setBooks(data);
  };

  return (
    <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold">Bookmark Manager</h1>
      <ImportExport onImport={handleImport} onExport={handleExport} />
    </div>
  );
}
