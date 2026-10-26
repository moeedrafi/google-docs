"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RenameDialogProps {
  initialTitle: string;
  open: boolean;
  isUpdating: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (title: string) => void;
}

export const RenameDialog = ({
  initialTitle,
  onConfirm,
  onOpenChange,
  isUpdating,
  open,
}: RenameDialogProps) => {
  const [title, setTitle] = useState<string>(initialTitle);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onConfirm(title);
        }}
      >
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>

          <div>
            <Input
              value={title}
              placeholder="Document name"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" disabled={isUpdating}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={isUpdating}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
