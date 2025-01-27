import { useContext, useMemo, useState } from "react";
import { Edit, Loader2, Trash } from "lucide-react";

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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import ImportBooks from "./ImportBooks";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

import { BookmarksContext } from "@/providers/bookmarks/BookmarksProvider";

import { BookmarkType } from "@/types";

const BooksTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteBookmarkId, setDeleteBookmarkId] = useState<string>("");
  const bookmarksPerPage = 5;

  const {
    popup,
    loading,
    bookmarks,
    setBookmarks,
    deleteBookmark,
    updateBookmarks,
    setSelectedBookmark,
  } = useContext(BookmarksContext);

  const unReadBooks = useMemo(
    () => bookmarks?.filter((bookmark: BookmarkType) => !bookmark.isRead),
    [bookmarks]
  );
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = bookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );
  const totalBookmarks = bookmarks.length;

  const handleClickEdit = (bookmark: BookmarkType) => {
    setSelectedBookmark(bookmark);
    popup.setIsOpen(true);
  };

  const handleClickDelete = (id: string) => {
    setDeleteBookmarkId(id);
  };

  const handleDeletebook = (id: string) => {
    deleteBookmark(id);
    setDeleteBookmarkId("");
  };

  const handleImportBookmarks = (bookmarks: BookmarkType[]) => {
    setBookmarks(bookmarks);
    localStorage.setItem("Bookmarks", JSON.stringify(bookmarks));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <Button disabled>
          <Loader2 className="animate-spin" />
          Loading
        </Button>
      </div>
    );
  }

  return (
    <div className="p-2 sm:p-10 max-w-3xl mx-auto">
      {bookmarks.length > 0 ? (
        <>
          <Table>
            <TableCaption>A list of your bookmarks.</TableCaption>
            <h1 className="text-2xl font-bold text-center sm:hidden">
              Bookmarks
            </h1>
            <TableHeader className="hidden sm:table-header-group">
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Read</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBookmarks?.map((bookmark) => (
                <TableRow key={bookmark.id} className="group hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <div>
                      <span className="text-lg sm:text-base">
                        {bookmark.title}
                      </span>
                      <div className="sm:hidden">
                        <p className="pt-1">Category: {bookmark.category}</p>
                        <p className="pt-1">URL: {bookmark.url}</p>
                        <div className="flex pt-2">
                          <Label className="mr-3">Read:</Label>
                          <Checkbox
                            checked={bookmark.isRead}
                            onCheckedChange={() =>
                              updateBookmarks(bookmark.id, {
                                isRead: !bookmark.isRead,
                              })
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {bookmark.category}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {bookmark.url}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Checkbox
                      checked={bookmark.isRead}
                      onCheckedChange={() =>
                        updateBookmarks(bookmark.id, {
                          isRead: !bookmark.isRead,
                        })
                      }
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex">
                      {/* Edit button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleClickEdit(bookmark)}
                              className="h-8 w-8 p-0 border-2 rounded-full hover:border-blue-500 [&_svg]:size-4"
                            >
                              <Edit className="w-4 h-4 text-blue-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Edit</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      {/* Delete button */}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              onClick={() => handleClickDelete(bookmark.id)}
                              className="h-8 w-8 p-0 ml-2 border-2 rounded-full hover:border-red-500 [&_svg]:size-4"
                            >
                              <Trash className="w-4 h-4 text-red-500" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <ConfirmDeleteDialog
                      bookmark={bookmark}
                      isOpen={deleteBookmarkId === bookmark.id}
                      onClose={() => setDeleteBookmarkId("")}
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
                      : {`${currentBookmarks.length} / ${totalBookmarks} `}
                    </span>
                  </div>
                  <div className="sm:hidden pt-2">
                    <span className="font-bold">Unread</span>
                    <span className="sm:hidden"> : {unReadBooks?.length}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{`${currentBookmarks.length} / ${totalBookmarks} `}</TableCell>
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
          <div className="flex justify-between items-center mt-4 pb-24">
            <Button
              variant="outline"
              onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-xs">
              Page {currentPage} of{" "}
              {Math.ceil(totalBookmarks / bookmarksPerPage)}
            </span>
            <Button
              variant="outline"
              onClick={() =>
                paginate(
                  currentPage < Math.ceil(totalBookmarks / bookmarksPerPage)
                    ? currentPage + 1
                    : currentPage
                )
              }
              disabled={
                currentPage === Math.ceil(totalBookmarks / bookmarksPerPage)
              }
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <div>
          {/* Import Description */}
          <div className="mb-4 text-center">
            <h2 className="text-xl font-bold">Import Bookmarks</h2>
            <p className="text-sm text-gray-600">
              Upload a JSON file to visualize and manage your bookmark data
              effortlessly.
            </p>
          </div>
          <ImportBooks
            onImport={(bookmarks: BookmarkType[]) =>
              handleImportBookmarks(bookmarks)
            }
          />
        </div>
      )}
    </div>
  );
};

export default BooksTable;
