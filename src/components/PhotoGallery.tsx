import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import all gallery images
import billy1 from "@/assets/gallery/billy1.jpeg";
import billy2 from "@/assets/gallery/billy2.jpeg";
import billy3 from "@/assets/gallery/billy3.jpeg";
import billy4 from "@/assets/gallery/billy4.jpeg";
import billy22 from "@/assets/gallery/billy22.jpeg";
import billy6 from "@/assets/gallery/billy6.jpeg";
import billy23 from "@/assets/gallery/billy23.jpeg";
import billy8 from "@/assets/gallery/billy8.jpeg";
import billy9 from "@/assets/gallery/billy9.jpeg";
import billy10 from "@/assets/gallery/billy10.jpeg";
import billy11 from "@/assets/gallery/billy11.jpeg";
import billy12 from "@/assets/gallery/billy12.jpeg";
import billy13 from "@/assets/gallery/billy13.jpeg";
import billy14 from "@/assets/gallery/billy14.jpeg";
import billy15 from "@/assets/gallery/billy15.jpeg";
import billy16 from "@/assets/gallery/billy16.jpeg";
import billy17 from "@/assets/gallery/billy17.jpeg";
import billy18 from "@/assets/gallery/billy18.jpeg";
import billy19 from "@/assets/gallery/billy19.jpeg";
import billy20 from "@/assets/gallery/billy20.jpeg";
import billy21 from "@/assets/gallery/billy21.jpeg";


const galleryImages = [
  { src: billy1, alt: "Baby Jonathan wrapped in a soft blanket" },
  { src: billy2, alt: "Jonathan in star-patterned outfit" },
  { src: billy3, alt: "Jonathan in formal attire with bow tie" },
  { src: billy4, alt: "Jonathan in yellow overalls" },
  { src: billy22, alt: "Jonathan in adorable blue bear outfit" },
  { src: billy6, alt: "Jonathan in cozy blue bear costume" },
  { src: billy23, alt: "Jonathan in mint green outfit" },
  { src: billy8, alt: "Jonathan smiling in red outfit" },
  { src: billy9, alt: "Jonathan looking curious" },
  { src: billy10, alt: "Jonathan in blue fuzzy outfit smiling" },
  { src: billy11, alt: "Jonathan with dad" },
  { src: billy12, alt: "Jonathan on 1 month" },
  { src: billy13, alt: "Jonathan on 1 month" },
  { src: billy14, alt: "Jonathan on 1 month" },
  { src: billy15, alt: "Jonathan on 1 month" },
  { src: billy16, alt: "Jonathan on 1 month" },
  { src: billy17, alt: "Jonathan on 1 month" },
  { src: billy18, alt: "Jonathan on 1 month" },
  { src: billy19, alt: "Jonathan on 1 month" },
  { src: billy20, alt: "Jonathan on 1 month" },
  { src: billy21, alt: "Jonathan on 1 month" },
  

];

export default function PhotoGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handlePrevious = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1);
    }
  };

  const handleNext = () => {
    if (selectedImage !== null && selectedImage < galleryImages.length - 1) {
      setSelectedImage(selectedImage + 1);
    }
  };

  return (
    <>
      <section className="py-16 px-4 sm:px-4 lg:px-4 bg-gradient-to-b from-primary-50/50 to-background">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-0"
          >
            <p className="text-2xl font-bold  mb-2">
  Bill's Photo Gallery
</p>

          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:shown">
            <Carousel className="w-full">
              <CarouselContent>
                {galleryImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-[400px] object-cover rounded-lg shadow-lg cursor-pointer"
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={handlePrevious}
                disabled={selectedImage === 0}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={handleNext}
                disabled={selectedImage === galleryImages.length - 1}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              <img
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
              />

              <p className="text-white text-center mt-4 text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}