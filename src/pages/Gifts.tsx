import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Gift, Shirt, Laptop, Brain, DollarSign, ExternalLink, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WorkflowSteps } from "@/components/WorkflowSteps";

const Gifts = () => {
  const navigate = useNavigate();
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);

  // Gift categories
  const giftCategories = [
    { id: "all", name: "All Gifts", icon: Gift },
    { id: "money", name: "Money Gifts", icon: DollarSign },
    { id: "fashion", name: "Fashion & Style", icon: Shirt },
    { id: "tech", name: "Tech & Gadgets", icon: Laptop },
    { id: "experience", name: "Experiences & Development", icon: Brain },
  ];

  const getGiftCategory = (giftName: string): string => {
    const name = giftName.toLowerCase();
    if (name.includes("money")) return "money";
    if (name.includes("sneaker") || name.includes("wear") || name.includes("hoodie") || name.includes("bag") || name.includes("cologne"))
      return "fashion";
    if (name.includes("laptop") || name.includes("tablet") || name.includes("phone")) return "tech";
    if (name.includes("getaway") || name.includes("course") || name.includes("seat")) return "experience";
    return "all";
  };

  useEffect(() => {
    fetchGifts();
    const guestId = localStorage.getItem("guestId");
    if (guestId) setSelectedGuestId(guestId);
  }, []);

  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from("gifts")
        .select("*, guests:reserved_by(name)")
        .order("price_estimate", { ascending: true });

      if (error) throw error;
      setGifts(data || []);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReserve = async (giftId: string) => {
    if (!selectedGuestId) {
      toast({
        title: "RSVP Required",
        description: "Please RSVP first to reserve a gift.",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/rsvp";
      }, 2000);
      return;
    }

    try {
      const { error } = await supabase
        .from("gifts")
        .update({
          is_reserved: true,
          reserved_by: selectedGuestId,
          reserved_at: new Date().toISOString(),
        })
        .eq("id", giftId);

      if (error) throw error;

      toast({
        title: "Gift Reserved!",
        description: "Thank you for reserving this gift.",
      });

      fetchGifts();
      setTimeout(() => navigate("/guestbook"), 2000);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to reserve gift",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/10 px-4 py-12">
      <div className="container mx-auto max-w-6xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <WorkflowSteps currentStep="gifts" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[hsl(var(--heading))] mb-2">
            Bill’s Wish List
          </h1>
          <p className="text-lg text-[hsl(var(--heading))]">
            Your presence is a present — but if you’d like to give something, here are a few thoughtful ideas.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading gifts...</div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-8">
              {giftCategories.map((category) => {
                const Icon = category.icon;
                const categoryGifts =
                  category.id === "all"
                    ? gifts
                    : gifts.filter((g) => getGiftCategory(g.name) === category.id);
                const availableCount = categoryGifts.filter((g) => !g.is_reserved).length;

                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex flex-col gap-1 h-auto py-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{category.name}</span>
                    <Badge variant="secondary" className="text-xs px-1 py-0">
                      {availableCount}
                    </Badge>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {giftCategories.map((category) => {
              const categoryGifts =
                category.id === "all"
                  ? gifts
                  : gifts.filter((g) => getGiftCategory(g.name) === category.id);

              return (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryGifts.map((gift) => (
                      <Card key={gift.id} className={`hover:shadow-xl transition-all ${gift.is_reserved ? "opacity-75" : ""}`}>
                        {gift.image_url && (
                          <img src={gift.image_url} alt={gift.name} className="w-full h-48 object-cover rounded-t-lg" />
                        )}
                        <CardHeader className="card-header">
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-base">{gift.name}</span>
                            {gift.is_reserved && <Badge variant="secondary">Reserved</Badge>}
                          </CardTitle>
                          {gift.price_estimate && (
                            <CardDescription className="text-lg font-semibold text-primary">
                              ${gift.price_estimate}
                            </CardDescription>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-sm text-muted-foreground">{gift.description}</p>

                          <div className="flex gap-2">
                            {!gift.is_reserved && (
                              <Button
                                onClick={() => handleReserve(gift.id)}
                                className="flex-1 bg-[hsl(var(--primary))] hover:opacity-90 text-white"
                                size="sm"
                              >
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Reserve
                              </Button>
                            )}
                            {gift.link && (
                              <Button variant="outline" size="icon" asChild>
                                <a href={gift.link} target="_blank" rel="noopener noreferrer" title="View in store">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        )}

        <div className="mt-12 text-center space-y-4">
          <p className="text-muted-foreground">
            Reserve a gift above or proceed to leave a birthday message
          </p>
          <Button size="lg" asChild>
            <Link to="/guestbook">Continue to Guestbook →</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gifts;
