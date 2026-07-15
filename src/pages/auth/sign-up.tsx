import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookOpen, Eye, EyeOff, Shield, Library, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Alert } from "@/components/ui/alert";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/lib/auth-context";
import type { UserRole } from "@/lib/supabase";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "librarian", "member"], {
    error: "Please select a role",
  }),
});

type SignUpData = z.infer<typeof signUpSchema>;

const roles: {
  value: UserRole;
  label: string;
  icon: typeof Shield;
  description: string;
}[] = [
  {
    value: "member",
    label: "Member",
    icon: User,
    description: "Browse, borrow, and manage your reading",
  },
  {
    value: "librarian",
    label: "Librarian",
    icon: Library,
    description: "Manage catalog and circulation",
  },
  {
    value: "admin",
    label: "Admin",
    icon: Shield,
    description: "Full system control and oversight",
  },
];

export function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "", role: "member" },
  });

  const onSubmit = async (data: SignUpData) => {
    setLoading(true);
    setAuthError(null);
    const { error } = await signUp(
      data.email,
      data.password,
      data.fullName,
      data.role,
    );
    if (error) {
      setAuthError(error);
      setLoading(false);
      return;
    }
    navigate("/sign-in");
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
            Join our library community
          </h2>
          <p className="text-primary-foreground/70 text-lg leading-relaxed">
            Create your account and start exploring thousands of books, manage
            your reading list, and connect with fellow readers.
          </p>
        </div>

        <div className="relative z-10 space-y-4">
          <p className="text-sm font-medium text-primary-foreground/80">
            Choose your role:
          </p>
          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.value}
                className="flex items-center gap-3 rounded-lg bg-primary-foreground/10 backdrop-blur p-3"
              >
                <role.icon className="h-5 w-5 text-primary-foreground" />
                <div>
                  <p className="font-medium text-primary-foreground">
                    {role.label}
                  </p>
                  <p className="text-xs text-primary-foreground/70">
                    {role.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
              Already have an account?
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link to="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Create an account
              </h1>
              <p className="text-muted-foreground">
                Enter your details to get started
              </p>
            </div>

            {authError && (
              <Alert variant="destructive">
                <p className="text-sm">{authError}</p>
              </Alert>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="John Doe"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

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

              <Controller
                name="role"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Select your role</FieldLabel>
                    <div className="grid grid-cols-3 gap-3 mt-2">
                      {roles.map((role) => (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => field.onChange(role.value)}
                          className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                            field.value === role.value
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-muted-foreground/50"
                          }`}
                        >
                          <role.icon
                            className={`h-6 w-6 ${field.value === role.value ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <span
                            className={`text-sm font-medium ${field.value === role.value ? "text-primary" : "text-foreground"}`}
                          >
                            {role.label}
                          </span>
                        </button>
                      ))}
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
                {loading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
              By signing up, you agree to our{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-primary hover:underline">
                Privacy Policy
              </a>
            </p>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/sign-in"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
