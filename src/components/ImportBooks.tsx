import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

import { BookmarkType } from "@/types";

export default function ImportBooks({
  onImport,
  closeDialog = () => {},
}: {
  onImport: (data: BookmarkType[]) => void;
  closeDialog?: () => void;
}) {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) {
      toast.error("Invalid file type. Please upload a valid JSON file.");
      return;
    }

    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonData = JSON.parse(reader.result as string);

        if (!Array.isArray(jsonData)) {
          toast.error(
            "Invalid JSON structure. Please provide a valid bookmark list."
          );
          return;
        }

        if (!jsonData.every((bookmark) => bookmark.id && bookmark.title)) {
          toast.error(
            "Invalid bookmark data structure. Each bookmark should have 'id', 'title', fields."
          );
          return;
        }

        onImport(jsonData);
        closeDialog();
        toast.success("Bookmarks imported successfully!");
      } catch (error) {
        toast.error("Error parsing the JSON file. Please try again.");
        console.error(error);
      }
    };

    reader.readAsText(file);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/json": [".json"] },
    onDrop: handleDrop,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed p-6 rounded-lg cursor-pointer ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">Drop the JSON file here...</p>
      ) : (
        <p>Drag & drop a JSON file here, or click to select a file.</p>
      )}
    </div>
  );
}
