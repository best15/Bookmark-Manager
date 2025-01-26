import { useContext } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { BooksContext } from "@/providers/books/BooksProvider";

export default function FloatingActionButton() {
  const { popup } = useContext(BooksContext);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline" // You can customize the button variant or style as needed
              className="h-16 w-16 p-0 bg-gray-300 rounded-full shadow-lg flex items-center justify-center border-4 border-black [&_svg]:size-8"
              onClick={() => popup.setIsOpen(true)}
            >
              <Plus className="text-black-700" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Book</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
