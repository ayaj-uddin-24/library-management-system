import { useState } from "react";
import { useLibrary } from "@/lib/library-context";
import { type Borrowing } from "@/lib/data";
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
import { ArrowUpDown, Plus, Search, BookPlus } from "lucide-react";
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
import { toast } from "sonner";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { format, parseISO, addDays } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

const issueSchema = z.object({
  bookId: z.string().min(1, "Book is required"),
  memberId: z.string().min(1, "Member is required"),
  dueDate: z.date({ error: "Due date is required" }),
});

type IssueFormData = z.infer<typeof issueSchema>;

const columns: ColumnDef<Borrowing>[] = [
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
    accessorKey: "borrowDate",
    header: "Borrowed",
    cell: ({ row }) => {
      const date = row.getValue("borrowDate") as string;
      return format(parseISO(date), "MMM d, yyyy");
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dueDate") as string;
      const today = new Date();
      const dueDate = parseISO(date);
      const isPast = dueDate < today && row.original.status !== "Returned";
      return (
        <span className={isPast ? "text-destructive font-medium" : ""}>
          {format(dueDate, "MMM d, yyyy")}
        </span>
      );
    },
  },
  {
    accessorKey: "returnDate",
    header: "Returned",
    cell: ({ row }) => {
      const date = row.getValue("returnDate") as string | null;
      return date ? format(parseISO(date), "MMM d, yyyy") : "-";
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
            status === "Returned"
              ? "default"
              : status === "Overdue"
                ? "destructive"
                : "secondary"
          }
          className={status === "Returned" ? "bg-emerald-500" : ""}
        >
          {status}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      const borrowing = row.original;
      const { returnBook } = table.options.meta as {
        returnBook: (id: string) => void;
      };
      const isReturned = borrowing.status === "Returned";
      return (
        <Button
          variant="outline"
          size="sm"
          disabled={isReturned}
          onClick={() => returnBook(borrowing.id)}
        >
          <BookPlus className="mr-2 h-4 w-4" />
          Return
        </Button>
      );
    },
  },
];

function IssueBookDialog({
  open,
  onOpenChange,
  onSubmit,
  books,
  members,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: IssueFormData) => void;
  books: { id: string; title: string; availableCopies: number }[];
  members: { id: string; name: string; status: string }[];
}) {
  const form = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      bookId: "",
      memberId: "",
      dueDate: addDays(new Date(), 14),
    },
  });

  const availableBooks = books.filter((b) => b.availableCopies > 0);
  const activeMembers = members.filter((m) => m.status === "Active");

  const handleSubmit = (data: IssueFormData) => {
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
          <DialogTitle>Issue Book</DialogTitle>
          <DialogDescription>
            Check out a book to a library member.
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
                        {availableBooks.map((book) => (
                          <CommandItem
                            key={book.id}
                            value={book.title}
                            onSelect={() => field.onChange(book.id)}
                          >
                            <div className="flex flex-col">
                              <span>{book.title}</span>
                              <span className="text-xs text-muted-foreground">
                                {book.availableCopies} copies available
                              </span>
                            </div>
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
            name="dueDate"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Due Date</FieldLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
            <Button type="submit">Issue Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Borrowings() {
  const { books, members, borrowings, addBorrowing, returnBook } = useLibrary();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [showIssueDialog, setShowIssueDialog] = useState(false);

  const table = useReactTable({
    data: borrowings,
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
      returnBook: (id: string) => {
        returnBook(id);
        toast.success("Book returned successfully");
      },
    },
  });

  const handleIssueBook = (data: IssueFormData) => {
    const book = books.find((b) => b.id === data.bookId);
    const member = members.find((m) => m.id === data.memberId);

    if (!book || !member) return;

    addBorrowing({
      bookId: data.bookId,
      bookTitle: book.title,
      memberId: data.memberId,
      memberName: member.name,
      borrowDate: new Date().toISOString().split("T")[0],
      dueDate: format(data.dueDate, "yyyy-MM-dd"),
      returnDate: null,
      status: "Active",
    });
    toast.success(`"${book.title}" issued to ${member.name}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Borrowings</h1>
          <p className="text-muted-foreground">Manage book loans and returns</p>
        </div>
        <Button onClick={() => setShowIssueDialog(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Issue Book
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search borrowings..."
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
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
            <SelectItem value="Overdue">Overdue</SelectItem>
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
                  No borrowings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {table.getPaginationRowModel().rows.length} of{" "}
          {borrowings.length} borrowings
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

      <IssueBookDialog
        open={showIssueDialog}
        onOpenChange={setShowIssueDialog}
        onSubmit={handleIssueBook}
        books={books}
        members={members}
      />
    </div>
  );
}
