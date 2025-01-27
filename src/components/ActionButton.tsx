import { useContext } from "react";
import { Plus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

import { BookmarksContext } from "@/providers/bookmarks/BookmarksProvider";

export default function FloatingActionButton() {
  const { popup } = useContext(BookmarksContext);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className="h-16 w-16 p-0 bg-teal-400 rounded-full shadow-lg flex items-center justify-center hover:bg-teal-500 [&_svg]:size-8"
              onClick={() => popup.setIsOpen(true)}
            >
              <Plus className="text-white" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add Bookmark</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
