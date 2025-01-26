import { useState } from "react";
import { Upload, Download } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ImportBooks from "./ImportBooks";

import { BookType } from "@/types";

interface HeaderWithImportExportProps {
  onImport: (books: BookType[]) => void;
  onExport: () => void;
}

export default function HeaderWithImportExport({
  onImport,
  onExport,
}: HeaderWithImportExportProps) {
  const [isImportOpen, setImportOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-4 p-4 border-b border-gray-200">
      <h1 className="text-2xl font-bold">Bookmark Manager</h1>

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
              <DialogTitle>Import Books</DialogTitle>
              <DialogDescription>
                Upload a JSON file to replace the existing book data.
              </DialogDescription>
            </DialogHeader>
            <ImportBooks
              onImport={onImport}
              closeDialog={() => setImportOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
