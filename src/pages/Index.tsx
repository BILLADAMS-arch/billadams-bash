import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, PartyPopper, Clock, MapPin } from "lucide-react";
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
              Graduation Ceremony: November 14, 2025 | Birthday Bash: November 15, 2025
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
            </div>
          </motion.div>
        </section>

        {/* RSVP + Event Details + Photo Gallery Section */}
<section className="mb-2">
  <div className="flex gap-2 justify-center flex-wrap">
    {/* RSVP Card */}
    <Card className="p-4 w-64 flex-shrink-0 hover:shadow-xl transition-all border-primary/20 bg-card/70 backdrop-blur-sm text-sm">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center mb-0">
        <Calendar className="w-5 h-5 text-primary-foreground" />
      </div>
      <h3 className="text-base font-semibold mb-2 text-center">RSVP</h3>
      <p className="text-sm text-muted-foreground mb-3 text-center">
      Your presence and support mean the world to me!
      </p>
      <Button variant="link" className="p-0 text-sm w-full text-center" asChild>
        <Link to="/rsvp">Respond Now →</Link>
      </Button>
    </Card>

    {/* Event Details Card */}
    <Card className="p-4 w-64 flex-shrink-0 border-primary/20 bg-card/70 backdrop-blur-sm text-sm">
      <div className="text-center mb-3">
        <PartyPopper className="w-10 h-10 text-primary mx-auto mb-1" />
        <h2 className="text-base font-semibold text-[hsl(var(--heading))]">Event Details</h2>
      </div>
      <div className="space-y-0">
        <p className="flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span><span className="font-semibold">Date:</span> Fri, Nov 14, 2025</span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          <Clock className="w-4 h-4 text-primary" />
          <span><span className="font-semibold">Time:</span> 9:00AM - 1:00PM</span>
        </p>
        <p className="flex items-center gap-1 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
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
      </div>
    </Card>
  </div>

  {/* Photo Gallery */}
  <section className="mt 0 gap-0">
    <PhotoGallery />
  </section>
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
