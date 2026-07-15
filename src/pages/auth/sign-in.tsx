import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Alert } from "@/components/ui/alert";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/lib/auth-context";
import { supabase, type UserRole } from "@/lib/supabase";

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type SignInData = z.infer<typeof signInSchema>;

export function SignIn() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: SignInData) => {
    setLoading(true);
    setAuthError(null);
    const { error } = await signIn(data.email, data.password);
    if (error) {
      setAuthError(
        error === "Invalid login credentials"
          ? "Invalid email or password. Please try again."
          : error,
      );
      setLoading(false);
      return;
    }
    // Fetch profile directly to get role for immediate redirect
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .maybeSingle();
      const role = profile?.role as UserRole | undefined;
      if (role === "admin") {
        navigate("/admin", { replace: true });
        return;
      } else if (role === "librarian") {
        navigate("/librarian", { replace: true });
        return;
      } else if (role === "member") {
        navigate("/member", { replace: true });
        return;
      }
    }
    navigate("/sign-in-redirect", { replace: true });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-primary flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary via-primary to-primary/80" />

        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/20 backdrop-blur">
              <BookOpen className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-primary-foreground">
              LibraryPro
            </span>
          </Link>
        </div>

        <div className="relative z-10 space-y-4">
          <h2 className="text-4xl font-bold text-primary-foreground leading-tight">
            Welcome back to your library
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Access your personalized dashboard and manage your library
            experience with ease.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-4">
          {[
            { label: "Books", value: "25+" },
            { label: "Members", value: "12+" },
            { label: "Loans", value: "100+" },
            { label: "Genres", value: "14" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-primary-foreground/10 backdrop-blur p-4"
            >
              <p className="text-2xl font-bold text-primary-foreground">
                {stat.value}
              </p>
              <p className="text-sm text-primary-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-center justify-between p-6 lg:p-8">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-base font-bold">LibraryPro</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <ModeToggle />
            <span className="text-sm text-muted-foreground hidden sm:block">
              Don&apos;t have an account?
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Sign in</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your dashboard
              </p>
            </div>

            {authError && (
              <Alert variant="destructive">
                <p className="text-sm">{authError}</p>
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="you@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <div className="relative">
                      <Input
                        {...field}
                        id={field.name}
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        aria-invalid={fieldState.invalid}
                        className="pr-10"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setShowPassword((s) => !s)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <div className="relative">
              <Separator />
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                OR
              </span>
            </div>

            <div className="space-y-3">
              <p className="text-center text-sm text-muted-foreground font-medium">
                Demo accounts
              </p>
              <div className="grid gap-2">
                {[
                  {
                    role: "Admin",
                    email: "admin@library.com",
                    color: "border-primary/40",
                  },
                  {
                    role: "Librarian",
                    email: "librarian@library.com",
                    color: "border-blue-400",
                  },
                  {
                    role: "Member",
                    email: "member@library.com",
                    color: "border-emerald-400",
                  },
                ].map((demo) => (
                  <button
                    key={demo.role}
                    type="button"
                    onClick={() => {
                      form.setValue("email", demo.email);
                      form.setValue("password", "password123");
                    }}
                    className={`flex items-center gap-3 rounded-lg border-2 ${demo.color} bg-background px-4 py-3 text-left transition-colors hover:bg-muted`}
                  >
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-sm font-medium">
                        {demo.role} Demo
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {demo.email}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0">
                      Click to fill
                    </span>
                  </button>
                ))}
              </div>
              <p className="text-center text-xs text-muted-foreground">
                Demo password:{" "}
                <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
                  password123
                </code>
              </p>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              New to LibraryPro?{" "}
              <Link
                to="/sign-up"
                className="font-medium text-primary hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
