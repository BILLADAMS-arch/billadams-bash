import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Gift, Heart, Calendar, PartyPopper, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PhotoGallery from "@/components/PhotoGallery";
import "@/index.css";

const Index = () => {
  return (
    <div className="relative min-h-screen">
      {/* Gradient base */}
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-background via-primary/5 to-secondary/10"></div>

      {/* Confetti overlay */}
      <div className="fixed inset-0 -z-10 opacity-20 bg-[url('/confetti.svg')] bg-repeat"></div>

      <div className="relative px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-1 bg-blue-900 px-2 py-1 rounded-full mb-4 text-xs">
              Graduation: Nov 14 | Birthday Bash: Nov 15
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-[hsl(var(--heading))] mb-4">
              Welcome to BILL ADAMS' World🎓🎉
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-2">
              <Button
                size="sm"
                className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all"
                asChild
              >
                <Link to="/rsvp">
                  <Calendar className="mr-1 h-4 w-4" />
                  RSVP Now
                </Link>
              </Button>
              <Button size="sm" variant="outline" className="border-2" asChild>
                <Link to="/gifts">
                  <Gift className="mr-1 h-4 w-4" />
                  View Wishlist
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="mb-8">
          <div className="grid grid-cols-1 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-4 hover:shadow-xl transition-all border-primary/20 bg-card/70 backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-2">
                  <Calendar className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">RSVP</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Celebrate Graduation & Birthday. Your presence matters!
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/rsvp">Respond Now →</Link>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-4 hover:shadow-xl transition-all border-secondary/20 bg-card/70 backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-2">
                  <Gift className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Bill's Wishlist</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Browse and reserve gifts from Bill&apos;s wishlist
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/gifts">View Wish List →</Link>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-4 hover:shadow-xl transition-all border-accent/20 bg-card/70 backdrop-blur-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-2">
                  <Heart className="w-4 h-4 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Guestbook</h3>
                <p className="text-xs text-muted-foreground mb-2">
                  Leave birthday wishes and messages
                </p>
                <Button variant="link" className="p-0" asChild>
                  <Link to="/guestbook">Write a Message →</Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-8">
          <div className="text-center mb-4">
            <PartyPopper className="w-10 h-10 text-primary mx-auto mb-2" />
            <h2 className="text-xl font-bold text-[hsl(var(--heading))] mb-2">Event Details</h2>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Card className="p-4 border-primary/20 bg-card/70 backdrop-blur-sm">
              <h3 className="font-semibold text-sm mb-2 flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                When & Where
              </h3>
              <div className="space-y-1 text-xs">
                <p className="flex items-start gap-1">
                  <Calendar className="w-3 h-3 text-muted-foreground mt-0.5" />
                  <span><span className="font-semibold">Date:</span> Fri, Nov 14, 2025</span>
                </p>
                <p className="flex items-start gap-1">
                  <Clock className="w-3 h-3 text-muted-foreground mt-0.5" />
                  <span><span className="font-semibold">Time:</span> 9:00AM - 1:00PM</span>
                </p>
                <p className="flex items-start gap-1">
                  <MapPin className="w-3 h-3 text-muted-foreground mt-0.5" />
                  <span>
                    <span className="font-semibold">Venue:</span>{" "}
                    <a
                      href="https://maps.app.goo.gl/hj9t6Ah2ZooddgU76?g_st=ipc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline hover:text-accent transition-colors text-xs"
                    >
                      A.S.K Dome
                    </a>
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Photo Gallery */}
        <PhotoGallery />

        {/* Admin Link */}
        <footer className="py-4 text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Index;
