import { useContext, useMemo, useState } from "react";
import { Edit, Trash } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import ImportBooks from "./ImportBooks";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

import { BooksContext } from "@/providers/books/BooksProvider";

import { BookType } from "@/types";

const BooksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBookId, setDeleteBookId] = useState<string>("");
  const booksPerPage = 5;

  const { books, deleteBook, setBooks, setSelectedBook, updateBook, popup } =
    useContext(BooksContext);

  const unReadBooks = useMemo(
    () => books?.filter((book: BookType) => !book.isRead),
    [books]
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalBooks = books.length;

  const handleClickEdit = (book: BookType) => {
    setSelectedBook(book);
    popup.setIsOpen(true);
  };

  const handleClickDelete = (id: string) => {
    setDeleteBookId(id);
  };

  const handleDeletebook = (id: string) => {
    deleteBook(id);
    setDeleteBookId("");
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      {books.length > 0 ? (
        <>
          <Table className="">
            <TableCaption>A list of your bookmarks.</TableCaption>
            <h1 className="text-2xl font-bold text-center sm:hidden">
              Bookmarks
            </h1>
            <TableHeader className="hidden sm:table-header-group">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBooks?.map((book) => (
                <TableRow key={book.id} className="group hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <span className="text-lg sm:text-base">{book.title}</span>
                      <div className="sm:hidden">
                        <p className="pt-1">Category: {book.category}</p>
                        <p className="pt-1">URL: {book.url}</p>
                        <div className="flex pt-2">
                          <Label className="mr-3">Is read:</Label>
                          <Checkbox
                            checked={book.isRead}
                            onCheckedChange={() =>
                              updateBook(book.id, { isRead: !book.isRead })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {book.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {book.url}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Checkbox
                      checked={book.isRead}
                      onCheckedChange={() =>
                        updateBook(book.id, { isRead: !book.isRead })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => handleClickEdit(book)}
                      className="h-8 w-8 p-0 border-2 border-blue-300 rounded-full group-hover:border-blue-500"
                    >
                      <Edit className="w-4 h-4 text-blue-500" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleClickDelete(book.id)}
                      className="h-8 w-8 p-0 ml-4 border-2 border-red-300 rounded-full group-hover:border-blue-500"
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                    <ConfirmDeleteDialog
                      book={book}
                      isOpen={deleteBookId === book.id}
                      onClose={() => setDeleteBookId("")}
                      onConfirm={handleDeletebook}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter className="w-full">
              <TableRow className="w-full">
                <TableCell>
                  <div>
                    <span className="font-bold">Total</span>
                    <span className="sm:hidden">
                      {" "}
                      : {`${currentBooks.length} / ${totalBooks} `}
                    </span>
                  </div>
                  <div className="sm:hidden pt-2">
                    <span className="font-bold">Unread</span>
                    <span className="sm:hidden"> : {unReadBooks?.length}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{`${currentBooks.length} / ${totalBooks} `}</TableCell>
                <TableCell>&nbsp;</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="font-bold">Unread</span>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {unReadBooks?.length}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          {/* Pagination Controls */}
          <div className="flex justify-between items-center mt-4 pb-20">
            <Button
              variant="outline"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-xs">
              Page {currentPage} of {Math.ceil(totalBooks / booksPerPage)}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                paginate(
                  currentPage < Math.ceil(totalBooks / booksPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }
              disabled={currentPage === Math.ceil(totalBooks / booksPerPage)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div>
          {/* Description */}
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold">Import Books</h2>
            <p className="text-sm text-gray-600">
              Upload a JSON file to visualize and manage your book data
              effortlessly.
            </p>
          </div>
          <ImportBooks onImport={(data: BookType[]) => setBooks(data)} />
        </div>
      )}
    </div>
  );
};

export default BooksTable;
