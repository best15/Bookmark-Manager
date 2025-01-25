import { useContext, useMemo } from "react";

import { BookContext } from "@/App";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { BookType } from "@/types";

const BooksTable = () => {
  const { books, updateBookList } = useContext(BookContext);
  const unReadBooks = useMemo(
    () => books?.filter((book: BookType) => !book.isRead),
    [books]
  );

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <Table>
        <TableCaption>A list of your bookmarks.</TableCaption>
        <h1 className="text-2xl font-bold text-center sm:hidden">Bookmarks</h1>
        <TableHeader className="hidden sm:table-header-group">
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead >Category</TableHead>
            <TableHead >URL</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books?.map((book) => (
            <TableRow key={book.id}>
              <TableCell className="font-medium">
                <div>
                  {book.title}
                  <div className="sm:hidden">
                    <p>{ book.category }</p>
                    <p>{ book.url }</p>
                    <Checkbox
                      checked={book.isRead}
                      onCheckedChange={() => updateBookList(book.id)}
                    />
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{book.category}</TableCell>
              <TableCell className="hidden sm:table-cell">{book.url}</TableCell>
              <TableCell className="text-right hidden sm:table-cell">
                <Checkbox
                  checked={book.isRead}
                  onCheckedChange={() => updateBookList(book.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>{books?.length}</TableCell>
            <TableCell>Unread</TableCell>
            <TableCell>{unReadBooks?.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default BooksTable;
