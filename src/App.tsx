import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RSVP from "./pages/RSVP";
import Gifts from "./pages/Gifts";
import Guestbook from "./pages/Guestbook";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Notifications */}
      <Toaster />
      <Sonner />

      {/* Background Layers */}
      <div className="relative min-h-screen">
        {/* Background image */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/birthday-bg.jpg')" }}
        ></div>

        {/* Gradient overlay for readability */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-background/70 via-primary/40 to-secondary/30"></div>

        {/* Main App */}
        <div className="relative z-10">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/rsvp" element={<RSVP />} />
              <Route path="/gifts" element={<Gifts />} />
              <Route path="/guestbook" element={<Guestbook />} />
              <Route path="/admin" element={<AdminDashboard />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
