import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookType } from "@/types";

interface ConfirmDeleteDialogProps {
  book: BookType;
  onConfirm: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function ConfirmDeleteDialog({
  book,
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
            Are you sure you want to delete <b>{book.title}</b> book ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onConfirm(book.id)}>Yes</Button>
          <Button onClick={onClose} variant="outline">
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
