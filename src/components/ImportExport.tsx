import { useState } from "react";
import { Upload, Download } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Button } from "./ui/button";
import ImportBooks from "./ImportBooks";

import { BookmarkType } from "@/types";

interface ImportExportProps {
  onImport: (books: BookmarkType[]) => void;
  onExport: () => void;
}

export default function ImportExport({
  onImport,
  onExport,
}: ImportExportProps) {
  const [isImportOpen, setImportOpen] = useState(false);

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={onExport}>
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>

      <Dialog open={isImportOpen} onOpenChange={setImportOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Bookmarks</DialogTitle>
            <DialogDescription>
              Upload a JSON file to replace the existing bookmark data.
            </DialogDescription>
          </DialogHeader>
          <ImportBooks
            onImport={onImport}
            closeDialog={() => setImportOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
