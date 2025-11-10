import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MessageSquare, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WorkflowSteps } from "@/components/WorkflowSteps";

const Guestbook = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ message: "" });
  const navigate = useNavigate();

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
        navigate("/rsvp");
        return;
      }

      const { error: wishError } = await supabase
        .from("wishes")
        .insert([{ guest_id: guestId, message: formData.message }]);

      if (wishError) throw wishError;

      toast({
        title: "Message Posted!",
        description: "Thank you for your birthday wishes!",
      });

      setFormData({ message: "" });

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

        <WorkflowSteps currentStep="guestbook" />

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
      </div>
    </div>
  );
};

export default Guestbook;
