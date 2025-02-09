import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";

import { BookmarkType } from "@/types";

interface ConfirmDeleteDialogProps {
  bookmark: BookmarkType;
  onConfirm: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmDeleteDialog({
  bookmark,
  onConfirm,
  isOpen,
  onClose,
}: ConfirmDeleteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <b>{bookmark.title}</b> bookmark ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onConfirm(bookmark.id)}>Yes</Button>
          <Button onClick={onClose} variant="outline">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
