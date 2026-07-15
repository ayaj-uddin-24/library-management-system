import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BookOpen,
  Calendar,
  Tag,
  Layers,
  BookMarked,
  User,
  Building,
  Hash,
  Star,
  Bookmark,
} from "lucide-react";
import type { Book } from "@/lib/data";

interface BookDetailProps {
  book: Book | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReserve?: (bookId: string) => void;
  onBorrow?: (bookId: string) => void;
}

export function BookDetail({
  book,
  open,
  onOpenChange,
  onReserve,
  onBorrow,
}: BookDetailProps) {
  const [reserving, setReserving] = useState(false);

  if (!book) return null;

  const handleReserve = async () => {
    setReserving(true);
    await onReserve?.(book.id);
    setReserving(false);
  };

  const statusColor =
    book.availableCopies > 0
      ? "bg-emerald-500"
      : book.availableCopies === 0
        ? "bg-red-500"
        : "bg-amber-500";

  const statusText =
    book.availableCopies > 0
      ? "Available"
      : book.availableCopies === 0
        ? "Unavailable"
        : "Limited";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-lg bg-muted">
              <BookOpen className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div className="flex-1 min-w-0">
              <DialogTitle className="text-xl">{book.title}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4" />
                {book.author}
              </DialogDescription>
              <div className="flex items-center gap-2 mt-3">
                <Badge
                  variant="secondary"
                  className={statusColor + " text-white"}
                >
                  {statusText}
                </Badge>
                <Badge variant="outline">
                  {book.availableCopies} of {book.totalCopies} available
                </Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[50vh] pr-4">
          <div className="space-y-6 pt-4">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border bg-muted/50 p-3 text-center">
                <Layers className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-lg font-semibold">{book.totalCopies}</p>
                <p className="text-xs text-muted-foreground">Total Copies</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3 text-center">
                <BookMarked className="h-5 w-5 mx-auto mb-1 text-muted-foreground" />
                <p className="text-lg font-semibold">
                  {book.totalCopies - book.availableCopies}
                </p>
                <p className="text-xs text-muted-foreground">On Loan</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-3 text-center">
                <Star className="h-5 w-5 mx-auto mb-1 fill-amber-400 text-amber-400" />
                <p className="text-lg font-semibold">4.5</p>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>

            <Separator />

            {/* Book Details */}
            <div className="space-y-4">
              <h3 className="font-semibold">Book Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Genre</p>
                    <p className="text-sm font-medium">{book.genre}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">ISBN</p>
                    <p className="text-sm font-medium">{book.isbn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Publisher</p>
                    <p className="text-sm font-medium">
                      {book.publisher || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Published</p>
                    <p className="text-sm font-medium">
                      {book.publisher || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {book.description ||
                  "No description available for this book. Contact your librarian for more information."}
              </p>
            </div>

            <Separator />

            {/* Loan Period */}
            <div className="rounded-lg border bg-muted/50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Loan Period</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard 14-day loan period
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    Maximum renewals
                  </p>
                  <p className="text-lg font-semibold">2 times</p>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-4 border-t">
          {book.availableCopies > 0 ? (
            <>
              <Button className="flex-1" onClick={() => onBorrow?.(book.id)}>
                <BookMarked className="mr-2 h-4 w-4" />
                Borrow Now
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleReserve}
                disabled={reserving}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {reserving ? "Reserving..." : "Add to List"}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" disabled className="flex-1">
                <BookMarked className="mr-2 h-4 w-4" />
                Currently Unavailable
              </Button>
              <Button
                className="flex-1"
                onClick={handleReserve}
                disabled={reserving}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {reserving ? "Reserving..." : "Reserve"}
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
