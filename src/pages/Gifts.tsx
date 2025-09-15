import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Gift, ShoppingCart, ExternalLink, Bike, Brain, Palette, Baby, Home, Trees, Shield, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Gifts = () => {
  const [gifts, setGifts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedGuestId, setSelectedGuestId] = useState<string | null>(null);

  // Gift categories
  const giftCategories = [
    { id: 'all', name: 'All Gifts', icon: Gift },
    { id: 'ride-on', name: 'Ride-Ons', icon: Bike },
    { id: 'learning', name: 'Learning', icon: Brain },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'feeding', name: 'Feeding', icon: Baby },
    { id: 'comfort', name: 'Comfort', icon: Home },
    { id: 'outdoor', name: 'Outdoor', icon: Trees },
    { id: 'safety', name: 'Safety', icon: Shield },
    { id: 'sleep', name: 'Sleep', icon: Moon }
  ];

  const getGiftCategory = (giftName: string): string => {
    const name = giftName.toLowerCase();
    if (name.includes('tricycle') || name.includes('bicycle') || name.includes('scooter') || name.includes('ride')) return 'ride-on';
    if (name.includes('puzzle') || name.includes('blocks') || name.includes('activity') || name.includes('montessori') || name.includes('stacking') || name.includes('sorter')) return 'learning';
    if (name.includes('crayon') || name.includes('paint') || name.includes('playdough') || name.includes('book') || name.includes('musical') || name.includes('train')) return 'creative';
    if (name.includes('bath')) return 'creative';
    if (name.includes('plate') || name.includes('bowl') || name.includes('cup') || name.includes('bib')) return 'feeding';
    if (name.includes('shoe') || name.includes('jacket') || name.includes('pajama') || name.includes('pillow') || name.includes('blanket')) return 'comfort';
    if (name.includes('swing') || name.includes('tent') || name.includes('ball')) return 'outdoor';
    if (name.includes('helmet') || name.includes('proof')) return 'safety';
    if (name.includes('night') || name.includes('lullaby') || name.includes('sleep') || name.includes('bedtime')) return 'sleep';
    return 'all';
  };

  useEffect(() => {
    fetchGifts();
    // Check if we have a guest ID from RSVP
    const guestId = localStorage.getItem("guestId");
    if (guestId) setSelectedGuestId(guestId);
  }, []);

  const fetchGifts = async () => {
    try {
      const { data, error } = await supabase
        .from("gifts")
        .select("*")
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
        title: "Please RSVP first",
        description: "You need to RSVP before reserving gifts",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("gifts")
        .update({ 
          is_reserved: true, 
          reserved_by: selectedGuestId,
          reserved_at: new Date().toISOString()
        })
        .eq("id", giftId);

      if (error) throw error;

      toast({
        title: "Gift Reserved!",
        description: "Thank you for reserving this gift!",
      });

      fetchGifts();
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

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent mb-2">
            Gift Registry
          </h1>
          <p className="text-muted-foreground text-lg">
            Help make Jonathan's birthday special by choosing a gift
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading gifts...</div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 mb-8">
              {giftCategories.map((category) => {
                const Icon = category.icon;
                const categoryGifts = category.id === 'all' 
                  ? gifts 
                  : gifts.filter(g => getGiftCategory(g.name) === category.id);
                const availableCount = categoryGifts.filter(g => !g.is_reserved).length;
                
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex flex-col gap-1 h-auto py-2"
                  >
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
              const categoryGifts = category.id === 'all' 
                ? gifts 
                : gifts.filter(g => getGiftCategory(g.name) === category.id);
              
              return (
                <TabsContent key={category.id} value={category.id}>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categoryGifts.map((gift) => (
                      <Card key={gift.id} className={`hover:shadow-xl transition-all ${gift.is_reserved ? 'opacity-75' : ''}`}>
                        {gift.image_url && (
                          <img 
                            src={gift.image_url} 
                            alt={gift.name}
                            className="w-full h-48 object-cover rounded-t-lg"
                          />
                        )}
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="text-base">{gift.name}</span>
                            {gift.is_reserved && (
                              <Badge variant="secondary">Reserved</Badge>
                            )}
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
                                className="flex-1 bg-gradient-to-r from-secondary to-accent"
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

        <div className="mt-12 text-center">
          <Button variant="outline" asChild>
            <Link to="/guestbook">
              <Gift className="mr-2 h-4 w-4" />
              Continue to Guestbook
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Gifts;