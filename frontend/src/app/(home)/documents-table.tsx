"use client";
import { DocumentMenu } from "./document-menu";
import { Button } from "@/components/ui/button";
import { CircleUserIcon, FileText, LoaderIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const documents = [
  {
    id: "1",
    name: "My Resume",
    shared: "Personal",
    createdAt: "Nov 24, 2025",
  },
  {
    id: "2",
    name: "Docs",
    shared: "John",
    createdAt: "Nov 24, 2025",
  },
];

export const MyDocuments = () => {
  return (
    <div className="mx-auto max-w-7xl px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="w-25">Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="hidden md:table-cell">Shared</TableHead>
              <TableHead className="hidden md:table-cell">Created at</TableHead>
            </TableRow>
          </TableHeader>

          {documents.length === 0 ? (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id} className="cursor-pointer">
                  <TableCell className="w-12.5">
                    <FileText className="size-6 fill-blue-500 text-gray-100" />
                  </TableCell>

                  <TableCell className="font-medium md:w-[45%]">
                    {document.name}
                  </TableCell>

                  <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                    <CircleUserIcon className="size-4" />
                    {document.shared}
                  </TableCell>

                  <TableCell className="text-muted-foreground hidden md:table-cell">
                    {document.createdAt}
                  </TableCell>

                  <TableCell className="flex justify-end">
                    <DocumentMenu />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      )}

      <div className="flex items-center justify-center">
        <Button variant="ghost" size="sm" onClick={() => {}}>
          Load more
        </Button>
      </div>
    </div>
  );
};
