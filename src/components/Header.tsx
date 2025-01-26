import { useContext } from "react";
import { BooksContext } from "@/providers/books/BooksProvider";
import HeaderWithImportExport from "@/components/HeaderImportExport";
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
    <HeaderWithImportExport onImport={handleImport} onExport={handleExport} />
  );
}
