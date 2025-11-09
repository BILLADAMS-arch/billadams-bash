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
import JJ1 from "@/assets/gallery/JJ1.jpeg";
import JJ2 from "@/assets/gallery/JJ2.jpeg";
import JJ3 from "@/assets/gallery/JJ3.jpeg";
import JJ4 from "@/assets/gallery/JJ4.jpeg";
import JJ5 from "@/assets/gallery/JJ5.jpeg";
import JJ6 from "@/assets/gallery/JJ6.jpeg";
import JJ7 from "@/assets/gallery/JJ7.jpeg";
import JJ8 from "@/assets/gallery/JJ8.jpeg";
import JJ9 from "@/assets/gallery/JJ9.jpeg";
import JJ10 from "@/assets/gallery/JJ10.jpeg";
import JJ11 from "@/assets/gallery/JJ11.jpeg";
import JJ12 from "@/assets/gallery/JJ12.jpeg";
import JJ13 from "@/assets/gallery/JJ13.jpeg";
import JJ14 from "@/assets/gallery/JJ14.jpeg";
import JJ15 from "@/assets/gallery/JJ15.jpeg";
import JJ16 from "@/assets/gallery/JJ16.jpeg";
import JJ18 from "@/assets/gallery/JJ18.jpeg";
import JJ20 from "@/assets/gallery/JJ20.jpeg";
import JJ21 from "@/assets/gallery/JJ21.jpeg";



const galleryImages = [
  { src: JJ1, alt: "Baby Jonathan wrapped in a soft blanket" },
  { src: JJ2, alt: "Jonathan in star-patterned outfit" },
  { src: JJ3, alt: "Jonathan in formal attire with bow tie" },
  { src: JJ4, alt: "Jonathan in yellow overalls" },
  { src: JJ5, alt: "Jonathan in adorable blue bear outfit" },
  { src: JJ6, alt: "Jonathan in cozy blue bear costume" },
  { src: JJ7, alt: "Jonathan in mint green outfit" },
  { src: JJ8, alt: "Jonathan smiling in red outfit" },
  { src: JJ9, alt: "Jonathan looking curious" },
  { src: JJ10, alt: "Jonathan in blue fuzzy outfit smiling" },
  { src: JJ11, alt: "Jonathan with dad" },
  { src: JJ12, alt: "Jonathan on 1 month" },
  { src: JJ13, alt: "Jonathan on 1 month" },
  { src: JJ14, alt: "Jonathan on 1 month" },
  { src: JJ15, alt: "Jonathan on 1 month" },
  { src: JJ16, alt: "Jonathan on 1 month" },
  { src: JJ18, alt: "Jonathan on 1 month" },
  { src: JJ20, alt: "Jonathan on 1 month" },
  { src: JJ21, alt: "Jonathan on 1 month" },
  

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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary-50/50 to-background">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-[hsl(var(--heading))] mb-4">
  Bill's Photo Gallery
</h2>

          </motion.div>

          {/* Mobile Carousel */}
          <div className="md:hidden">
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