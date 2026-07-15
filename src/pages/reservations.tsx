import { useState } from "react";
import { useLibrary } from "@/lib/library-context";
import { type Reservation } from "@/lib/data";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table";
import { ArrowUpDown, Plus, Search, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { format, parseISO } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const reservationSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  memberId: z.string().min(1, "Member is required"),
  notes: z.string().optional(),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

const columns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "bookTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="font-medium max-w-50 truncate">
        {row.getValue("bookTitle")}
      </div>
    ),
  },
  {
    accessorKey: "memberName",
    header: "Member",
    cell: ({ row }) => (
      <div className="max-w-37.5 truncate">{row.getValue("memberName")}</div>
    ),
  },
  {
    accessorKey: "reservedOn",
    header: "Reserved",
    cell: ({ row }) => {
      const date = row.getValue("reservedOn") as string;
      return format(parseISO(date), "MMM d, yyyy");
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "Fulfilled"
              ? "default"
              : status === "Ready"
                ? "secondary"
                : status === "Cancelled"
                  ? "outline"
                  : "outline"
          }
          className={
            status === "Fulfilled"
              ? "bg-emerald-500"
              : status === "Ready"
                ? "bg-blue-500 text-white"
                : ""
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return notes ? (
        <span className="text-sm text-muted-foreground truncate max-w-37.5 block">
          {notes}
        </span>
      ) : (
        "-"
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const reservation = row.original;
      const { updateReservation, cancelReservation } = table.options.meta as {
        updateReservation: (id: string, status: Reservation["status"]) => void;
        cancelReservation: (id: string) => void;
      };
      const isPending = reservation.status === "Pending";
      const isReady = reservation.status === "Ready";

      return (
        <div className="flex gap-2">
          {isPending && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                updateReservation(reservation.id, "Ready");
                toast.success("Reservation marked as ready");
              }}
            >
              <Check className="mr-1 h-3 w-3" />
              Ready
            </Button>
          )}
          {(isPending || isReady) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                cancelReservation(reservation.id);
                toast.success("Reservation cancelled");
              }}
            >
              <X className="mr-1 h-3 w-3" />
              Cancel
            </Button>
          )}
        </div>
      );
    },
  },
];

function AddReservationDialog({
  open,
  onOpenChange,
  onSubmit,
  books,
  members,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ReservationFormData) => void;
  books: { id: string; title: string }[];
  members: { id: string; name: string; status: string }[];
}) {
  const form = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      bookId: "",
      memberId: "",
      notes: "",
    },
  });

  const activeMembers = members.filter((m) => m.status === "Active");

  const handleSubmit = (data: ReservationFormData) => {
    onSubmit(data);
    form.reset();
    onOpenChange(false);
  };

  const selectedBook = books.find((b) => b.id === form.watch("bookId"));
  const selectedMember = members.find((m) => m.id === form.watch("memberId"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add Reservation</DialogTitle>
          <DialogDescription>
            Reserve a book for a library member.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <Controller
            name="bookId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Book</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedBook ? selectedBook.title : "Select book..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-75 p-0">
                    <Command>
                      <CommandInput placeholder="Search books..." />
                      <CommandList>
                        <CommandEmpty>No books found.</CommandEmpty>
                        {books.map((book) => (
                          <CommandItem
                            key={book.id}
                            value={book.title}
                            onSelect={() => field.onChange(book.id)}
                          >
                            {book.title}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="memberId"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Member</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {selectedMember
                        ? selectedMember.name
                        : "Select member..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-75 p-0">
                    <Command>
                      <CommandInput placeholder="Search members..." />
                      <CommandList>
                        <CommandEmpty>No members found.</CommandEmpty>
                        {activeMembers.map((member) => (
                          <CommandItem
                            key={member.id}
                            value={member.name}
                            onSelect={() => field.onChange(member.id)}
                          >
                            {member.name}
                          </CommandItem>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="notes"
            control={form.control}
            render={({ field }) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Notes (optional)</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={3}
                  placeholder="Any special notes..."
                />
              </Field>
            )}
          />

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Reservation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Reservations() {
  const {
    books,
    members,
    reservations,
    addReservation,
    updateReservation,
    cancelReservation,
  } = useLibrary();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);

  const table = useReactTable({
    data: reservations,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    meta: {
      updateReservation,
      cancelReservation,
    },
  });

  const handleAddReservation = (data: ReservationFormData) => {
    const book = books.find((b) => b.id === data.bookId);
    const member = members.find((m) => m.id === data.memberId);

    if (!book || !member) return;

    addReservation({
      bookId: data.bookId,
      bookTitle: book.title,
      memberId: data.memberId,
      memberName: member.name,
      reservedOn: new Date().toISOString().split("T")[0],
      status: "Pending",
      notes: data.notes || "",
    });
    toast.success("Reservation created successfully");
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
          <p className="text-muted-foreground">
            Manage book reservations and holds
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Reservation
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search reservations..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onValueChange={(value) =>
            table
              .getColumn("status")
              ?.setFilterValue(value === "all" ? "" : value)
          }
        >
          <SelectTrigger className="w-32.5">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Ready">Ready</SelectItem>
            <SelectItem value="Fulfilled">Fulfilled</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
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
                            header.getContext(),
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
                        cell.getContext(),
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
                  No reservations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getPaginationRowModel().rows.length} of{" "}
          {reservations.length} reservations
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      <AddReservationDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSubmit={handleAddReservation}
        books={books}
        members={members}
      />
    </div>
  );
}
