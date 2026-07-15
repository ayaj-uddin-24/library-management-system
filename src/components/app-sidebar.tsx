import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BookMarked,
  CalendarClock,
  Library,
  BarChart3,
  Settings,
  Home,
  Bell,
  User,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/lib/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  const location = useLocation();
  const { profile, role } = useAuth();

  // Determine base path from current location
  const basePath = location.pathname.startsWith("/admin")
    ? "/admin"
    : location.pathname.startsWith("/librarian")
      ? "/librarian"
      : location.pathname.startsWith("/member")
        ? "/member"
        : "/dashboard";

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const libraryNav = [
    { title: "Dashboard", url: basePath, icon: LayoutDashboard, exact: true },
    { title: "Catalog", url: `${basePath}/catalog`, icon: Library },
  ];

  const circulationNav = [
    { title: "Borrowings", url: `${basePath}/borrowings`, icon: BookMarked },
    {
      title: "Reservations",
      url: `${basePath}/reservations`,
      icon: CalendarClock,
    },
  ];

  const managementNav =
    role === "admin" || role === "librarian"
      ? [
          { title: "Books", url: `${basePath}/books`, icon: BookOpen },
          { title: "Members", url: `${basePath}/members`, icon: Users },
        ]
      : [];

  const analyticsNav =
    role === "admin"
      ? [
          { title: "Reports", url: `${basePath}/reports`, icon: BarChart3 },
          { title: "Settings", url: `${basePath}/settings`, icon: Settings },
        ]
      : [];

  const roleColors: Record<string, string> = {
    admin: "bg-primary text-primary-foreground",
    librarian: "bg-blue-600 text-white",
    member: "bg-emerald-600 text-white",
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpen className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-sidebar-foreground">
              LibraryPro
            </span>
            <span className="text-xs text-muted-foreground">
              Management System
            </span>
          </div>
        </Link>
      </SidebarHeader>

      {/* User info */}
      <div className="px-3 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="text-xs">
              {profile?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium truncate">
              {profile?.full_name || "User"}
            </span>
            <Badge
              className={`text-[10px] px-1.5 py-0 w-fit mt-0.5 ${roleColors[role || "member"]}`}
            >
              {role ? role.charAt(0).toUpperCase() + role.slice(1) : "Member"}
            </Badge>
          </div>
        </div>
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {libraryNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={
                      item.exact
                        ? location.pathname === item.url
                        : isActive(item.url)
                    }
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Circulation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {circulationNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {managementNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {managementNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {analyticsNav.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel>Analytics</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analyticsNav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.url)}
                      tooltip={item.title}
                    >
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(`${basePath}/profile`)}
                  tooltip="Profile"
                >
                  <Link to={`${basePath}/profile`}>
                    <User />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(`${basePath}/notifications`)}
                  tooltip="Notifications"
                >
                  <Link to={`${basePath}/notifications`}>
                    <Bell />
                    <span>Notifications</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center justify-between">
          <ModeToggle />
          <SidebarMenuButton asChild tooltip="Home" className="h-8 w-8 p-0">
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
