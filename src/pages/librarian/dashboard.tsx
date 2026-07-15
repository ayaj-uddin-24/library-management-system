import { useLibrary } from "@/lib/library-context";
import { useAuth } from "@/lib/auth-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Library,
  BookMarked,
  AlertCircle,
  Calendar,
  BookOpen,
  Clock,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

export function LibrarianDashboard() {
  const { profile } = useAuth();
  const { books, borrowings, reservations } = useLibrary();

  const totalBooks = books.reduce((acc, book) => acc + book.totalCopies, 0);
  const availableBooks = books.reduce(
    (acc, book) => acc + book.availableCopies,
    0,
  );
  const activeBorrowings = borrowings.filter(
    (b) => b.status === "Active",
  ).length;
  const overdueBorrowings = borrowings.filter(
    (b) => b.status === "Overdue",
  ).length;
  const pendingReservations = reservations.filter(
    (r) => r.status === "Pending",
  ).length;
  const todayReturns = borrowings
    .filter((b) => b.status === "Active")
    .slice(0, 3);

  const recentBorrowings = borrowings
    .slice()
    .sort(
      (a, b) =>
        new Date(b.borrowDate).getTime() - new Date(a.borrowDate).getTime(),
    )
    .slice(0, 5);

  const today = new Date();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Library className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold tracking-tight">
              Librarian Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Welcome, {profile?.full_name || "Librarian"}. Manage your daily
            library operations.
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Calendar className="mr-2 h-4 w-4" />
          {format(today, "MMM d, yyyy")}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Books Available
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableBooks}</div>
            <p className="text-xs text-muted-foreground">
              of {totalBooks} total copies
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loans</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBorrowings}</div>
            <p className="text-xs text-muted-foreground">Currently borrowed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Books</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueBorrowings}
            </div>
            <p className="text-xs text-muted-foreground">Need follow-up</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reservations
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations}</div>
            <p className="text-xs text-muted-foreground">Awaiting pickup</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Today&apos;s Tasks</CardTitle>
                <CardDescription>
                  Books returning today and pending reservations
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/librarian/borrowings">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Upcoming Returns</h4>
                <ScrollArea className="h-37.5">
                  {todayReturns.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      No returns scheduled
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {todayReturns.map((b) => (
                        <div
                          key={b.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div>
                            <p className="font-medium text-sm">{b.bookTitle}</p>
                            <p className="text-xs text-muted-foreground">
                              {b.memberName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              Due: {format(parseISO(b.dueDate), "MMM d")}
                            </span>
                            <Button size="sm" variant="outline">
                              Return
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2">
                  Pending Reservations to Process
                </h4>
                <ScrollArea className="h-37.5">
                  {reservations.filter((r) => r.status === "Pending").length ===
                  0 ? (
                    <p className="text-sm text-muted-foreground">
                      No pending reservations
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {reservations
                        .filter((r) => r.status === "Pending")
                        .slice(0, 3)
                        .map((r) => (
                          <div
                            key={r.id}
                            className="flex items-center justify-between rounded-lg border p-3"
                          >
                            <div>
                              <p className="font-medium text-sm">
                                {r.bookTitle}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {r.memberName}
                              </p>
                            </div>
                            <Button size="sm">Process</Button>
                          </div>
                        ))}
                    </div>
                  )}
                </ScrollArea>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common librarian tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/librarian/catalog">
                <BookOpen className="mr-2 h-4 w-4" />
                Search Catalog
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/librarian/borrowings">
                <BookMarked className="mr-2 h-4 w-4" />
                Issue / Return Book
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/librarian/reservations">
                <Clock className="mr-2 h-4 w-4" />
                Manage Reservations
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/librarian/members">
                <CheckCircle className="mr-2 h-4 w-4" />
                View Members
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Borrowings</CardTitle>
              <CardDescription>
                Latest books checked out by members
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/librarian/borrowings">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Book</TableHead>
                <TableHead>Member</TableHead>
                <TableHead>Borrowed</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentBorrowings.map((borrowing) => (
                <TableRow key={borrowing.id}>
                  <TableCell className="font-medium">
                    {borrowing.bookTitle}
                  </TableCell>
                  <TableCell>{borrowing.memberName}</TableCell>
                  <TableCell>
                    {format(parseISO(borrowing.borrowDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(parseISO(borrowing.dueDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        borrowing.status === "Returned"
                          ? "default"
                          : borrowing.status === "Overdue"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {borrowing.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
