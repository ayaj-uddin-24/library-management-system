import { useState } from "react";
import { useLibrary } from "@/lib/library-context";
import { genres } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Star } from "lucide-react";

export function Catalog() {
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("all");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesGenre =
      selectedGenre === "all" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const featuredBooks = books.slice(0, 4);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Catalog</h1>
          <p className="text-muted-foreground">
            Browse and discover books in our collection
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-linear-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{books.length}</div>
            <p className="text-xs text-muted-foreground">titles in catalog</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-emerald-500/10 to-emerald-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-600">
              {books.filter((b) => b.availableCopies > 0).length}
            </div>
            <p className="text-xs text-muted-foreground">titles available</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-red-500/10 to-red-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Checked Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">
              {books.filter((b) => b.availableCopies === 0).length}
            </div>
            <p className="text-xs text-muted-foreground">fully borrowed</p>
          </CardContent>
        </Card>
        <Card className="bg-linear-to-br from-blue-500/10 to-blue-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Genres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">
              {genres.length}
            </div>
            <p className="text-xs text-muted-foreground">categories</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by title, author, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={selectedGenre} onValueChange={setSelectedGenre}>
          <SelectTrigger className="w-37.5">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {searchQuery === "" && selectedGenre === "all" && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">
            Featured Books
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {featuredBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden">
                <div className="aspect-3/4 w-full overflow-hidden bg-muted">
                  {book.coverUrl ? (
                    <img
                      src={book.coverUrl}
                      alt={book.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <BookOpen className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardHeader className="p-3">
                  <CardTitle className="line-clamp-1 text-sm">
                    {book.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-1 text-xs">
                    {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <Badge variant="outline" className="text-xs">
                    {book.genre}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          {searchQuery || selectedGenre !== "all"
            ? "Search Results"
            : "All Books"}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            ({filteredBooks.length} books)
          </span>
        </h2>
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="overflow-hidden flex flex-col">
              <div className="aspect-3/4 w-full overflow-hidden bg-muted">
                {book.coverUrl ? (
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader className="p-3 flex-1">
                <CardTitle className="line-clamp-2 text-sm">
                  {book.title}
                </CardTitle>
                <CardDescription className="line-clamp-1 text-xs">
                  {book.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {book.genre}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs text-muted-foreground">
                      {(Math.random() * 2 + 3).toFixed(1)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-3 pt-0">
                <div className="flex w-full items-center justify-between">
                  <Badge
                    variant={
                      book.availableCopies > 0 ? "default" : "destructive"
                    }
                    className={book.availableCopies > 0 ? "bg-emerald-500" : ""}
                  >
                    {book.availableCopies > 0 ? "Available" : "Borrowed"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {book.availableCopies}/{book.totalCopies}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        {filteredBooks.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
            <BookOpen className="h-12 w-12 mb-4 opacity-50" />
            <p>No books found matching your criteria.</p>
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("all");
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
