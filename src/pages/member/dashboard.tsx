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
  BookOpen,
  BookMarked,
  Clock,
  Calendar,
  Search,
  History,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";

export function MemberDashboard() {
  const { profile } = useAuth();
  const { books, borrowings, reservations } = useLibrary();

  // Simulate member's own data (in real app, filtered by user ID)
  const myBorrowings = borrowings.slice(0, 3);
  const myReservations = reservations
    .filter((r) => r.status === "Pending")
    .slice(0, 2);
  const activeLoans = myBorrowings.filter(
    (b) => b.status === "Active" || b.status === "Overdue",
  );
  const availableBooks = books.filter((b) => b.availableCopies > 0);

  const today = new Date();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome, {profile?.full_name || "Member"}
          </h1>
          <p className="text-muted-foreground">
            Manage your library account and discover new books.
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
              My Active Loans
            </CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLoans.length}</div>
            <p className="text-xs text-muted-foreground">
              Books currently borrowed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              My Reservations
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myReservations.length}</div>
            <p className="text-xs text-muted-foreground">Pending pickup</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Books Available
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableBooks.length}</div>
            <p className="text-xs text-muted-foreground">Ready to borrow</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Membership Status
            </CardTitle>
            <Badge variant="default">Active</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Gold</div>
            <p className="text-xs text-muted-foreground">Premium member</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Current Loans</CardTitle>
                <CardDescription>
                  Books you currently have checked out
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/member/history">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {activeLoans.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <BookOpen className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">No active loans</p>
                <Button className="mt-4" asChild>
                  <Link to="/member/catalog">
                    Browse Books <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeLoans.map((loan) => (
                  <div
                    key={loan.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex gap-4">
                      <div className="flex h-16 w-12 items-center justify-center rounded bg-muted">
                        <BookOpen className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{loan.bookTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Borrowed:{" "}
                          {format(parseISO(loan.borrowDate), "MMM d, yyyy")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Due: {format(parseISO(loan.dueDate), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge
                        variant={
                          loan.status === "Overdue"
                            ? "destructive"
                            : "secondary"
                        }
                      >
                        {loan.status}
                      </Badge>
                      {loan.status === "Overdue" && (
                        <div className="flex items-center text-xs text-destructive">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Overdue
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common member tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" asChild>
              <Link to="/member/catalog">
                <Search className="mr-2 h-4 w-4" />
                Search Catalog
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/member/reservations">
                <Clock className="mr-2 h-4 w-4" />
                My Reservations
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/member/history">
                <History className="mr-2 h-4 w-4" />
                Borrowing History
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Popular Books</CardTitle>
              <CardDescription>Trending titles in the library</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/member/catalog">
                View all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {books.slice(0, 4).map((book) => (
              <div
                key={book.id}
                className="flex flex-col rounded-lg border overflow-hidden"
              >
                <div className="flex h-32 items-center justify-center bg-muted">
                  <BookOpen className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <div className="p-3">
                  <p className="font-medium text-sm truncate">{book.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {book.author}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge
                      variant={
                        book.availableCopies > 0 ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {book.availableCopies > 0
                        ? `${book.availableCopies} available`
                        : "Reserved"}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={book.availableCopies === 0}
                    >
                      Reserve
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
