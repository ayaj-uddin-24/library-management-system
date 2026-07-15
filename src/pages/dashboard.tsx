import { useLibrary } from "@/lib/library-context";
import { monthlyBorrowingData, memberRegistrationData } from "@/lib/data";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, CartesianGrid, LineChart, Line } from "recharts";
import {
  BookOpen,
  Users,
  BookMarked,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  borrows: {
    label: "Borrows",
    color: "var(--chart-1)",
  },
  returns: {
    label: "Returns",
    color: "var(--chart-2)",
  },
  newMembers: {
    label: "New Members",
    color: "var(--chart-3)",
  },
};

export function Dashboard() {
  const { books, members, borrowings } = useLibrary();

  const totalBooks = books.reduce((acc, book) => acc + book.totalCopies, 0);
  const availableBooks = books.reduce(
    (acc, book) => acc + book.availableCopies,
    0,
  );
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const activeBorrowings = borrowings.filter(
    (b) => b.status === "Active",
  ).length;
  const overdueBorrowings = borrowings.filter(
    (b) => b.status === "Overdue",
  ).length;

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
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s an overview of your library.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {format(today, "MMMM d, yyyy")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBooks}</div>
            <p className="text-xs text-muted-foreground">
              {availableBooks} available
            </p>
            <div className="mt-2 flex items-center text-xs text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12 from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Members
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeMembers}</div>
            <p className="text-xs text-muted-foreground">
              {members.length} total registered
            </p>
            <div className="mt-2 flex items-center text-xs text-emerald-500">
              <TrendingUp className="mr-1 h-3 w-3" />+
              {
                memberRegistrationData[memberRegistrationData.length - 1]
                  .newMembers
              }{" "}
              this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Books Borrowed
            </CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeBorrowings}</div>
            <p className="text-xs text-muted-foreground">Currently on loan</p>
            <div className="mt-2 flex items-center text-xs text-muted-foreground">
              <ArrowRight className="mr-1 h-3 w-3" />
              {
                monthlyBorrowingData[monthlyBorrowingData.length - 1].borrows
              }{" "}
              this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Items</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {overdueBorrowings}
            </div>
            <p className="text-xs text-muted-foreground">Need attention</p>
            <div className="mt-2 flex items-center text-xs text-destructive">
              <TrendingDown className="mr-1 h-3 w-3" />
              -3 from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Borrowing Activity</CardTitle>
            <CardDescription>
              Monthly borrowing trends for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-62.5 w-full">
              <BarChart accessibilityLayer data={monthlyBorrowingData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="borrows" fill="var(--color-borrows)" radius={4} />
                <Bar dataKey="returns" fill="var(--color-returns)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Member Registrations</CardTitle>
            <CardDescription>New members joining each month</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-62.5 w-full">
              <LineChart accessibilityLayer data={memberRegistrationData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="newMembers"
                  stroke="var(--color-newMembers)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-newMembers)", r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Borrowings</CardTitle>
                <CardDescription>Latest books checked out</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/borrowings">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-75">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Book</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentBorrowings.map((borrowing) => (
                    <TableRow key={borrowing.id}>
                      <TableCell className="font-medium max-w-37.5 truncate">
                        {borrowing.bookTitle}
                      </TableCell>
                      <TableCell className="max-w-30 truncate">
                        {borrowing.memberName}
                      </TableCell>
                      <TableCell>
                        {format(parseISO(borrowing.borrowDate), "MMM d")}
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
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Overdue Books</CardTitle>
                <CardDescription>Items past due date</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/borrowings">View all</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-75">
              {borrowings.filter((b) => b.status === "Overdue").length === 0 ? (
                <div className="flex h-full items-center justify-center text-muted-foreground">
                  No overdue books
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Days Overdue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowings
                      .filter((b) => b.status === "Overdue")
                      .map((borrowing) => {
                        const dueDate = parseISO(borrowing.dueDate);
                        const daysOverdue = Math.floor(
                          (today.getTime() - dueDate.getTime()) /
                            (1000 * 60 * 60 * 24),
                        );
                        return (
                          <TableRow key={borrowing.id}>
                            <TableCell className="font-medium max-w-37.5 truncate">
                              {borrowing.bookTitle}
                            </TableCell>
                            <TableCell className="max-w-30 truncate">
                              {borrowing.memberName}
                            </TableCell>
                            <TableCell>{format(dueDate, "MMM d")}</TableCell>
                            <TableCell>
                              <Badge variant="destructive">
                                {daysOverdue} days
                              </Badge>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
