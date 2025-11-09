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

      <div className="relative px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-1 bg-blue-900 px-3 py-1.5 rounded-full mb-2 text-xs sm:text-sm font-bold text-white shadow-sm">
              Graduation: Nov 14 | Birthday Bash: Nov 15
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[hsl(var(--heading))] mb-2">
              Welcome to BILL ADAMS' World🎓🎉
            </h1>

            <div className="flex flex-col sm:flex-row justify-center gap-2 text-xs sm:text-sm">
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

        {/* Features Section (Single Row Cards) */}
        <section className="mb-6 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {/* RSVP */}
            <Card className="p-3 w-48 flex-shrink-0 hover:shadow-xl transition-all border-primary/20 bg-card/70 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-2">
                <Calendar className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold mb-1">RSVP</h3>
              <p className="text-xs text-muted-foreground mb-1">
                Celebrate Graduation & Birthday. Your presence matters!
              </p>
              <Button variant="link" className="p-0 text-xs" asChild>
                <Link to="/rsvp">Respond Now →</Link>
              </Button>
            </Card>

            {/* Bill's Wishlist */}
            <Card className="p-3 w-48 flex-shrink-0 hover:shadow-xl transition-all border-secondary/20 bg-card/70 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center mb-2">
                <Gift className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Bill's Wishlist</h3>
              <p className="text-xs text-muted-foreground mb-1">
                Browse and reserve gifts from Bill&apos;s wishlist
              </p>
              <Button variant="link" className="p-0 text-xs" asChild>
                <Link to="/gifts">View Wish List →</Link>
              </Button>
            </Card>

            {/* Guestbook */}
            <Card className="p-3 w-48 flex-shrink-0 hover:shadow-xl transition-all border-accent/20 bg-card/70 backdrop-blur-sm">
              <div className="w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg flex items-center justify-center mb-2">
                <Heart className="w-4 h-4 text-primary-foreground" />
              </div>
              <h3 className="text-sm font-semibold mb-1">Guestbook</h3>
              <p className="text-xs text-muted-foreground mb-1">
                Leave birthday wishes and messages
              </p>
              <Button variant="link" className="p-0 text-xs" asChild>
                <Link to="/guestbook">Write a Message →</Link>
              </Button>
            </Card>
          </div>
        </section>

        {/* Event Details */}
        <section className="mb-6">
          <div className="text-center mb-2">
            <PartyPopper className="w-8 h-8 text-primary mx-auto mb-1" />
            <h2 className="text-lg font-bold text-[hsl(var(--heading))]">Event Details</h2>
          </div>

          <Card className="p-3 border-primary/20 bg-card/70 backdrop-blur-sm text-xs">
            <h3 className="font-semibold mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-primary" />
              When & Where
            </h3>
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
                  className="text-primary underline hover:text-accent"
                >
                  A.S.K Dome
                </a>
              </span>
            </p>
          </Card>
        </section>

        {/* Photo Gallery */}
        <section className="mb-4">
          <PhotoGallery />
        </section>

        {/* Admin Link */}
        <footer className="py-2 text-center">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/admin">Admin Dashboard</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default Index;
