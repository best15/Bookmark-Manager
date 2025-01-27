import { toast } from "react-toastify";
import { useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

import { BookmarksContext } from "@/providers/bookmarks/BookmarksProvider";

import { BookmarkUpdates } from "@/types";

export default function PopupForm() {
  const {
    popup,
    selectedBookmark,
    setSelectedBookmark,
    addBookmark,
    updateBookmarks,
  } = useContext(BookmarksContext);
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
        selectedBookmark || {
          title: "",
          category: "",
          url: "",
          isRead: false,
        }
      );
    } else {
      reset({});
      setSelectedBookmark(null);
    }
  }, [isOpen, reset, selectedBookmark, popup, setSelectedBookmark]);

  const onSubmit = async (data: BookmarkUpdates) => {
    try {
      if (selectedBookmark) {
        await updateBookmarks(selectedBookmark.id, data);
      } else {
        await addBookmark(data);
      }

      setIsOpen(false);
    } catch (error) {
      toast.error("Error saving bookmark. Please try again.");
      console.error("Failed to save the bookmark.", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedBookmark ? "Edit Bookmark" : "Add Bookmark"}
          </DialogTitle>
          <DialogDescription>
            {selectedBookmark
              ? "Make changes to your bookmark here. Click save when you're done."
              : "Fill out details of your new bookmark here."}
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
                URL
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
              {selectedBookmark ? "Save changes" : "Add Book"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
