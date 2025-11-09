import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Heart, Calendar, PartyPopper, Sparkles, MapPin, Clock, Shirt, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhotoGallery from "@/components/PhotoGallery";
import "@/index.css"; // make sure this pulls in Tailwind + custom CSS

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Gradient base */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10"></div>

      {/* Confetti overlay */}
      <div className="fixed inset-0 -z-10 opacity-30 bg-[url('/confetti.svg')] bg-repeat"></div>

      {/* Page Content */}
      <div className="relative">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-4 py-20">
          <div className="container mx-auto max-w-6xl text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-2 bg-blue-900 px-4 py-2 rounded-full mb-6">
  <span className="text-sm font-medium text-white">
    Graduation Ceremony: November 14, 2025 | Birthday Bash: November 15, 2025
  </span>
</div>


              {/* Updated to dark navy heading color */}
              <h1 className="text-6xl md:text-8xl font-bold text-[hsl(var(--heading))] mb-4">
                Welcome to the BILL ADAMS' World🎓🎉
              </h1>
          
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                  asChild
                >
                  <Link to="/rsvp">
                    <Calendar className="mr-2 h-5 w-5" />
                    RSVP Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link to="/gifts">
                    <Gift className="mr-2 h-5 w-5" />
                    View Bill Adams' Wishlist
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">RSVP</h3>
                  <p className="text-muted-foreground mb-4">
                    Celebrating a Graduation Milestone & Birthday

Join us in commemorating this special journey as we transition into a new chapter. Your presence and support mean the world to us!
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/rsvp">Respond Now →</Link>
                  </Button>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-secondary/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Bill Adams' Wish List</h3>
                  <p className="text-muted-foreground mb-4">Browse and reserve gifts from Bill&apos;s wishlist</p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/gifts">View Wish List →</Link>
                  </Button>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-accent/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Guestbook</h3>
                  <p className="text-muted-foreground mb-4">Leave your birthday wishes and messages</p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/guestbook">Write a Message →</Link>
                  </Button>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Party Details */}
        <section className="px-4 py-16">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <PartyPopper className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-[hsl(var(--heading))] mb-6">Event Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6 border-primary/20 bg-card/70 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2 text-[hsl(var(--heading))]">
                  <Calendar className="w-5 h-5 text-primary" />
                  When & Where
                </h3>
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>
                      <span className="font-semibold">Date:</span> Friday, 14th November 2025
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>
                      <span className="font-semibold">Time:</span> 9:00AM - 1:00 PM
                    </span>
                  </p>
                 <p className="flex items-start gap-2">
  <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
  <span>
    <span className="font-semibold">Venue:</span>{" "}
    <a
      href="https://maps.app.goo.gl/hj9t6Ah2ZooddgU76?g_st=ipc"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-accent transition-colors"
    >
      A.S.K Dome
    </a>
  </span>
</p>
                </div>
              </Card>
  
            </div>
          </div>
        </section>

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* Admin Link */}
        <footer className="px-4 py-8 text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Index;
