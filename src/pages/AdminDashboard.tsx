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
        .select("*, guests (name)")
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
    a.download = "guest-list.csv";
    a.click();

    toast({ title: "Guest list exported", description: "The CSV file has been downloaded" });
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
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats + Tabs remain unchanged (your existing code here) */}
        {/* ... keep the Stats Cards */}
        {/* ... keep the Guests, Gifts, Wishes tabs */}
      </div>
    </div>
  );
};

export default AdminDashboard;
