import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, UserPlus, Users, Baby } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { WorkflowSteps } from "@/components/WorkflowSteps";

const RSVP = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    rsvp_status: "attending",
    adults_count: 1,
    children_count: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("guests")
        .insert([formData])
        .select()
        .single();

      if (error) throw error;

      // Store guest ID for gift reservation and guestbook
      if (data) {
        localStorage.setItem("guestId", data.id);
      }

      toast({
        title: "RSVP Confirmed!",
        description: "Thank you for your response. You can now reserve a gift!",
      });

      navigate("/gifts");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit RSVP",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 px-4 py-12">
      <div className="container mx-auto max-w-2xl">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <WorkflowSteps currentStep="rsvp" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-xl border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            
              </CardTitle>
          <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 shadow-md">
  <CardDescription className="text-lg font-bold text-white text-center">
    Kindly RSVP by 20th September 2025 to confirm your attendance as we celebrate Jonathan’s 1st birthday.
  </CardDescription>
</div>

            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact">Email or Phone</Label>
                  <Input
                    id="contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    placeholder="Email or Phone number"
                  />
                </div>

                <div className="space-y-3">
                  <Label>Will you be attending?</Label>
                  <RadioGroup
                    value={formData.rsvp_status}
                    onValueChange={(value) => setFormData({ ...formData, rsvp_status: value })}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="attending" id="attending" />
                      <Label htmlFor="attending" className="cursor-pointer">
                        Yes, I'll be there! 🎉
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="maybe" id="maybe" />
                      <Label htmlFor="maybe" className="cursor-pointer">
                        Sorry, can't make it
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.rsvp_status !== "not_attending" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="adults" className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Number of Adults
                        </Label>
                        <Input
                          id="adults"
                          type="number"
                          min="0"
                          value={formData.adults_count}
                          onChange={(e) =>
                            setFormData({ ...formData, adults_count: parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="children" className="flex items-center gap-2">
                          <Baby className="w-4 h-4" />
                          Number of Children
                        </Label>
                        <Input
                          id="children"
                          type="number"
                          min="0"
                          value={formData.children_count}
                          onChange={(e) =>
                            setFormData({ ...formData, children_count: parseInt(e.target.value) || 0 })
                          }
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                >
                  {loading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Confirm RSVP
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

export default RSVP;