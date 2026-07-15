import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { LibraryProvider } from "@/lib/library-context";
import { AuthProvider } from "@/lib/auth-context";
import { ProtectedRoute } from "@/components/protected-route";
import { Layout } from "@/components/layout";
import { Home } from "@/pages/home";
import { SignIn } from "@/pages/auth/sign-in";
import { SignUp } from "@/pages/auth/sign-up";
import { SignInRedirect } from "@/pages/auth/sign-in-redirect";
import { AdminDashboard } from "@/pages/admin/dashboard";
import { LibrarianDashboard } from "@/pages/librarian/dashboard";
import { MemberDashboard } from "@/pages/member/dashboard";
import { Dashboard } from "@/pages/dashboard";
import { Books } from "@/pages/books";
import { Members } from "@/pages/members";
import { Borrowings } from "@/pages/borrowings";
import { Reservations } from "@/pages/reservations";
import { Catalog } from "@/pages/catalog";
import { Reports } from "@/pages/reports";
import { Settings } from "@/pages/settings";
import { Profile } from "@/pages/profile";
import { Notifications } from "@/pages/notifications";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LibraryProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in-redirect" element={<SignInRedirect />} />

            {/* Admin routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="members" element={<Members />} />
              <Route path="borrowings" element={<Borrowings />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* Librarian routes */}
            <Route
              path="/librarian"
              element={
                <ProtectedRoute allowedRoles={["librarian"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<LibrarianDashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="members" element={<Members />} />
              <Route path="borrowings" element={<Borrowings />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="catalog" element={<Catalog />} />
            </Route>

            {/* Member routes */}
            <Route
              path="/member"
              element={
                <ProtectedRoute allowedRoles={["member"]}>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<MemberDashboard />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="borrowings" element={<Borrowings />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="history" element={<Borrowings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* Legacy dashboard route - redirects based on role */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="books" element={<Books />} />
              <Route path="members" element={<Members />} />
              <Route path="borrowings" element={<Borrowings />} />
              <Route path="reservations" element={<Reservations />} />
              <Route path="catalog" element={<Catalog />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster />
        </LibraryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
