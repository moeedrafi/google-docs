"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RemoveDialog } from "@/components/remove-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  EllipsisVertical,
  ExternalLinkIcon,
  FilePenIcon,
  TrashIcon,
} from "lucide-react";
import { RenameDialog } from "@/components/rename-dialog";

export const DocumentMenu = () => {
  const [removeOpen, setRemoveOpen] = useState<boolean>(false);
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const [renameOpen, setRenameOpen] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const handleRemove = async () => {
    setIsRemoving(true);

    try {
      // await deleteDocument(documentId);
      setRemoveOpen(false);
    } catch (error) {
      console.error("Failed to remove document:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleRename = async (title: string) => {
    setIsUpdating(true);

    try {
      // await renameDocument(documentId);
      setRenameOpen(false);
    } catch (error) {
      console.error("Failed to rename document:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground rounded-full"
            >
              <EllipsisVertical className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setRenameOpen(true);
              }}
            >
              <FilePenIcon className="size-4 mr-2" />
              Rename
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.preventDefault();
                setRemoveOpen(true);
              }}
            >
              <TrashIcon className="size-4 mr-2" />
              Remove
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => window.open(`/documents/${1}`, "_blank")}
            >
              <ExternalLinkIcon className="size-4 mr-2" />
              Open in new tab
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveDialog
        open={removeOpen}
        isRemoving={isRemoving}
        onOpenChange={setRemoveOpen}
        onConfirm={handleRemove}
      />

      <RenameDialog
        initialTitle="WHAT"
        open={renameOpen}
        isUpdating={isUpdating}
        onOpenChange={setRenameOpen}
        onConfirm={handleRename}
      />
    </>
  );
};
