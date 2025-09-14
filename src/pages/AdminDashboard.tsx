import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Users, Gift, MessageSquare, Download, Shield, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch guests
      const { data: guestsData, error: guestsError } = await supabase
        .from("guests")
        .select("*")
        .order("created_at", { ascending: false });

      if (guestsError) throw guestsError;

      // Fetch gifts with guest info
      const { data: giftsData, error: giftsError } = await supabase
        .from("gifts")
        .select(`
          *,
          guests (name)
        `)
        .order("price_estimate", { ascending: true });

      if (giftsError) throw giftsError;

      // Fetch wishes with guest info
      const { data: wishesData, error: wishesError } = await supabase
        .from("wishes")
        .select(`
          *,
          guests (name)
        `)
        .order("created_at", { ascending: false });

      if (wishesError) throw wishesError;

      setGuests(guestsData || []);
      setGifts(giftsData || []);
      setWishes(wishesData || []);

      // Calculate stats
      const guestStats = (guestsData || []).reduce((acc, guest) => {
        acc.totalGuests++;
        if (guest.rsvp_status === "attending") acc.attending++;
        if (guest.rsvp_status === "not_attending") acc.notAttending++;
        if (guest.rsvp_status === "maybe") acc.maybe++;
        acc.totalAdults += guest.adults_count || 0;
        acc.totalChildren += guest.children_count || 0;
        return acc;
      }, {
        totalGuests: 0,
        attending: 0,
        notAttending: 0,
        maybe: 0,
        totalAdults: 0,
        totalChildren: 0,
      });

      const giftStats = (giftsData || []).reduce((acc, gift) => {
        acc.totalGifts++;
        if (gift.is_reserved) acc.reservedGifts++;
        return acc;
      }, { totalGifts: 0, reservedGifts: 0 });

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
    a.download = "guest-list.csv";
    a.click();
    
    toast({
      title: "Guest list exported",
      description: "The CSV file has been downloaded",
    });
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
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportGuestList}>
              <Download className="mr-2 h-4 w-4" />
              Export Guest List
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Site
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Total Guests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalGuests}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.totalAdults} adults, {stats.totalChildren} children
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                Attending
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{stats.attending}</div>
              <div className="text-sm text-muted-foreground mt-1">
                {stats.maybe} maybe
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="w-5 h-5 text-secondary" />
                Gifts Reserved
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">
                {stats.reservedGifts}/{stats.totalGifts}
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                {Math.round((stats.reservedGifts / stats.totalGifts) * 100)}% reserved
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Wishes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">{stats.totalWishes}</div>
              <div className="text-sm text-muted-foreground mt-1">
                birthday messages
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="guests" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="guests">Guests</TabsTrigger>
            <TabsTrigger value="gifts">Gifts</TabsTrigger>
            <TabsTrigger value="wishes">Wishes</TabsTrigger>
          </TabsList>

          <TabsContent value="guests">
            <Card>
              <CardHeader>
                <CardTitle>Guest List</CardTitle>
                <CardDescription>All registered guests and their RSVP status</CardDescription>
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
                        <TableCell>{guest.adults_count}</TableCell>
                        <TableCell>{guest.children_count}</TableCell>
                        <TableCell>{new Date(guest.created_at).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gifts">
            <Card>
              <CardHeader>
                <CardTitle>Gift Registry</CardTitle>
                <CardDescription>All gifts and their reservation status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Gift</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reserved By</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-medium">{gift.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{gift.description}</TableCell>
                        <TableCell>${gift.price_estimate}</TableCell>
                        <TableCell>
                          {gift.is_reserved ? (
                            <Badge className="bg-green-500/10 text-green-600 border-green-200">Reserved</Badge>
                          ) : (
                            <Badge variant="outline">Available</Badge>
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

          <TabsContent value="wishes">
            <Card>
              <CardHeader>
                <CardTitle>Birthday Wishes</CardTitle>
                <CardDescription>All messages from the guestbook</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {wishes.map((wish) => (
                    <div key={wish.id} className="border rounded-lg p-4">
                      <p className="mb-2">{wish.message}</p>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span className="font-medium">— {wish.guests?.name || "Anonymous"}</span>
                        <span>{new Date(wish.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;