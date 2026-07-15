export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publisher: string;
  year: number;
  description: string;
  coverUrl: string;
  totalCopies: number;
  availableCopies: number;
  dateAdded: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType: "Standard" | "Premium" | "Student";
  status: "Active" | "Suspended";
  photoUrl: string;
  dateJoined: string;
  booksBorrowed: number;
}

export interface Borrowing {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  borrowDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Active" | "Returned" | "Overdue";
}

export interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  memberId: string;
  memberName: string;
  reservedOn: string;
  status: "Pending" | "Ready" | "Fulfilled" | "Cancelled";
  notes: string;
}

export const genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Science",
  "Technology",
  "Self-Help",
  "Children",
  "Young Adult",
];

export const mockBooks: Book[] = [
  {
    id: "b1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0743273565",
    genre: "Fiction",
    publisher: "Scribner",
    year: 1925,
    description:
      "A story of decadence and excess in the Jazz Age, following mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.",
    coverUrl:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    totalCopies: 5,
    availableCopies: 3,
    dateAdded: "2024-01-15",
  },
  {
    id: "b2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0061120084",
    genre: "Fiction",
    publisher: "HarperCollins",
    year: 1960,
    description:
      "A gripping tale of racial injustice in the American South through the eyes of young Scout Finch.",
    coverUrl:
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    dateAdded: "2024-01-10",
  },
  {
    id: "b3",
    title: "1984",
    author: "George Orwell",
    isbn: "978-0451524935",
    genre: "Science Fiction",
    publisher: "Signet Classic",
    year: 1949,
    description:
      "A dystopian novel set in a totalitarian society where Big Brother watches every move.",
    coverUrl:
      "https://images.unsplash.com/photo-1512820790803-83ca790254d5?w=300&h=400&fit=crop",
    totalCopies: 6,
    availableCopies: 4,
    dateAdded: "2024-02-01",
  },
  {
    id: "b4",
    title: "Pride and Prejudice",
    author: "Jane Austen",
    isbn: "978-0141439518",
    genre: "Romance",
    publisher: "Penguin Classics",
    year: 1813,
    description:
      "A witty tale of manners and romance featuring the headstrong Elizabeth Bennet and the proud Mr. Darcy.",
    coverUrl:
      "https://images.unsplash.com/photo-1476275466064-3b5e0a52f3e8?w=300&h=400&fit=crop",
    totalCopies: 3,
    availableCopies: 1,
    dateAdded: "2024-01-20",
  },
  {
    id: "b5",
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    isbn: "978-0316769488",
    genre: "Fiction",
    publisher: "Little, Brown and Company",
    year: 1951,
    description:
      "A story of teenage angst and alienation following Holden Caulfield's journey through New York City.",
    coverUrl:
      "https://images.unsplash.com/photo-1589998057037-1e25c7d30f3d?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 3,
    dateAdded: "2024-02-10",
  },
  {
    id: "b6",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    isbn: "978-0547928227",
    genre: "Fantasy",
    publisher: "Houghton Mifflin",
    year: 1937,
    description:
      "Bilbo Baggins embarks on an unexpected journey with Gandalf and thirteen dwarves to reclaim the Lonely Mountain.",
    coverUrl:
      "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=300&h=400&fit=crop",
    totalCopies: 8,
    availableCopies: 5,
    dateAdded: "2024-01-05",
  },
  {
    id: "b7",
    title: "Fahrenheit 451",
    author: "Ray Bradbury",
    isbn: "978-1451673319",
    genre: "Science Fiction",
    publisher: "Simon & Schuster",
    year: 1953,
    description:
      "In a future society where books are banned, fireman Guy Montag begins to question his role in burning knowledge.",
    coverUrl:
      "https://images.unsplash.com/photo-1516979200273-75c73484ea2d?w=300&h=400&fit=crop",
    totalCopies: 3,
    availableCopies: 2,
    dateAdded: "2024-02-15",
  },
  {
    id: "b8",
    title: "The Alchemist",
    author: "Paulo Coelho",
    isbn: "978-0062315007",
    genre: "Fiction",
    publisher: "HarperOne",
    year: 1988,
    description:
      "A young shepherd named Santiago travels from Spain to Egypt in search of treasure near the Pyramids.",
    coverUrl:
      "https://images.unsplash.com/photo-1544974722-84e6ffd3a2c6?w=300&h=400&fit=crop",
    totalCopies: 5,
    availableCopies: 4,
    dateAdded: "2024-01-25",
  },
  {
    id: "b9",
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    isbn: "978-0062316097",
    genre: "History",
    publisher: "Harper",
    year: 2011,
    description:
      "An exploration of human history from the Stone Age to the present, examining how Homo sapiens came to dominate Earth.",
    coverUrl:
      "https://images.unsplash.com/photo-1507842219921-bd6783ff0a77?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    dateAdded: "2024-03-01",
  },
  {
    id: "b10",
    title: "The Da Vinci Code",
    author: "Dan Brown",
    isbn: "978-0307474278",
    genre: "Mystery",
    publisher: "Doubleday",
    year: 2003,
    description:
      "Robert Langdon investigates a murder in the Louvre and uncovers a religious mystery protected by a secret society.",
    coverUrl:
      "https://images.unsplash.com/photo-1481627834866-10d7a4b9c6f3?w=300&h=400&fit=crop",
    totalCopies: 6,
    availableCopies: 3,
    dateAdded: "2024-02-20",
  },
  {
    id: "b11",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    isbn: "978-0553380163",
    genre: "Science",
    publisher: "Bantam",
    year: 1988,
    description:
      "A landmark volume in science writing, exploring the origins and nature of the universe.",
    coverUrl:
      "https://images.unsplash.com/photo-1462331940023-7665a2dc0d09?w=300&h=400&fit=crop",
    totalCopies: 3,
    availableCopies: 2,
    dateAdded: "2024-01-08",
  },
  {
    id: "b12",
    title: "The Girl with the Dragon Tattoo",
    author: "Stieg Larsson",
    isbn: "978-0307454546",
    genre: "Thriller",
    publisher: "Knopf",
    year: 2005,
    description:
      "Journalist Mikael Blomkvist and hacker Lisbeth Salander investigate a decades-old disappearance.",
    coverUrl:
      "https://images.unsplash.com/photo-1553729784-e919358c56d4?w=300&h=400&fit=crop",
    totalCopies: 5,
    availableCopies: 2,
    dateAdded: "2024-02-05",
  },
  {
    id: "b13",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    isbn: "978-1451648545",
    genre: "Biography",
    publisher: "Simon & Schuster",
    year: 2011,
    description:
      "The exclusive biography of Apple co-founder Steve Jobs, based on interviews with Jobs and his family, friends, and colleagues.",
    coverUrl:
      "https://images.unsplash.com/photo-1556761175-b413da4baf1d?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 3,
    dateAdded: "2024-03-10",
  },
  {
    id: "b14",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "978-0132350884",
    genre: "Technology",
    publisher: "Prentice Hall",
    year: 2008,
    description:
      "A handbook of agile software craftsmanship, teaching how to write code that is easy to read, maintain, and extend.",
    coverUrl:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=300&h=400&fit=crop",
    totalCopies: 7,
    availableCopies: 5,
    dateAdded: "2024-01-12",
  },
  {
    id: "b15",
    title: "Atomic Habits",
    author: "James Clear",
    isbn: "978-0735211292",
    genre: "Self-Help",
    publisher: "Avery",
    year: 2018,
    description:
      "An easy and proven way to build good habits and break bad ones through small, incremental changes.",
    coverUrl:
      "https://images.unsplash.com/photo-1506784983877-45594f9a8a57?w=300&h=400&fit=crop",
    totalCopies: 8,
    availableCopies: 4,
    dateAdded: "2024-02-28",
  },
  {
    id: "b16",
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    isbn: "978-0590353427",
    genre: "Fantasy",
    publisher: "Scholastic",
    year: 1997,
    description:
      "Harry Potter discovers his true identity as a wizard and begins his first year at Hogwarts School of Witchcraft and Wizardry.",
    coverUrl:
      "https://images.unsplash.com/photo-1618666014474-4f4d187ca9e7?w=300&h=400&fit=crop",
    totalCopies: 10,
    availableCopies: 6,
    dateAdded: "2024-01-02",
  },
  {
    id: "b17",
    title: "The Hunger Games",
    author: "Suzanne Collins",
    isbn: "978-0439023528",
    genre: "Young Adult",
    publisher: "Scholastic",
    year: 2008,
    description:
      "In a dystopian future, Katniss Everdeen volunteers for the Hunger Games, a televised fight to the death.",
    coverUrl:
      "https://images.unsplash.com/photo-1511763400800-ad3a2461c294?w=300&h=400&fit=crop",
    totalCopies: 6,
    availableCopies: 2,
    dateAdded: "2024-03-05",
  },
  {
    id: "b18",
    title: "Goodnight Moon",
    author: "Margaret Wise Brown",
    isbn: "978-0064430173",
    genre: "Children",
    publisher: "Harper Festival",
    year: 1947,
    description:
      "A beloved bedtime story featuring a little bunny saying goodnight to everything in his room.",
    coverUrl:
      "https://images.unsplash.com/photo-1604866830893-c13cafc515b0?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 4,
    dateAdded: "2024-02-12",
  },
  {
    id: "b19",
    title: "Gone Girl",
    author: "Gillian Flynn",
    isbn: "978-0307588371",
    genre: "Thriller",
    publisher: "Crown",
    year: 2012,
    description:
      "On his fifth wedding anniversary, Nick Dunne's wife Amy disappears. As the search intensifies, Nick becomes the prime suspect.",
    coverUrl:
      "https://images.unsplash.com/photo-1543414226-849d695d3a6e?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 1,
    dateAdded: "2024-01-30",
  },
  {
    id: "b20",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    isbn: "978-0374533557",
    genre: "Non-Fiction",
    publisher: "Farrar, Straus and Giroux",
    year: 2011,
    description:
      "Nobel laureate Daniel Kahneman explains the two systems that drive the way we think: System 1 is fast, System 2 is slow.",
    coverUrl:
      "https://images.unsplash.com/photo-1456513080585-1c0e525c5acc?w=300&h=400&fit=crop",
    totalCopies: 3,
    availableCopies: 2,
    dateAdded: "2024-03-15",
  },
  {
    id: "b21",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    isbn: "978-0544003415",
    genre: "Fantasy",
    publisher: "Houghton Mifflin",
    year: 1954,
    description:
      "Frodo Baggins embarks on a perilous journey to destroy the One Ring and defeat the Dark Lord Sauron.",
    coverUrl:
      "https://images.unsplash.com/photo-1518744823563-3981e1d46b45?w=300&h=400&fit=crop",
    totalCopies: 5,
    availableCopies: 3,
    dateAdded: "2024-01-18",
  },
  {
    id: "b22",
    title: "Brave New World",
    author: "Aldous Huxley",
    isbn: "978-0060850524",
    genre: "Science Fiction",
    publisher: "Harper Perennial",
    year: 1932,
    description:
      "A dystopian vision of a future society where citizens are genetically engineered and conditioned for their roles.",
    coverUrl:
      "https://images.unsplash.com/photo-1495447137275-9d5c0d7a9e95?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 3,
    dateAdded: "2024-02-22",
  },
  {
    id: "b23",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    isbn: "978-1250301697",
    genre: "Mystery",
    publisher: "Celadon Books",
    year: 2019,
    description:
      "Alicia Berenson's life changes when she shoots her husband and never speaks another word. A criminal psychotherapist tries to unlock her silence.",
    coverUrl:
      "https://images.unsplash.com/photo-1543505759-734c3ce7a47e?w=300&h=400&fit=crop",
    totalCopies: 3,
    availableCopies: 2,
    dateAdded: "2024-03-08",
  },
  {
    id: "b24",
    title: "Educated",
    author: "Tara Westover",
    isbn: "978-0399590503",
    genre: "Biography",
    publisher: "Random House",
    year: 2018,
    description:
      "A memoir about a woman who grows up in a survivalist family and eventually earns a PhD from Cambridge.",
    coverUrl:
      "https://images.unsplash.com/photo-1523050856960-a5c4e4b1a6b9?w=300&h=400&fit=crop",
    totalCopies: 4,
    availableCopies: 2,
    dateAdded: "2024-01-22",
  },
  {
    id: "b25",
    title: "The Hitchhiker's Guide to the Galaxy",
    author: "Douglas Adams",
    isbn: "978-0345391803",
    genre: "Science Fiction",
    publisher: "Del Rey",
    year: 1979,
    description:
      "After Earth is demolished, Arthur Dent travels through space with his friend Ford Prefect, armed with the essential guide.",
    coverUrl:
      "https://images.unsplash.com/photo-1446776811953-b23d579c1813?w=300&h=400&fit=crop",
    totalCopies: 5,
    availableCopies: 4,
    dateAdded: "2024-02-08",
  },
];

export const mockMembers: Member[] = [
  {
    id: "m1",
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "(555) 123-4567",
    address: "123 Oak Street, Springfield, IL 62701",
    membershipType: "Premium",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    dateJoined: "2023-06-15",
    booksBorrowed: 12,
  },
  {
    id: "m2",
    name: "Bob Williams",
    email: "bob.williams@email.com",
    phone: "(555) 234-5678",
    address: "456 Maple Avenue, Portland, OR 97201",
    membershipType: "Standard",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    dateJoined: "2023-08-22",
    booksBorrowed: 8,
  },
  {
    id: "m3",
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "(555) 345-6789",
    address: "789 Pine Road, Austin, TX 78701",
    membershipType: "Student",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    dateJoined: "2024-01-10",
    booksBorrowed: 5,
  },
  {
    id: "m4",
    name: "David Martinez",
    email: "david.martinez@email.com",
    phone: "(555) 456-7890",
    address: "101 Cedar Lane, Denver, CO 80201",
    membershipType: "Premium",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1500595046743-c8080c76c8e5?w=150&h=150&fit=crop",
    dateJoined: "2022-11-05",
    booksBorrowed: 24,
  },
  {
    id: "m5",
    name: "Eva Chen",
    email: "eva.chen@email.com",
    phone: "(555) 567-8901",
    address: "202 Birch Court, Seattle, WA 98101",
    membershipType: "Standard",
    status: "Suspended",
    photoUrl:
      "https://images.unsplash.com/photo-1487412720507-e7ab37703c65?w=150&h=150&fit=crop",
    dateJoined: "2023-03-18",
    booksBorrowed: 3,
  },
  {
    id: "m6",
    name: "Frank Thompson",
    email: "frank.thompson@email.com",
    phone: "(555) 678-9012",
    address: "303 Elm Street, Boston, MA 02101",
    membershipType: "Student",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    dateJoined: "2024-02-01",
    booksBorrowed: 2,
  },
  {
    id: "m7",
    name: "Grace Lee",
    email: "grace.lee@email.com",
    phone: "(555) 789-0123",
    address: "404 Walnut Way, San Francisco, CA 94102",
    membershipType: "Premium",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf7283dfc?w=150&h=150&fit=crop",
    dateJoined: "2022-09-12",
    booksBorrowed: 18,
  },
  {
    id: "m8",
    name: "Henry Brown",
    email: "henry.brown@email.com",
    phone: "(555) 890-1234",
    address: "505 Spruce Drive, Miami, FL 33101",
    membershipType: "Standard",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1506794778202-cb70d4e6dce1?w=150&h=150&fit=crop",
    dateJoined: "2023-07-28",
    booksBorrowed: 7,
  },
  {
    id: "m9",
    name: "Iris Wilson",
    email: "iris.wilson@email.com",
    phone: "(555) 901-2345",
    address: "606 Ash Circle, Chicago, IL 60601",
    membershipType: "Student",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop",
    dateJoined: "2024-01-25",
    booksBorrowed: 4,
  },
  {
    id: "m10",
    name: "Jack Garcia",
    email: "jack.garcia@email.com",
    phone: "(555) 012-3456",
    address: "707 Hickory Place, Phoenix, AZ 85001",
    membershipType: "Standard",
    status: "Suspended",
    photoUrl:
      "https://images.unsplash.com/photo-1463453071185-6158ff12844d?w=150&h=150&fit=crop",
    dateJoined: "2023-05-14",
    booksBorrowed: 1,
  },
  {
    id: "m11",
    name: "Karen Miller",
    email: "karen.miller@email.com",
    phone: "(555) 123-4568",
    address: "808 Redwood Blvd, Los Angeles, CA 90001",
    membershipType: "Premium",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69feeb?w=150&h=150&fit=crop",
    dateJoined: "2022-12-03",
    booksBorrowed: 31,
  },
  {
    id: "m12",
    name: "Leo Anderson",
    email: "leo.anderson@email.com",
    phone: "(555) 234-5679",
    address: "909 Sequoia Ave, New York, NY 10001",
    membershipType: "Student",
    status: "Active",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43d?w=150&h=150&fit=crop",
    dateJoined: "2024-03-01",
    booksBorrowed: 1,
  },
];

export const mockBorrowings: Borrowing[] = [
  {
    id: "bw1",
    bookId: "b1",
    bookTitle: "The Great Gatsby",
    memberId: "m1",
    memberName: "Alice Johnson",
    borrowDate: "2024-06-01",
    dueDate: "2024-06-15",
    returnDate: "2024-06-14",
    status: "Returned",
  },
  {
    id: "bw2",
    bookId: "b2",
    bookTitle: "To Kill a Mockingbird",
    memberId: "m2",
    memberName: "Bob Williams",
    borrowDate: "2024-06-10",
    dueDate: "2024-06-24",
    returnDate: null,
    status: "Active",
  },
  {
    id: "bw3",
    bookId: "b3",
    bookTitle: "1984",
    memberId: "m3",
    memberName: "Carol Davis",
    borrowDate: "2024-05-15",
    dueDate: "2024-05-29",
    returnDate: null,
    status: "Overdue",
  },
  {
    id: "bw4",
    bookId: "b4",
    bookTitle: "Pride and Prejudice",
    memberId: "m4",
    memberName: "David Martinez",
    borrowDate: "2024-06-05",
    dueDate: "2024-06-19",
    returnDate: "2024-06-18",
    status: "Returned",
  },
  {
    id: "bw5",
    bookId: "b6",
    bookTitle: "The Hobbit",
    memberId: "m1",
    memberName: "Alice Johnson",
    borrowDate: "2024-06-12",
    dueDate: "2024-06-26",
    returnDate: null,
    status: "Active",
  },
  {
    id: "bw6",
    bookId: "b10",
    bookTitle: "The Da Vinci Code",
    memberId: "m7",
    memberName: "Grace Lee",
    borrowDate: "2024-05-20",
    dueDate: "2024-06-03",
    returnDate: null,
    status: "Overdue",
  },
  {
    id: "bw7",
    bookId: "b15",
    bookTitle: "Atomic Habits",
    memberId: "m8",
    memberName: "Henry Brown",
    borrowDate: "2024-06-08",
    dueDate: "2024-06-22",
    returnDate: null,
    status: "Active",
  },
  {
    id: "bw8",
    bookId: "b16",
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    memberId: "m9",
    memberName: "Iris Wilson",
    borrowDate: "2024-06-14",
    dueDate: "2024-06-28",
    returnDate: null,
    status: "Active",
  },
  {
    id: "bw9",
    bookId: "b17",
    bookTitle: "The Hunger Games",
    memberId: "m11",
    memberName: "Karen Miller",
    borrowDate: "2024-05-25",
    dueDate: "2024-06-08",
    returnDate: "2024-06-07",
    status: "Returned",
  },
  {
    id: "bw10",
    bookId: "b14",
    bookTitle: "Clean Code",
    memberId: "m6",
    memberName: "Frank Thompson",
    borrowDate: "2024-06-03",
    dueDate: "2024-06-17",
    returnDate: "2024-06-16",
    status: "Returned",
  },
  {
    id: "bw11",
    bookId: "b19",
    bookTitle: "Gone Girl",
    memberId: "m2",
    memberName: "Bob Williams",
    borrowDate: "2024-05-28",
    dueDate: "2024-06-11",
    returnDate: null,
    status: "Overdue",
  },
  {
    id: "bw12",
    bookId: "b20",
    bookTitle: "Thinking, Fast and Slow",
    memberId: "m7",
    memberName: "Grace Lee",
    borrowDate: "2024-06-11",
    dueDate: "2024-06-25",
    returnDate: null,
    status: "Active",
  },
];

export const mockReservations: Reservation[] = [
  {
    id: "r1",
    bookId: "b1",
    bookTitle: "The Great Gatsby",
    memberId: "m5",
    memberName: "Eva Chen",
    reservedOn: "2024-06-10",
    status: "Pending",
    notes: "Need for summer reading club.",
  },
  {
    id: "r2",
    bookId: "b3",
    bookTitle: "1984",
    memberId: "m10",
    memberName: "Jack Garcia",
    reservedOn: "2024-06-05",
    status: "Ready",
    notes: "",
  },
  {
    id: "r3",
    bookId: "b6",
    bookTitle: "The Hobbit",
    memberId: "m3",
    memberName: "Carol Davis",
    reservedOn: "2024-06-08",
    status: "Pending",
    notes: "For literature class assignment.",
  },
  {
    id: "r4",
    bookId: "b15",
    bookTitle: "Atomic Habits",
    memberId: "m12",
    memberName: "Leo Anderson",
    reservedOn: "2024-06-01",
    status: "Fulfilled",
    notes: "",
  },
  {
    id: "r5",
    bookId: "b16",
    bookTitle: "Harry Potter and the Sorcerer's Stone",
    memberId: "m6",
    memberName: "Frank Thompson",
    reservedOn: "2024-05-28",
    status: "Fulfilled",
    notes: "Birthday gift for nephew.",
  },
  {
    id: "r6",
    bookId: "b21",
    bookTitle: "The Lord of the Rings",
    memberId: "m1",
    memberName: "Alice Johnson",
    reservedOn: "2024-06-12",
    status: "Cancelled",
    notes: "Found a copy elsewhere.",
  },
  {
    id: "r7",
    bookId: "b4",
    bookTitle: "Pride and Prejudice",
    memberId: "m11",
    memberName: "Karen Miller",
    reservedOn: "2024-06-13",
    status: "Pending",
    notes: "Book club selection for July.",
  },
  {
    id: "r8",
    bookId: "b10",
    bookTitle: "The Da Vinci Code",
    memberId: "m8",
    memberName: "Henry Brown",
    reservedOn: "2024-06-09",
    status: "Ready",
    notes: "",
  },
];

export const monthlyBorrowingData = [
  { month: "Jan", borrows: 45, returns: 38 },
  { month: "Feb", borrows: 52, returns: 48 },
  { month: "Mar", borrows: 61, returns: 55 },
  { month: "Apr", borrows: 58, returns: 60 },
  { month: "May", borrows: 72, returns: 65 },
  { month: "Jun", borrows: 85, returns: 78 },
];

export const memberRegistrationData = [
  { month: "Jan", newMembers: 8 },
  { month: "Feb", newMembers: 12 },
  { month: "Mar", newMembers: 15 },
  { month: "Apr", newMembers: 10 },
  { month: "May", newMembers: 18 },
  { month: "Jun", newMembers: 22 },
];

export const popularBooksData = [
  { title: "Atomic Habits", borrows: 28 },
  { title: "The Great Gatsby", borrows: 24 },
  { title: "Harry Potter", borrows: 22 },
  { title: "Clean Code", borrows: 19 },
  { title: "Fahrenheit 451", borrows: 17 },
];

export const activeMembersData = [
  { name: "Karen Miller", borrows: 31 },
  { name: "David Martinez", borrows: 24 },
  { name: "Grace Lee", borrows: 18 },
  { name: "Alice Johnson", borrows: 12 },
  { name: "Bob Williams", borrows: 8 },
];
