import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { supabase, type UserRole } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export function SignInRedirect() {
  const { profile, role, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Navigate if we already have the profile from context
    if (!loading && profile && role) {
      const path =
        role === "admin"
          ? "/admin"
          : role === "librarian"
            ? "/librarian"
            : "/member";
      navigate(path, { replace: true });
      return;
    }

    // Fallback: fetch directly from supabase if context hasn't loaded profile
    if (!loading && !profile) {
      const fetchAndRedirect = async () => {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          navigate("/sign-in", { replace: true });
          return;
        }
        const { data } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        const userRole = data?.role as UserRole | undefined;
        if (userRole === "admin") {
          navigate("/admin", { replace: true });
        } else if (userRole === "librarian") {
          navigate("/librarian", { replace: true });
        } else if (userRole === "member") {
          navigate("/member", { replace: true });
        } else {
          navigate("/sign-in", { replace: true });
        }
      };
      fetchAndRedirect();
    }
  }, [profile, role, loading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-muted-foreground">Redirecting to your dashboard...</p>
    </div>
  );
}
