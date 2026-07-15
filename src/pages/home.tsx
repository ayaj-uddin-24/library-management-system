import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import {
  BookOpen,
  Users,
  BarChart3,
  Shield,
  BookMarked,
  Search,
  ArrowRight,
  CheckCircle,
  Library,
  Star,
  ChevronRight,
  Zap,
  Globe,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const features = [
  {
    icon: BookOpen,
    title: "Vast Book Collection",
    description:
      "Manage thousands of titles across all genres with a comprehensive digital catalog.",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: Users,
    title: "Member Management",
    description:
      "Efficiently track memberships, borrowing history, and library accounts.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: BookMarked,
    title: "Smart Circulation",
    description:
      "Seamless borrowing, returns, renewals and automated overdue tracking.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Search,
    title: "Intelligent Search",
    description: "Find any book instantly by title, author, ISBN, or genre.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Gain actionable insights into borrowing trends and library performance.",
    gradient: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Role-Based Access",
    description:
      "Separate portals for admins, librarians, and members with fine-grained permissions.",
    gradient: "from-indigo-500 to-blue-500",
  },
];

const roles = [
  {
    role: "Admin",
    color: "bg-primary text-primary-foreground",
    borderColor: "border-primary/30",
    icon: Shield,
    description: "Full system control and oversight",
    capabilities: [
      "Manage all users and assign roles",
      "Access complete analytics and reports",
      "Configure library rules and settings",
      "Oversee all books, loans, and reservations",
    ],
    stats: ["Unlimited access", "System config", "User management"],
  },
  {
    role: "Librarian",
    color: "bg-blue-600 text-white",
    borderColor: "border-blue-300",
    icon: Library,
    description: "Day-to-day library operations",
    capabilities: [
      "Manage book catalog and inventory",
      "Issue and process book returns",
      "Handle reservations and holds",
      "View member profiles and activity",
    ],
    stats: ["Catalog access", "Circulation tools", "Member lookup"],
  },
  {
    role: "Member",
    color: "bg-emerald-600 text-white",
    borderColor: "border-emerald-300",
    icon: BookOpen,
    description: "Browse, borrow, and manage reading",
    capabilities: [
      "Browse the full library catalog",
      "View your current loans and due dates",
      "Make and track book reservations",
      "Manage your personal reading history",
    ],
    stats: ["Personal dashboard", "Reading history", "Reservations"],
  },
];

const stats = [
  { value: "25+", label: "Books Available", icon: BookOpen },
  { value: "3", label: "User Roles", icon: Shield },
  { value: "12+", label: "Active Members", icon: Users },
  { value: "100%", label: "Digital Access", icon: Globe },
];

const testimonials = [
  {
    quote:
      "LibraryPro transformed how we manage our collection. The analytics alone saved us hours every week.",
    author: "Sarah Chen",
    role: "Head Librarian, Metro Central",
    avatar: "SC",
  },
  {
    quote:
      "Finally, a system that works for everyone - admins, staff, and patrons love it.",
    author: "Marcus Rodriguez",
    role: "Library Director",
    avatar: "MR",
  },
  {
    quote:
      "The role-based access means our members can self-serve, freeing up our staff for bigger tasks.",
    author: "Emily Watson",
    role: "Operations Manager",
    avatar: "EW",
  },
];

export function Home() {
  const { profile, role } = useAuth();

  function getDashboardPath() {
    if (!role) return "/sign-in";
    if (role === "admin") return "/admin";
    if (role === "librarian") return "/librarian";
    return "/member";
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BookOpen className="h-4 w-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">LibraryPro</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#features"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a
              href="#roles"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Roles
            </a>
            <a
              href="#testimonials"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Testimonials
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <ModeToggle />
            {profile ? (
              <Button asChild>
                <Link to={getDashboardPath()}>
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/sign-up">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-blue-500/5" />
        <div className="container mx-auto px-6 py-24 md:py-36">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 gap-1.5" variant="secondary">
                <Sparkles className="h-3 w-3 fill-current" />
                Modern Library Management
              </Badge>
              <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight text-balance md:text-7xl">
                Your Library,
                <br />
                <span className="gradient-text">Perfectly Managed</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground leading-relaxed lg:mx-0">
                LibraryPro brings together books, members, and librarians in one
                elegant platform. Streamline borrowings, track inventory, and
                empower every role with the right tools.
              </p>
              <div className="mt-10 flex flex-wrap justify-center gap-4 lg:justify-start">
                {profile ? (
                  <Button size="lg" asChild className="animate-pulse-glow">
                    <Link to={getDashboardPath()}>
                      Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button size="lg" asChild className="animate-pulse-glow">
                      <Link to="/sign-up">
                        Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link to="/sign-in">Sign In</Link>
                    </Button>
                  </>
                )}
              </div>

              {/* Quick Stats */}
              <div className="mt-12 flex flex-wrap justify-center gap-8 lg:justify-start">
                {[
                  { icon: Zap, label: "Real-time updates" },
                  { icon: Shield, label: "Secure & private" },
                  { icon: Globe, label: "Works everywhere" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2">
                    <item.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="absolute inset-0 bg-linear-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-3xl" />
              <div className="relative bg-card border rounded-3xl p-8 shadow-xl">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div
                      key={stat.label}
                      className={`rounded-xl border bg-background p-6 ${i === 0 ? "animate-float" : ""}`}
                    >
                      <stat.icon className="h-8 w-8 text-primary mb-4" />
                      <p className="text-3xl font-bold tracking-tight">
                        {stat.value}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border bg-muted/50 p-4">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="text-sm font-medium">Borrowings up 23%</p>
                      <p className="text-xs text-muted-foreground">
                        Compared to last month
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Features
          </Badge>
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Everything a modern library needs
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            A complete suite of tools designed to make library management
            effortless for everyone.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div
                  className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-br ${feature.gradient} text-white group-hover:scale-110 transition-transform`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Roles */}
      <section id="roles" className="border-y bg-muted/30">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Access Levels
            </Badge>
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
              The right tools for every role
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              Three distinct portals — each designed with focused capabilities
              for their users.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map((item) => (
              <Card
                key={item.role}
                className={`relative overflow-hidden border-2 ${item.borderColor} hover:shadow-lg transition-all`}
              >
                <CardHeader>
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{item.role}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {item.role}
                    </Badge>
                  </div>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {item.capabilities.map((cap) => (
                      <li key={cap} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                        <span className="text-muted-foreground">{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {item.stats.map((stat) => (
                      <Badge key={stat} variant="secondary" className="text-xs">
                        {stat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Loved by library teams
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            See what library professionals say about LibraryPro.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.author} className="bg-card">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    {item.avatar}
                  </div>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{item.quote}"</p>
                <div className="mt-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-24">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl bg-linear-to-br from-primary to-blue-600 p-12 text-center text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />
          <div className="relative z-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20 backdrop-blur mx-auto mb-6">
              <Library className="h-8 w-8" />
            </div>
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-balance">
              Ready to modernize your library?
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80">
              Join LibraryPro today and experience seamless library management.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {profile ? (
                <Button size="lg" variant="secondary" asChild>
                  <Link to={getDashboardPath()}>
                    Open Dashboard <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/sign-up">
                      Create Account <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                    asChild
                  >
                    <Link to="/sign-in">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="container mx-auto px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <BookOpen className="h-3 w-3" />
                </div>
                <span className="text-sm font-semibold">LibraryPro</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Modern library management for the digital age.
              </p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Integrations"],
              },
              {
                title: "Resources",
                links: ["Documentation", "Guides", "Blog", "Support"],
              },
              {
                title: "Company",
                links: ["About", "Careers", "Contact", "Partners"],
              },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-3">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
            <p className="text-sm text-muted-foreground">
              &copy; 2026 LibraryPro. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/sign-in"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/sign-up"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
