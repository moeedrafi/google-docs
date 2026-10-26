import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
} from "lucide-react";

export const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 h-16 bg-white p-4">
      <nav className="h-full w-full flex items-center justify-between">
        <div className="flex gap-3 items-center shrink-0 pr-6">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={36} height={36} />
          </Link>
          <h3 className="text-xl">Docs</h3>
        </div>

        <SearchInput />

        {/* AVATAR */}
        <div className="flex items-center pl-6">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="shadcn"
                    />
                    <AvatarFallback>LR</AvatarFallback>
                  </Avatar>
                </Button>
              }
            />
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <BadgeCheckIcon />
                  Account
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <CreditCardIcon />
                  Billing
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <BellIcon />
                  Notifications
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};
