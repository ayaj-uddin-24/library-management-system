import { useLibrary } from "@/lib/library-context";
import {
  monthlyBorrowingData,
  memberRegistrationData,
  popularBooksData,
  activeMembersData,
} from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  BookOpen,
  Users,
  BookMarked,
  AlertCircle,
} from "lucide-react";
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
  borrowsCount: {
    label: "Borrows",
    color: "var(--chart-4)",
  },
};

export function Reports() {
  const { books, members, borrowings } = useLibrary();
  const [timeRange, setTimeRange] = useState("6months");

  const totalBooks = books.reduce((acc, book) => acc + book.totalCopies, 0);
  const activeMembers = members.filter((m) => m.status === "Active").length;
  const activeBorrowings = borrowings.filter(
    (b) => b.status === "Active",
  ).length;
  const overdueBorrowings = borrowings.filter(
    (b) => b.status === "Overdue",
  ).length;
  const totalBorrowingsThisMonth =
    monthlyBorrowingData[monthlyBorrowingData.length - 1].borrows;
  const totalBorrowsLastMonth =
    monthlyBorrowingData[monthlyBorrowingData.length - 2].borrows;
  const borrowGrowth =
    ((totalBorrowingsThisMonth - totalBorrowsLastMonth) /
      totalBorrowsLastMonth) *
    100;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Insights and statistics about your library
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-45">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="thisWeek">This Week</SelectItem>
            <SelectItem value="thisMonth">This Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="borrowing">Borrowing Trends</TabsTrigger>
          <TabsTrigger value="popular">Popular Books</TabsTrigger>
          <TabsTrigger value="members">Member Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Books
                </CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalBooks}</div>
                <p className="text-xs text-muted-foreground">
                  {books.length} unique titles
                </p>
                <div className="mt-2 flex items-center text-xs text-emerald-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +5% from last quarter
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
                  registered users
                </p>
                <div className="mt-2 flex items-center text-xs text-emerald-500">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  +22% growth this month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Books Out</CardTitle>
                <BookMarked className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeBorrowings}</div>
                <p className="text-xs text-muted-foreground">
                  currently on loan
                </p>
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="mr-1 h-3 w-3" />
                  {Math.abs(borrowGrowth).toFixed(0)}% vs last month
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Overdue</CardTitle>
                <AlertCircle className="h-4 w-4 text-destructive" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {overdueBorrowings}
                </div>
                <p className="text-xs text-muted-foreground">need attention</p>
                <div className="mt-2 flex items-center text-xs text-destructive">
                  <TrendingDown className="mr-1 h-3 w-3" />
                  -3 from last week
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Borrowing Activity</CardTitle>
                <CardDescription>
                  Monthly borrowing trends for the current year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-75 w-full"
                >
                  <BarChart accessibilityLayer data={monthlyBorrowingData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="borrows"
                      fill="var(--color-borrows)"
                      radius={4}
                    />
                    <Bar
                      dataKey="returns"
                      fill="var(--color-returns)"
                      radius={4}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Member Registrations</CardTitle>
                <CardDescription>
                  New members joining each month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={chartConfig}
                  className="min-h-75 w-full"
                >
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
        </TabsContent>

        <TabsContent value="borrowing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Borrowing Trends</CardTitle>
              <CardDescription>
                Track borrowals and returns over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-100 w-full">
                <AreaChart accessibilityLayer data={monthlyBorrowingData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="borrows"
                    stroke="var(--color-borrows)"
                    fill="var(--color-borrows)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="returns"
                    stroke="var(--color-returns)"
                    fill="var(--color-returns)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Borrow Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5 days</div>
                <p className="text-xs text-muted-foreground">
                  from 14-day standard loan
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Return Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">94.2%</div>
                <p className="text-xs text-muted-foreground">on-time returns</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Renewal Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18.6%</div>
                <p className="text-xs text-muted-foreground">
                  books renewed once
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Borrowed Books</CardTitle>
              <CardDescription>
                Top performing titles in your collection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-100 w-full">
                <BarChart
                  accessibilityLayer
                  data={popularBooksData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="title"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={150}
                    tickFormatter={(value: string) => value.slice(0, 20)}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="borrows"
                    fill="var(--color-borrowsCount)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Genre Distribution</CardTitle>
              <CardDescription>Popularity by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-75">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Genre</TableHead>
                      <TableHead className="text-right">Books</TableHead>
                      <TableHead className="text-right">Borrows</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { genre: "Fiction", books: 8, borrows: 45 },
                      { genre: "Science Fiction", books: 5, borrows: 32 },
                      { genre: "Fantasy", books: 4, borrows: 28 },
                      { genre: "Mystery", books: 3, borrows: 22 },
                      { genre: "Thriller", books: 3, borrows: 19 },
                      { genre: "Biography", books: 3, borrows: 15 },
                      { genre: "Self-Help", books: 2, borrows: 28 },
                      { genre: "Technology", books: 2, borrows: 19 },
                      { genre: "History", books: 1, borrows: 12 },
                      { genre: "Romance", books: 1, borrows: 8 },
                    ].map((row) => (
                      <TableRow key={row.genre}>
                        <TableCell>{row.genre}</TableCell>
                        <TableCell className="text-right">
                          {row.books}
                        </TableCell>
                        <TableCell className="text-right">
                          {row.borrows}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Most Active Members</CardTitle>
              <CardDescription>
                Members with the highest borrowing activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="min-h-100 w-full">
                <BarChart
                  accessibilityLayer
                  data={activeMembersData}
                  layout="vertical"
                  margin={{ left: 20 }}
                >
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    width={120}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="borrows"
                    fill="var(--color-borrowsCount)"
                    radius={4}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  New Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {
                    memberRegistrationData[memberRegistrationData.length - 1]
                      .newMembers
                  }
                </div>
                <p className="text-xs text-muted-foreground">
                  joined this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Premium Members
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {members.filter((m) => m.membershipType === "Premium").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  subscriber accounts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-emerald-600">
                  {((activeMembers / members.length) * 100).toFixed(0)}%
                </div>
                <p className="text-xs text-muted-foreground">members active</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Member Activity Log</CardTitle>
              <CardDescription>Recent borrowing activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-62.5">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Action</TableHead>
                      <TableHead>Book</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {borrowings.slice(0, 8).map((b) => (
                      <TableRow key={b.id}>
                        <TableCell>{b.memberName}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              b.status === "Returned" ? "default" : "secondary"
                            }
                          >
                            {b.status === "Returned" ? "Returned" : "Borrowed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-37.5 truncate">
                          {b.bookTitle}
                        </TableCell>
                        <TableCell>{b.borrowDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
