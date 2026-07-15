import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Building2,
  BookMarked,
  Bell,
  Palette,
  Save,
  Keyboard,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Badge } from "@/components/ui/badge";

export function Settings() {
  const [libraryName, setLibraryName] = useState("Central City Library");
  const [libraryAddress, setLibraryAddress] = useState(
    "123 Main Street, Downtown",
  );
  const [libraryPhone, setLibraryPhone] = useState("(555) 123-4567");
  const [libraryEmail, setLibraryEmail] = useState("contact@citylibrary.org");
  const [defaultLoanPeriod, setDefaultLoanPeriod] = useState(14);
  const [maxRenewals, setMaxRenewals] = useState(2);
  const [maxBooksPerMember, setMaxBooksPerMember] = useState(5);
  const [lateFee, setLateFee] = useState(0.25);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [dueReminderDays, setDueReminderDays] = useState(3);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your library management system
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Library Information</CardTitle>
          </div>
          <CardDescription>Basic details about your library</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="libraryName">Library Name</Label>
              <Input
                id="libraryName"
                value={libraryName}
                onChange={(e) => setLibraryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="libraryPhone">Phone Number</Label>
              <Input
                id="libraryPhone"
                value={libraryPhone}
                onChange={(e) => setLibraryPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="libraryEmail">Email Address</Label>
            <Input
              id="libraryEmail"
              type="email"
              value={libraryEmail}
              onChange={(e) => setLibraryEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="libraryAddress">Address</Label>
            <Textarea
              id="libraryAddress"
              value={libraryAddress}
              onChange={(e) => setLibraryAddress(e.target.value)}
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookMarked className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Borrowing Rules</CardTitle>
          </div>
          <CardDescription>Configure loan policies and limits</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="loanPeriod">Default Loan Period</Label>
                <p className="text-sm text-muted-foreground">
                  Days a book can be borrowed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Slider
                  id="loanPeriod"
                  value={[defaultLoanPeriod]}
                  onValueChange={(v) => setDefaultLoanPeriod(v[0])}
                  min={1}
                  max={60}
                  step={1}
                  className="w-24"
                />
                <Badge variant="outline" className="w-12 text-center">
                  {defaultLoanPeriod} days
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maxRenewals">Maximum Renewals</Label>
              <p className="text-sm text-muted-foreground">
                Times a book can be renewed
              </p>
            </div>
            <Select
              value={maxRenewals.toString()}
              onValueChange={(v) => setMaxRenewals(parseInt(v))}
            >
              <SelectTrigger className="w-25">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="maxBooks">Max Books Per Member</Label>
              <p className="text-sm text-muted-foreground">
                Simultaneous borrows allowed
              </p>
            </div>
            <Select
              value={maxBooksPerMember.toString()}
              onValueChange={(v) => setMaxBooksPerMember(parseInt(v))}
            >
              <SelectTrigger className="w-25">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="7">7</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="15">15</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="lateFee">Daily Late Fee</Label>
              <p className="text-sm text-muted-foreground">
                Per book, per day overdue
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">$</span>
              <Input
                id="lateFee"
                type="number"
                value={lateFee}
                onChange={(e) => setLateFee(parseFloat(e.target.value))}
                step={0.05}
                min={0}
                className="w-24"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Notifications</CardTitle>
          </div>
          <CardDescription>Configure how patrons are notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="emailNotifications">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send due date reminders via email
              </p>
            </div>
            <Switch
              id="emailNotifications"
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="smsNotifications">SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Send overdue alerts via SMS
              </p>
            </div>
            <Switch
              id="smsNotifications"
              checked={smsNotifications}
              onCheckedChange={setSmsNotifications}
            />
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="reminderDays">Days Before Due Notice</Label>
              <p className="text-sm text-muted-foreground">
                Send reminder X days before due date
              </p>
            </div>
            <Select
              value={dueReminderDays.toString()}
              onValueChange={(v) => setDueReminderDays(parseInt(v))}
            >
              <SelectTrigger className="w-25">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="7">7</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Appearance</CardTitle>
          </div>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Choose between light and dark mode
              </p>
            </div>
            <ModeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Keyboard Shortcuts</CardTitle>
          </div>
          <CardDescription>Quick actions for power users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { keys: ["Ctrl", "K"], action: "Global search" },
              { keys: ["Ctrl", "B"], action: "Toggle sidebar" },
              { keys: ["Ctrl", "N"], action: "Add new book" },
              { keys: ["Ctrl", "M"], action: "Add new member" },
              { keys: ["Ctrl", "I"], action: "Issue book" },
              { keys: ["Ctrl", "R"], action: "Return book" },
              { keys: ["?"], action: "Show shortcuts" },
              { keys: ["Esc"], action: "Close dialog" },
            ].map((shortcut) => (
              <div
                key={shortcut.action}
                className="flex items-center justify-between"
              >
                <span className="text-sm text-muted-foreground">
                  {shortcut.action}
                </span>
                <div className="flex gap-1">
                  {shortcut.keys.map((key, i) => (
                    <kbd
                      key={i}
                      className="rounded border bg-muted px-2 py-0.5 text-xs font-mono"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
