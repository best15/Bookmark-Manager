import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BooksContext } from "@/providers/books/BooksProvider";
import { BookUpdates } from "@/types";

export default function PopupForm() {
  const { popup, selectedBook, setSelectedBook, addBook, updateBook } =
    useContext(BooksContext);
  const { isOpen, setIsOpen } = popup;

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      category: "",
      url: "",
      isRead: false,
    },
  });
  useEffect(() => {
    if (isOpen) {
      reset(
        selectedBook || {
          title: "",
          category: "",
          url: "",
          isRead: false,
        }
      );
    } else {
      reset({});
      setSelectedBook(null);
    }
  }, [isOpen, reset, selectedBook, popup, setSelectedBook]);

  const onSubmit = async (data: BookUpdates) => {
    try {
      if (selectedBook) {
        await updateBook(selectedBook.id, data);
        console.log("Updated successfully:", data);
      } else {
        await addBook(data);
        console.log("Added successfully:", data);
      }

      setIsOpen(false);
    } catch (error) {
      console.error("Failed to save the book:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{selectedBook ? "Edit Book" : "Add Book"}</DialogTitle>
          <DialogDescription>
            Make changes to your book here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            {/* Title */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <Input
                    id="title"
                    {...field}
                    className={`col-span-3 ${
                      errors.title ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
            </div>

            {/* Category */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Programming">Programming</SelectItem>
                      <SelectItem value="Design">Design</SelectItem>
                      <SelectItem value="Productivity">Productivity</SelectItem>
                      <SelectItem value="Testing">Testing</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* URL */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Url
              </Label>
              <Controller
                name="url"
                control={control}
                rules={{
                  pattern: {
                    value:
                      /^(https?:\/\/)?([\w-])+\.{1}[a-zA-Z]{2,}(\/[\w-]*)*\/?$/,
                    message: "Enter a valid URL",
                  },
                }}
                render={({ field }) => (
                  <Input
                    id="url"
                    {...field}
                    className={`col-span-3 ${
                      errors.url ? "border-red-500" : ""
                    }`}
                  />
                )}
              />
              {/* {errors.url && (
                <p className="text-red-500 text-sm col-span-4">
                  {errors.url.message}
                </p>
              )} */}
            </div>

            {/* Read Checkbox */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isRead" className="text-right">
                Read
              </Label>
              <Controller
                name="isRead"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="isRead"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>
          {/* Display all errors at the end */}
          {Object.keys(errors).length > 0 && (
            <div className="text-red-500 mt-4">
              {errors.url && (
                <p className="text-red-500 text-sm text-center col-span-4">
                  {errors.url.message}
                </p>
              )}
              {errors.title && (
                <p className="text-red-500 text-sm text-center col-span-4">
                  {errors.title.message}
                </p>
              )}
            </div>
          )}
          <DialogFooter>
            <Button type="submit">
              {selectedBook ? "Save changes" : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
