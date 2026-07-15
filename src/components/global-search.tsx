import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command";
import { BookOpen, Users, BookMarked, Search, ArrowRight } from "lucide-react";
import { useLibrary } from "@/lib/library-context";

interface GlobalSearchProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface SearchResult {
  type: "book" | "member" | "borrowing";
  id: string;
  title: string;
  subtitle: string;
  icon: typeof BookOpen;
}

export function GlobalSearch({ open, onOpenChange }: GlobalSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const { books, members, borrowings } = useLibrary();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const matched: SearchResult[] = [];

    // Search books
    books
      .filter(
        (b) =>
          b.title.toLowerCase().includes(lowerQuery) ||
          b.author.toLowerCase().includes(lowerQuery) ||
          b.isbn.toLowerCase().includes(lowerQuery) ||
          b.genre.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 5)
      .forEach((book) => {
        matched.push({
          type: "book",
          id: book.id,
          title: book.title,
          subtitle: `by ${book.author} • ${book.genre}`,
          icon: BookOpen,
        });
      });

    // Search members
    members
      .filter(
        (m) =>
          m.name.toLowerCase().includes(lowerQuery) ||
          m.email.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 3)
      .forEach((member) => {
        matched.push({
          type: "member",
          id: member.id,
          title: member.name,
          subtitle: `${member.email} • ${member.membershipType}`,
          icon: Users,
        });
      });

    // Search borrowings
    borrowings
      .filter(
        (b) =>
          b.bookTitle.toLowerCase().includes(lowerQuery) ||
          b.memberName.toLowerCase().includes(lowerQuery),
      )
      .slice(0, 3)
      .forEach((borrowing) => {
        matched.push({
          type: "borrowing",
          id: borrowing.id,
          title: borrowing.bookTitle,
          subtitle: `${borrowing.memberName} • ${borrowing.status}`,
          icon: BookMarked,
        });
      });

    setResults(matched.slice(0, 10));
  }, [query, books, members, borrowings]);

  const handleSelect = (result: SearchResult) => {
    onOpenChange(false);
    setQuery("");
    switch (result.type) {
      case "book":
        navigate(`/catalog?highlight=${result.id}`);
        break;
      case "member":
        navigate(`/members?highlight=${result.id}`);
        break;
      case "borrowing":
        navigate(`/borrowings?highlight=${result.id}`);
        break;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="overflow-hidden border-0 p-0 shadow-lg max-w-lg">
        <Command className="rounded-lg border shadow-md">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              ref={inputRef as React.RefObject<HTMLInputElement>}
              value={query}
              onValueChange={setQuery}
              placeholder="Search books, members, borrowings..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandList className="max-h-75">
            {results.length === 0 && query.length >= 2 ? (
              <CommandEmpty>No results found for "{query}"</CommandEmpty>
            ) : (
              <>
                {results.filter((r) => r.type === "book").length > 0 && (
                  <>
                    <CommandGroup heading="Books">
                      {results
                        .filter((r) => r.type === "book")
                        .map((result) => (
                          <CommandItem
                            key={`${result.type}-${result.id}`}
                            onSelect={() => handleSelect(result)}
                            className="flex cursor-pointer items-center gap-3 px-3 py-2"
                          >
                            <result.icon className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {result.subtitle}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 opacity-50" />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
                {results.filter((r) => r.type === "member").length > 0 && (
                  <>
                    <CommandGroup heading="Members">
                      {results
                        .filter((r) => r.type === "member")
                        .map((result) => (
                          <CommandItem
                            key={`${result.type}-${result.id}`}
                            onSelect={() => handleSelect(result)}
                            className="flex cursor-pointer items-center gap-3 px-3 py-2"
                          >
                            <result.icon className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">
                                {result.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {result.subtitle}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 opacity-50" />
                          </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                  </>
                )}
                {results.filter((r) => r.type === "borrowing").length > 0 && (
                  <CommandGroup heading="Borrowings">
                    {results
                      .filter((r) => r.type === "borrowing")
                      .map((result) => (
                        <CommandItem
                          key={`${result.type}-${result.id}`}
                          onSelect={() => handleSelect(result)}
                          className="flex cursor-pointer items-center gap-3 px-3 py-2"
                        >
                          <result.icon className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">
                              {result.title}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {result.subtitle}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 opacity-50" />
                        </CommandItem>
                      ))}
                  </CommandGroup>
                )}
              </>
            )}
            {query.length < 2 && (
              <div className="py-6 text-center text-sm text-muted-foreground">
                <Search className="mx-auto h-8 w-8 opacity-50 mb-2" />
                <p>Start typing to search</p>
                <p className="text-xs mt-1">
                  Search books, members, and borrowings
                </p>
              </div>
            )}
          </CommandList>
          <div className="border-t px-3 py-2 flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">Enter</kbd>
              <span>to select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="rounded border bg-muted px-1.5 py-0.5">Esc</kbd>
              <span>to close</span>
            </div>
          </div>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

// Search trigger button component
export function SearchTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-md border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors w-full max-w-60 justify-start"
    >
      <Search className="h-4 w-4" />
      <span className="hidden sm:inline">Search...</span>
      <kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
        <span className="text-xs">⌘</span>K
      </kbd>
    </button>
  );
}
