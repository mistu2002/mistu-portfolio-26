"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface ProjectImagesProps {
  images: SanityImage[];
}

export function ProjectImages({ images }: ProjectImagesProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-full mx-auto space-y-12 md:space-y-20">
            {images.map((image, index) => (
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3) }}
                className="group"
                style={{
                  cursor: "zoom-in"
                }}
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative oerflow-hidden rounded-[48px] bg-card/30 backdrop-blur-sm border border-foreground/5">
                  <div className="relative w-full">
                    <Image
                      src={urlFor(image).width(1920).quality(90).url()}
                      alt={image.alt || ""}
                      width={1920}
                      height={1080}
                      className="w-full h-auto transition-all duration-500 group-hover:scale-[1.005]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                      priority={index === 0}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                {image.caption && (
                  <figcaption className="mt-4 text-center text-sm text-muted-foreground font-light tracking-wide">
                    {image.caption}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md overflow-y-auto"
        >
          {/* Close Button - Fixed relative to the viewport/container */}
          <div className="fixed top-0 right-0 p-4 md:p-8 z-[60]">
            <button
              onClick={() => setSelectedImage(null)}
              className="p-3 rounded-full bg-card/80 backdrop-blur-sm border border-foreground/10 hover:border-foreground/20 transition-all duration-200 group shadow-lg"
              aria-label="Close lightbox"
            >
              <X className="w-5 h-5 text-foreground/70 group-hover:text-foreground transition-colors" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="min-h-full flex items-start justify-center py-20 px-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="w-[80%] mx-auto relative"
              style={{ transformOrigin: 'top center' }}
            >
              <Image
                src={urlFor(images[selectedImage]).width(2400).quality(95).url()}
                alt={images[selectedImage].alt || ""}
                width={2400}
                height={1600}
                className="w-full h-auto rounded-lg shadow-2xl"
              />
              {images[selectedImage].caption && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 text-center text-sm md:text-base text-muted-foreground font-light tracking-wide"
                >
                  {images[selectedImage].caption}
                </motion.p>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
}

