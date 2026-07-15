import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Bell,
  BookMarked,
  AlertCircle,
  CheckCircle,
  Clock,
  Info,
  Check,
  X,
  Settings,
  Filter,
} from "lucide-react";
import { format, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

type NotificationType = "info" | "warning" | "success" | "alert";
type NotificationCategory = "borrowing" | "reservation" | "system" | "general";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  category: NotificationCategory;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    title: "Book Due Soon",
    message:
      "Your borrowed book 'The Great Gatsby' is due in 3 days. Please return or renew it.",
    type: "warning",
    category: "borrowing",
    read: false,
    createdAt: "2026-01-15T10:30:00Z",
    actionUrl: "/borrowings",
  },
  {
    id: "2",
    title: "Reservation Ready",
    message:
      "Your reserved book '1984' is now available for pickup at the main desk.",
    type: "success",
    category: "reservation",
    read: false,
    createdAt: "2026-01-15T09:15:00Z",
    actionUrl: "/reservations",
  },
  {
    id: "3",
    title: "Overdue Notice",
    message:
      "You have an overdue book 'To Kill a Mockingbird'. Please return it to avoid late fees.",
    type: "alert",
    category: "borrowing",
    read: false,
    createdAt: "2026-01-14T14:00:00Z",
    actionUrl: "/borrowings",
  },
  {
    id: "4",
    title: "System Maintenance",
    message:
      "The library system will undergo maintenance on Sunday from 2 AM to 6 AM.",
    type: "info",
    category: "system",
    read: true,
    createdAt: "2026-01-13T08:00:00Z",
  },
  {
    id: "5",
    title: "New Book Added",
    message:
      "A new book 'The Midnight Library' has been added to our collection based on your reading preferences.",
    type: "info",
    category: "general",
    read: true,
    createdAt: "2026-01-12T16:45:00Z",
    actionUrl: "/catalog",
  },
];

const typeStyles = {
  info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
  warning: { icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  success: {
    icon: CheckCircle,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  alert: {
    icon: AlertCircle,
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
};

const categoryIcons = {
  borrowing: BookMarked,
  reservation: Clock,
  system: Settings,
  general: Bell,
};

export function Notifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter((n) => !n.read).length;
  const filteredNotifications =
    filter === "all" ? notifications : notifications.filter((n) => !n.read);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="default" className="rounded-full px-2">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            Stay updated with your library activities.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilter(filter === "all" ? "unread" : "all")}
          >
            <Filter className="mr-2 h-4 w-4" />
            {filter === "all" ? "Show Unread Only" : "Show All"}
          </Button>
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Notifications List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Activity Feed
              </CardTitle>
              <CardDescription>
                {filteredNotifications.length} notification
                {filteredNotifications.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-125 pr-4">
                {filteredNotifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground/50 mb-4" />
                    <p className="text-muted-foreground">No notifications</p>
                    <p className="text-sm text-muted-foreground/70 mt-1">
                      You're all caught up!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredNotifications.map((notification) => {
                      const style = typeStyles[notification.type];
                      const CategoryIcon = categoryIcons[notification.category];

                      return (
                        <div
                          key={notification.id}
                          className={cn(
                            "group relative rounded-lg border p-4 transition-colors hover:bg-muted/50",
                            !notification.read &&
                              "bg-muted/30 border-l-4 border-l-primary",
                          )}
                        >
                          <div className="flex gap-4">
                            <div
                              className={cn(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                                style.bg,
                              )}
                            >
                              <style.icon
                                className={cn("h-5 w-5", style.color)}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2">
                                  <p
                                    className={cn(
                                      "font-medium",
                                      !notification.read && "text-foreground",
                                    )}
                                  >
                                    {notification.title}
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    <CategoryIcon className="mr-1 h-3 w-3" />
                                    {notification.category}
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {!notification.read && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-7 w-7"
                                      onClick={() =>
                                        markAsRead(notification.id)
                                      }
                                    >
                                      <Check className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                                    onClick={() =>
                                      deleteNotification(notification.id)
                                    }
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                              <div className="mt-2 flex items-center justify-between">
                                <p className="text-xs text-muted-foreground">
                                  {format(
                                    parseISO(notification.createdAt),
                                    "MMM d, yyyy 'at' h:mm a",
                                  )}
                                </p>
                                {notification.actionUrl && (
                                  <Button
                                    variant="link"
                                    size="sm"
                                    className="h-auto p-0"
                                    asChild
                                  >
                                    <a href={notification.actionUrl}>
                                      View Details
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Notification Settings */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>
                Manage how you receive notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Due Date Reminders",
                  description: "Get notified before books are due",
                  enabled: true,
                },
                {
                  title: "Reservation Updates",
                  description: "Alerts about reservation status changes",
                  enabled: true,
                },
                {
                  title: "New Book Alerts",
                  description: "Notify when new books match your interests",
                  enabled: false,
                },
                {
                  title: "System Announcements",
                  description: "Important updates about library system",
                  enabled: true,
                },
                {
                  title: "Email Notifications",
                  description: "Receive notifications via email",
                  enabled: false,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    variant={item.enabled ? "default" : "outline"}
                    size="sm"
                    className="h-7 px-3"
                  >
                    {item.enabled ? "On" : "Off"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold">{notifications.length}</p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold text-primary">{unreadCount}</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold text-amber-500">
                  {notifications.filter((n) => n.type === "warning").length}
                </p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
              <div className="rounded-lg border bg-muted/50 p-4 text-center">
                <p className="text-2xl font-bold text-destructive">
                  {notifications.filter((n) => n.type === "alert").length}
                </p>
                <p className="text-sm text-muted-foreground">Alerts</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
