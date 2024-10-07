"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Element } from "@prisma/client"
import { toast } from "@/hooks/use-toast";
import { Copy, MoreHorizontal, User } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColumsProps = Element;

export const columns: ColumnDef<ColumsProps>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "typeElement",
        header: "Type Element",
    },
    {
        accessorKey: "url",
        header: "Url",
    },
    {
        accessorKey: "directory",
        header: "Directory",
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const password = row.original.password;
            const username = row.original.username;

            const onEditElement = () => {
                window.location.href = `/element/${row.original.id}`;
            }

            const copyItemClipboard = (item: string, name: string) => {
                navigator.clipboard.writeText(item);
                toast({
                    title: `${name} copied ✔`,
                });
            }
            return (
                <div className="flex gap-2 items-center justify-center">
                    {password && (
                        <Copy className="w-4 h-4 cursor-pointer"
                            size={18} onClick={() => copyItemClipboard(password, "Password")} />
                    )}
                    {username && (
                        <User className="w-4 h-4 cursor-pointer"
                            size={18} onClick={() => copyItemClipboard(username, "Username")} />
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className='h-8 w-8 p-0' variant='ghost'>
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger >
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={onEditElement}>Edit</DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>
                </div>
            )
        }
    },
]
