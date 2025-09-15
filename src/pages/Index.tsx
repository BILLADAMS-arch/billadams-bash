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
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">You're Invited!</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent mb-4">
                Jonathan's First Birthday
              </h1>
              <p className="text-2xl md:text-3xl text-muted-foreground mb-8">
                Join us for an unforgettable celebration!
              </p>

              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all" asChild>
                  <Link to="/rsvp">
                    <Calendar className="mr-2 h-5 w-5" />
                    RSVP Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2" asChild>
                  <Link to="/gifts">
                    <Gift className="mr-2 h-5 w-5" />
                    View Gift Registry
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">RSVP</h3>
                  <p className="text-muted-foreground mb-4">
                    Let us know if you can make it to the celebration
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/rsvp">Respond Now →</Link>
                  </Button>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-secondary/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-4">
                    <Gift className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Gift Registry</h3>
                  <p className="text-muted-foreground mb-4">
                    Browse and reserve gifts from Jonathan's wishlist
                  </p>
                  <Button variant="link" className="p-0" asChild>
                    <Link to="/gifts">View Registry →</Link>
                  </Button>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-accent/20 bg-card/70 backdrop-blur-sm">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Guestbook</h3>
                  <p className="text-muted-foreground mb-4">
                    Leave your birthday wishes and messages
                  </p>
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
              <h2 className="text-3xl font-bold mb-6">Event Details</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card className="p-6 border-primary/20 bg-card/70 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  When & Where
                </h3>
                <div className="space-y-3">
                  <p className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>
                      <span className="font-semibold">Date:</span> Friday, 4th October 2024
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>
                      <span className="font-semibold">Time:</span> 1:00 PM
                    </span>
                  </p>
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
                    <span>
                      <span className="font-semibold">Venue:</span> Westwood Hotel
                    </span>
                  </p>
                </div>
              </Card>

              <Card className="p-6 border-secondary/20 bg-card/70 backdrop-blur-sm">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Shirt className="w-5 h-5 text-secondary" />
                  Dress Code
                </h3>
                <div className="space-y-3">
                  <p className="font-semibold text-primary">Theme: Polo Bear by Ralph Lauren</p>
                  <p className="text-muted-foreground">
                    Feel free to dress in smart casual attire:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">Navy Blue</span>
                    <span className="px-3 py-1 bg-secondary/10 rounded-full text-sm">White</span>
                    <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Beige</span>
                    <span className="px-3 py-1 bg-muted rounded-full text-sm">Preppy Chic</span>
                  </div>
                  <p className="text-sm italic text-muted-foreground">
                    But above all, Come as you're comfortable!
                  </p>
                </div>
              </Card>
            </div>

            <Card className="p-6 border-accent/20 bg-card/70 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-accent" />
                Shopping Suggestions
              </h3>
              <p className="text-muted-foreground mb-3">
                Find perfect gifts at these recommended stores:
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Peekaboo</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Toyworld</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Wamachua (Instagram)</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Babyshop Village Market</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Karen The Hub</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Woolworths</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Ashna Homes</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Kids World</span>
                <span className="px-3 py-1 bg-accent/10 rounded-full text-sm">Jumia</span>
              </div>
            </Card>
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
