import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Mail,
  Phone,
  Shield,
  Calendar,
  BookOpen,
  BookMarked,
  Clock,
  Edit2,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useLibrary } from "@/lib/library-context";
import { format, parseISO } from "date-fns";

const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().optional(),
});

type ProfileData = z.infer<typeof profileSchema>;

export function Profile() {
  const { profile, role } = useAuth();
  const { borrowings, reservations } = useLibrary();
  const [editing, setEditing] = useState(false);

  const form = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile?.full_name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
    },
  });

  const myBorrowings = borrowings.filter(
    (b) => b.status === "Active" || b.status === "Overdue",
  );
  const myReservations = reservations.filter((r) => r.status === "Pending");

  const getRoleBadgeColor = () => {
    if (role === "admin") return "bg-primary text-primary-foreground";
    if (role === "librarian") return "bg-blue-600 text-white";
    return "bg-emerald-600 text-white";
  };

  const onSave = async (data: ProfileData) => {
    console.log("Saving profile:", data);
    setEditing(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src={profile?.avatar_url || ""} />
              <AvatarFallback className="text-2xl">
                {profile?.full_name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{profile?.full_name || "User"}</CardTitle>
            <CardDescription>{profile?.email}</CardDescription>
            <div className="flex justify-center mt-2">
              <Badge className={getRoleBadgeColor()}>
                <Shield className="mr-1 h-3 w-3" />
                {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Member"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{profile?.email}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{profile?.phone || "No phone added"}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>
                Joined{" "}
                {profile?.created_at
                  ? format(parseISO(profile.created_at), "MMM yyyy")
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Profile Edit Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>
                  Update your personal details here.
                </CardDescription>
              </div>
              {!editing ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditing(true)}
                >
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditing(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button size="sm" onClick={form.handleSubmit(onSave)}>
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        disabled={!editing}
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
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        {...field}
                        id={field.name}
                        type="email"
                        disabled={!editing}
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      disabled={!editing}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Account Overview</CardTitle>
          <CardDescription>Your library activity at a glance.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border bg-muted/50 p-4 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-bold">{myBorrowings.length}</p>
              <p className="text-sm text-muted-foreground">Active Loans</p>
            </div>
            <div className="rounded-xl border bg-muted/50 p-4 text-center">
              <BookMarked className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold">{myReservations.length}</p>
              <p className="text-sm text-muted-foreground">Reservations</p>
            </div>
            <div className="rounded-xl border bg-muted/50 p-4 text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-amber-600" />
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Books Read</p>
            </div>
            <div className="rounded-xl border bg-muted/50 p-4 text-center">
              <User className="h-8 w-8 mx-auto mb-2 text-emerald-600" />
              <p className="text-2xl font-bold">Gold</p>
              <p className="text-sm text-muted-foreground">Member Tier</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Section */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>
            Manage your password and account security.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Last changed 30 days ago
              </p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between rounded-lg border p-4 bg-destructive/5">
            <div className="space-y-1">
              <p className="font-medium text-destructive">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and data
              </p>
            </div>
            <Button variant="destructive">Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
