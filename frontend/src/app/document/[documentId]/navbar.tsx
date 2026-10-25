import { Avatar } from "@/components/ui/Avatar";
import { CloudBackup } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      {/* NAME + OPTIONS */}
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>

        <div>
          {/* TITLE */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg cursor-pointer truncate">Document Title</h1>
            <CloudBackup className="size-4" />
          </div>

          {/* MENU BAR */}
          <div className="flex items-center gap-4">
            <button className="text-sm">File</button>
            <button className="text-sm">Edit</button>
            <button className="text-sm">Insert</button>
            <button className="text-sm">Format</button>
          </div>
        </div>
      </div>

      {/* AVATAR */}
      <div className="flex items-center gap-2 pl-6">
        <Avatar username="Jhon" />
        <Avatar username="Doe" />
      </div>
    </nav>
  );
};
