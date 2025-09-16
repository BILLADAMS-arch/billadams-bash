import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Users, Gift, MessageSquare, Download, CheckCircle, XCircle, Clock, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [guests, setGuests] = useState<any[]>([]);
  const [gifts, setGifts] = useState<any[]>([]);
  const [wishes, setWishes] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalGuests: 0,
    attending: 0,
    notAttending: 0,
    maybe: 0,
    totalAdults: 0,
    totalChildren: 0,
    reservedGifts: 0,
    totalGifts: 0,
    totalWishes: 0,
  });
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const navigate = useNavigate();

  // --- Check authentication ---
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email === "nyamweno.billadams@gmail.com") {
        setAllowed(true);
      } else {
        navigate("/login");
      }
      setAuthLoading(false);
    }
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (allowed) fetchData();
  }, [allowed]);

  const fetchData = async () => {
    try {
      // Guests
      const { data: guestsData, error: guestsError } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });
      if (guestsError) throw guestsError;

      // Gifts
      const { data: giftsData, error: giftsError } = await supabase
        .from("gifts")
        .select(`
          *,
          guests:reserved_by (name)
        `)
        .order("price_estimate", { ascending: true });
      if (giftsError) throw giftsError;

      // Wishes
      const { data: wishesData, error: wishesError } = await supabase
        .from("wishes")
        .select("*, guests (name)")
        .order("created_at", { ascending: false });
      if (wishesError) throw wishesError;

      setGuests(guestsData || []);
      setGifts(giftsData || []);
      setWishes(wishesData || []);

      // Stats
      const guestStats = (guestsData || []).reduce(
        (acc, guest) => {
          acc.totalGuests++;
          if (guest.rsvp_status === "attending") acc.attending++;
          if (guest.rsvp_status === "not_attending") acc.notAttending++;
          if (guest.rsvp_status === "maybe") acc.maybe++;
          acc.totalAdults += guest.adults_count || 0;
          acc.totalChildren += guest.children_count || 0;
          return acc;
        },
        { totalGuests: 0, attending: 0, notAttending: 0, maybe: 0, totalAdults: 0, totalChildren: 0 }
      );

      const giftStats = (giftsData || []).reduce(
        (acc, gift) => {
          acc.totalGifts++;
          if (gift.is_reserved) acc.reservedGifts++;
          return acc;
        },
        { totalGifts: 0, reservedGifts: 0 }
      );

      setStats({
        ...guestStats,
        ...giftStats,
        totalWishes: wishesData?.length || 0,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const exportGuestList = () => {
    const csv = [
      ["Name", "Contact", "RSVP Status", "Adults", "Children", "Date"],
      ...guests.map(g => [
        g.name,
        g.contact,
        g.rsvp_status,
        g.adults_count,
        g.children_count,
        new Date(g.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guest-list-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({ title: "Guest list exported", description: "The CSV file has been downloaded" });
  };

  const exportGifts = () => {
    const csv = [
      ["Gift Name", "Price", "Status", "Reserved By", "Reserved Date"],
      ...gifts.map(g => [
        g.name,
        g.price_estimate || "N/A",
        g.is_reserved ? "Reserved" : "Available",
        g.guests?.name || "",
        g.reserved_at ? new Date(g.reserved_at).toLocaleDateString() : ""
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gift-registry-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({ title: "Gift registry exported", description: "The CSV file has been downloaded" });
  };

  const exportMessages = () => {
    const csv = [
      ["From", "Message", "Date"],
      ...wishes.map(w => [
        w.guests?.name || "Anonymous",
        `"${w.message.replace(/"/g, '""')}"`, // Escape quotes in messages
        new Date(w.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `birthday-messages-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();

    toast({ title: "Messages exported", description: "The CSV file has been downloaded" });
  };

  const getRSVPBadge = (status: string) => {
    switch (status) {
      case "attending":
        return <Badge className="bg-green-500/10 text-green-600 border-green-200"><CheckCircle className="w-3 h-3 mr-1" />Attending</Badge>;
      case "not_attending":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Not Attending</Badge>;
      case "maybe":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Maybe</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logged out", description: "You have been signed out." });
    navigate("/login");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking access...</p>
      </div>
    );
  }

  if (!allowed) return null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 px-4 py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground">Manage birthday party details</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" onClick={exportGuestList}>
              <Download className="mr-2 h-4 w-4" />
              Export Guests
            </Button>
            <Button variant="outline" onClick={exportGifts}>
              <Download className="mr-2 h-4 w-4" />
              Export Gifts
            </Button>
            <Button variant="outline" onClick={exportMessages}>
              <Download className="mr-2 h-4 w-4" />
              Export Messages
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGuests}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.totalAdults} adults, {stats.totalChildren} children
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">RSVP Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">Attending:</span>
                  <span className="font-semibold">{stats.attending}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-amber-600">Not Attendng:</span>
                  <span className="font-semibold">{stats.maybe}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Gifts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.reservedGifts}/{stats.totalGifts}</div>
              <p className="text-xs text-muted-foreground mt-1">Reserved</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWishes}</div>
              <p className="text-xs text-muted-foreground mt-1">Birthday wishes</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="guests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guests">
              <Users className="mr-2 h-4 w-4" />
              Guests
            </TabsTrigger>
            <TabsTrigger value="gifts">
              <Gift className="mr-2 h-4 w-4" />
              Gifts
            </TabsTrigger>
            <TabsTrigger value="wishes">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messages
            </TabsTrigger>
          </TabsList>

          {/* Guests Tab */}
          <TabsContent value="guests">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Guest List</CardTitle>
                  <CardDescription>All RSVPs received</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportGuestList}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Adults</TableHead>
                      <TableHead>Children</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guests.map((guest) => (
                      <TableRow key={guest.id}>
                        <TableCell className="font-medium">{guest.name}</TableCell>
                        <TableCell>{guest.contact}</TableCell>
                        <TableCell>{getRSVPBadge(guest.rsvp_status)}</TableCell>
                        <TableCell>{guest.adults_count || 0}</TableCell>
                        <TableCell>{guest.children_count || 0}</TableCell>
                        <TableCell>{new Date(guest.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gifts Tab */}
          <TabsContent value="gifts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Gift Registry</CardTitle>
                  <CardDescription>Gift reservation status</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportGifts}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gift</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reserved By</TableHead>
                      <TableHead>Reserved Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-medium">{gift.name}</TableCell>
                        <TableCell>Kshs{gift.price_estimate?.toLocaleString()}</TableCell>
                        <TableCell>
                          {gift.is_reserved ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-200">Reserved</Badge>
                          ) : (
                            <Badge variant="secondary">Available</Badge>
                          )}
                        </TableCell>
                        <TableCell>{gift.guests?.name || "-"}</TableCell>
                        <TableCell>
                          {gift.reserved_at ? new Date(gift.reserved_at).toLocaleDateString() : "-"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wishes Tab */}
          <TabsContent value="wishes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Birthday Messages</CardTitle>
                  <CardDescription>Guestbook entries</CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={exportMessages}>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>From</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wishes.map((wish) => (
                      <TableRow key={wish.id}>
                        <TableCell className="font-medium">{wish.guests?.name || "Anonymous"}</TableCell>
                        <TableCell className="max-w-md">{wish.message}</TableCell>
                        <TableCell>{new Date(wish.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
