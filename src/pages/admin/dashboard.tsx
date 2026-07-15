import { useLibrary } from "@/lib/library-context";
import { useAuth } from "@/lib/auth-context";
import { monthlyBorrowingData } from "@/lib/data";
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
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BookOpen,
  Users,
  BookMarked,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Calendar,
  Shield,
  Settings,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { ScrollArea } from "@/components/ui/scroll-area";

const chartConfig = {
  borrows: { label: "Borrows", color: "var(--chart-1)" },
  returns: { label: "Returns", color: "var(--chart-2)" },
  newMembers: { label: "New Members", color: "var(--chart-3)" },
};

const roleData = [
  { name: "Admin", value: 1, color: "var(--chart-1)" },
  { name: "Librarian", value: 2, color: "var(--chart-2)" },
  { name: "Member", value: 9, color: "var(--chart-3)" },
];

export function AdminDashboard() {
  const { profile } = useAuth();
  const { books, members, borrowings, reservations } = useLibrary();

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
  const pendingReservations = reservations.filter(
    (r) => r.status === "Pending",
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
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name || "Admin"}. Here&apos;s your
            system overview.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/admin/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            {format(today, "MMM d, yyyy")}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
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
              <TrendingUp className="mr-1 h-3 w-3" />
              +5 this month
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
              45 this month
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
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reservations
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingReservations}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">98%</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
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

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Members by role</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-50 w-full">
              <PieChart accessibilityLayer>
                <Pie
                  data={roleData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
            <div className="flex justify-center gap-4 mt-4">
              {roleData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest borrowings across all members
                </CardDescription>
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
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common admin tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/members">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/books">
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Books
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/reports">
                <Activity className="mr-2 h-4 w-4" />
                View Reports
              </Link>
            </Button>
            <Button className="w-full justify-start" variant="outline" asChild>
              <Link to="/admin/settings">
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
