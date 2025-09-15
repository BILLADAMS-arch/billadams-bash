import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Heart, Send, MessageSquare } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Guestbook = () => {
  const [wishes, setWishes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingWishes, setFetchingWishes] = useState(true);
  const [formData, setFormData] = useState({
    message: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const { data, error } = await supabase
        .from("wishes")
        .select(`
          *,
          guests (name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setWishes(data || []);
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setFetchingWishes(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const guestId = localStorage.getItem("guestId");

      if (!guestId) {
        toast({
          title: "RSVP Required",
          description: "Please RSVP first before leaving a message.",
          variant: "destructive",
        });
        navigate("/rsvp"); // 👈 redirect them to RSVP page
        return;
      }

      // Create wish linked to RSVP guest
      const { error: wishError } = await supabase
        .from("wishes")
        .insert([{
          guest_id: guestId,
          message: formData.message,
        }]);

      if (wishError) throw wishError;

      toast({
        title: "Message Posted!",
        description: "Thank you for your birthday wishes!",
      });

      setFormData({ message: "" });
      fetchWishes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to post message",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10 px-4 py-12">
      <div className="container mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent mb-2">
            Birthday Guestbook
          </h1>
          <p className="text-muted-foreground text-lg">
            Leave your wishes and messages for Jonathan
          </p>
        </div>

        {/* Post a Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-8 shadow-xl border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-accent" />
                Leave a Message
              </CardTitle>
              <CardDescription>
                Share your birthday wishes and memories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Happy birthday Jonathan! Wishing you..."
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-accent to-primary hover:shadow-lg transition-all"
                >
                  {loading ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Messages Display */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-accent" />
            Birthday Wishes
          </h2>
          
          {fetchingWishes ? (
            <div className="text-center py-8 text-muted-foreground">Loading messages...</div>
          ) : wishes.length === 0 ? (
            <Card className="p-8 text-center text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Be the first to leave a birthday message!</p>
            </Card>
          ) : (
            <div className="grid gap-4">
              {wishes.map((wish, index) => (
                <motion.div
                  key={wish.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all">
                    <CardContent className="pt-6">
                      <p className="text-lg mb-3">{wish.message}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span className="font-medium text-primary">
                          — {wish.guests?.name || "Anonymous"}
                        </span>
                        <span>
                          {new Date(wish.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Guestbook;
