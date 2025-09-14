import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Heart, Calendar, PartyPopper, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20">
        <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(147,51,234,0.03)_10px,rgba(147,51,234,0.03)_20px)]"></div>
        
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
              Jonathan's Birthday
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-secondary/20">
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

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 border-accent/20">
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
      <section className="px-4 py-16 bg-card/50">
        <div className="container mx-auto max-w-4xl text-center">
          <PartyPopper className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-6">Event Details</h2>
          <div className="space-y-2 text-lg">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Date:</span> Saturday, March 15, 2025
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Time:</span> 7:00 PM
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Venue:</span> The Grand Ballroom
            </p>
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">Dress Code:</span> Cocktail Attire
            </p>
          </div>
        </div>
      </section>

      {/* Admin Link */}
      <footer className="px-4 py-8 text-center">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/admin">Admin Dashboard</Link>
        </Button>
      </footer>
    </div>
  );
};

export default Index;