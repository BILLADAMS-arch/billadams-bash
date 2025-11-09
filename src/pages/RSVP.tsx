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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name || !formData.contact) {
      toast({
        title: "Missing info",
        description: "Please fill out all required fields.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from("guests")
        .insert([
          {
            name: formData.name,
            contact: formData.contact,
            rsvp_status: formData.rsvp_status,
            adults_count: formData.adults_count,
            children_count: formData.children_count,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      if (data) {
        localStorage.setItem("guestId", data.id);
      }

      toast({
        title: "RSVP Confirmed!",
        description: "Thank you for your response. You can now reserve a gift!",
      });

      navigate("/gifts");
    } catch (error) {
      console.error("RSVP ERROR:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit RSVP.",
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
                RSVP Form
              </CardTitle>
              <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-4 shadow-md mt-2">
                <CardDescription className="text-lg font-bold text-white text-center">
                  Kindly RSVP
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
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

                {/* Contact */}
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

                {/* RSVP Status */}
                <div className="space-y-3">
                  <Label>Will you be attending?</Label>
                  <RadioGroup
                    value={formData.rsvp_status}
                    onValueChange={(value) => setFormData({ ...formData, rsvp_status: value })}
                  >
                    {/* Attending */}
                    <label
                      htmlFor="attending"
                      className={`flex items-center gap-2 p-2 rounded-md border-2 cursor-pointer transition-all duration-200
                        ${formData.rsvp_status === "attending" ? "bg-black text-white border-black" : "border-gray-300"}`}
                    >
                      <RadioGroupItem
                        value="attending"
                        id="attending"
                        className="h-6 w-6 rounded-full border-2 border-gray-300
                                   checked:bg-black checked:border-black relative
                                   before:absolute before:top-1/2 before:left-1/2
                                   before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2
                                   before:rounded-full before:bg-white before:opacity-0
                                   checked:before:opacity-100 transition-all duration-200"
                      />
                      Yes, I'll be there! 🎉
                    </label>

                    {/* Not Attending */}
                    <label
                      htmlFor="not_attending"
                      className={`flex items-center gap-2 p-2 rounded-md border-2 cursor-pointer transition-all duration-200
                        ${formData.rsvp_status === "not_attending" ? "bg-black text-white border-black" : "border-gray-300"}`}
                    >
                      <RadioGroupItem
                        value="not_attending"
                        id="not_attending"
                        className="h-6 w-6 rounded-full border-2 border-gray-300
                                   checked:bg-black checked:border-black relative
                                   before:absolute before:top-1/2 before:left-1/2
                                   before:h-3 before:w-3 before:-translate-x-1/2 before:-translate-y-1/2
                                   before:rounded-full before:bg-white before:opacity-0
                                   checked:before:opacity-100 transition-all duration-200"
                      />
                      Sorry, can't make it
                    </label>
                  </RadioGroup>
                </div>

                {/* Number of Guests */}
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

                {/* Submit Button */}
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
