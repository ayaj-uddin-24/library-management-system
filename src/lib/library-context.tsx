import { createContext, useContext, useState, type ReactNode } from "react";
import {
  type Book,
  type Member,
  type Borrowing,
  type Reservation,
  mockBooks,
  mockMembers,
  mockBorrowings,
  mockReservations,
} from "./data";

interface LibraryContextType {
  books: Book[];
  members: Member[];
  borrowings: Borrowing[];
  reservations: Reservation[];
  addBook: (book: Omit<Book, "id" | "dateAdded">) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addMember: (
    member: Omit<Member, "id" | "dateJoined" | "booksBorrowed">,
  ) => void;
  updateMember: (id: string, member: Partial<Member>) => void;
  deleteMember: (id: string) => void;
  addBorrowing: (borrowing: Omit<Borrowing, "id">) => void;
  returnBook: (borrowingId: string) => void;
  addReservation: (reservation: Omit<Reservation, "id">) => void;
  updateReservation: (id: string, status: Reservation["status"]) => void;
  cancelReservation: (id: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [members, setMembers] = useState<Member[]>(mockMembers);
  const [borrowings, setBorrowings] = useState<Borrowing[]>(mockBorrowings);
  const [reservations, setReservations] =
    useState<Reservation[]>(mockReservations);

  const addBook = (bookData: Omit<Book, "id" | "dateAdded">) => {
    const newBook: Book = {
      ...bookData,
      id: `b${generateId()}`,
      dateAdded: new Date().toISOString().split("T")[0],
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updates } : book)),
    );
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const addMember = (
    memberData: Omit<Member, "id" | "dateJoined" | "booksBorrowed">,
  ) => {
    const newMember: Member = {
      ...memberData,
      id: `m${generateId()}`,
      dateJoined: new Date().toISOString().split("T")[0],
      booksBorrowed: 0,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const updateMember = (id: string, updates: Partial<Member>) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...updates } : member,
      ),
    );
  };

  const deleteMember = (id: string) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const addBorrowing = (borrowingData: Omit<Borrowing, "id">) => {
    const newBorrowing: Borrowing = {
      ...borrowingData,
      id: `bw${generateId()}`,
    };
    setBorrowings((prev) => [...prev, newBorrowing]);
    setBooks((prev) =>
      prev.map((book) =>
        book.id === borrowingData.bookId
          ? { ...book, availableCopies: book.availableCopies - 1 }
          : book,
      ),
    );
    setMembers((prev) =>
      prev.map((member) =>
        member.id === borrowingData.memberId
          ? { ...member, booksBorrowed: member.booksBorrowed + 1 }
          : member,
      ),
    );
  };

  const returnBook = (borrowingId: string) => {
    const borrowing = borrowings.find((b) => b.id === borrowingId);
    if (!borrowing) return;

    setBorrowings((prev) =>
      prev.map((b) =>
        b.id === borrowingId
          ? {
              ...b,
              returnDate: new Date().toISOString().split("T")[0],
              status: "Returned",
            }
          : b,
      ),
    );
    setBooks((prev) =>
      prev.map((book) =>
        book.id === borrowing.bookId
          ? { ...book, availableCopies: book.availableCopies + 1 }
          : book,
      ),
    );
  };

  const addReservation = (reservationData: Omit<Reservation, "id">) => {
    const newReservation: Reservation = {
      ...reservationData,
      id: `r${generateId()}`,
    };
    setReservations((prev) => [...prev, newReservation]);
  };

  const updateReservation = (id: string, status: Reservation["status"]) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  };

  const cancelReservation = (id: string) => {
    updateReservation(id, "Cancelled");
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        members,
        borrowings,
        reservations,
        addBook,
        updateBook,
        deleteBook,
        addMember,
        updateMember,
        deleteMember,
        addBorrowing,
        returnBook,
        addReservation,
        updateReservation,
        cancelReservation,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider");
  }
  return context;
}
