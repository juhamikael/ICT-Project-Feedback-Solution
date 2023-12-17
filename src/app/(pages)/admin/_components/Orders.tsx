"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Clipboard } from "lucide-react";
import { cn, translateOrderStatus } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TParsedOrder } from "../_types";
import _ from "lodash";
import { Toaster, toast } from "sonner";
import { Label } from "@/components/ui/label";

export const columns: ColumnDef<TParsedOrder>[] = [
  {
    accessorKey: "status",
    header: "Tilauksen Tila",
    cell: ({ row }) => (
      <div className="capitalize">
        {translateOrderStatus(row.getValue("status"))}
      </div>
    ),
  },
  {
    accessorKey: "userId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asiakas
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      console.log(row.original);
      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Näytä Tiedot</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                {
                  "Asiakkaan tiedot. Voit kopioida asiakkaan ID:n ja sähköpostin leikepöydälle painamalla niitä."
                }
              </DialogDescription>
            </DialogHeader>
            <div className="gap-y-4 ">
              <div className="flex flex-col">
                <Label className={"text-xl"} htmlFor="name">
                  Nimi
                </Label>
                <DropdownMenuSeparator />
                <div>{row.original.customerName}</div>
              </div>

              <div className="flex flex-col py-6">
                <Label className={"text-xl"} htmlFor="name">
                  Tunniste
                </Label>
                <DropdownMenuSeparator />
                <Button
                  variant="outline"
                  className="cursor-pointer hover:text-primary transition-all"
                  onClick={() => {
                    navigator.clipboard.writeText(row.original.userId);
                    toast.success("Asiakas ID kopioitu leikepöydälle");
                  }}
                >
                  {row.original.userId}
                </Button>
              </div>

              <div className="flex flex-col py-2">
                <Label className={"text-xl"} htmlFor="name">
                  Sähköposti
                </Label>
                <DropdownMenuSeparator />
                <Button
                  variant="outline"
                  className="cursor-pointer hover:text-primary transition-all"
                  onClick={() => {
                    navigator.clipboard.writeText(row.original.email);
                    toast.success("Sähköposti kopioitu leikepöydälle");
                  }}
                >
                  {row.original.email}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Tilauspäivä
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">
        {format(new Date(row.getValue("date")), "dd/MM/yyyy")}
      </div>
    ),
  },
  {
    accessorKey: "productName",
    header: () => <div className="text-left">Tuote</div>,
    cell: ({ row }) => <div>{_.capitalize(row.getValue("productName"))}</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-left">kpl</div>,
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
  },

  {
    accessorKey: "totalPrice",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Kokonaishinta
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleOrderStatus = async (status: string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: row.original.orderId,
            status: status,
          }),
        });
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const ordersData = await res.json();
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toimenpiteet</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                if (row.original.status === "completed") {
                  handleOrderStatus("pending");
                } else if (row.original.status === "pending") {
                  handleOrderStatus("completed");
                }
                window.location.reload();
              }}
            >
              {`Merkitse tilaus ${
                row.original.status === "completed"
                  ? "takaisin keskeneräiseksi"
                  : "valmiiksi"
              }
                `}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={cn("flex justify-between mr-2")}
              onClick={() => {
                navigator.clipboard.writeText(row.original.userId);
                toast.success("Asiakas ID kopioitu leikepöydälle");
              }}
            >
              Asiakas tunniste
              <Clipboard className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn("flex justify-between mr-2")}
              onClick={() => {
                navigator.clipboard.writeText(row.original.orderId);
                toast.success("Tilauksen tunniste kopioitu leikepöydälle");
              }}
            >
              Tilaus numero
              <Clipboard className="ml-2 h-4 w-4" />
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn("flex justify-between mr-2")}
              onClick={() => {
                navigator.clipboard.writeText(row.original.productId);
                toast.success("Tuotteen ID kopioitu leikepöydälle");
              }}
            >
              Tuote numero
              <Clipboard className="ml-2 h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const DataTableDemo = ({ data }: { data: TParsedOrder[] }) => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <Toaster richColors />
      <div className="flex items-center py-4">
        <Input
          placeholder="Asiakkaan nimi..."
          value={(table.getColumn("userId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("userId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} /{" "}
          {table.getFilteredRowModel().rows.length} riviä valittuna.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Edellinen
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Seuraava
          </Button>
        </div>
      </div>
    </div>
  );
};
