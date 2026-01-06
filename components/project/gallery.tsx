"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage } from "@/sanity/lib/types";
import { useState } from "react";

interface ProjectGalleryProps {
  images: SanityImage[];
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {images.map((image, index) => (
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative overflow-hidden rounded-xl bg-card soft-shadow paper-texture">
                  <Image
                    src={urlFor(image).width(1000).url()}
                    alt={image.alt || ""}
                    width={1000}
                    height={700}
                    className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                  {image.caption && (
                    <motion.figcaption
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-card/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <p className="text-sm text-foreground">
                        {image.caption}
                      </p>
                    </motion.figcaption>
                  )}
                </div>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Simple lightbox modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-7xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={urlFor(images[selectedImage]).width(2000).url()}
              alt={images[selectedImage].alt || ""}
              width={2000}
              height={1400}
              className="w-auto h-auto max-w-full max-h-[90vh] rounded-xl soft-shadow"
            />
            {images[selectedImage].caption && (
              <p className="mt-4 text-center text-sm text-muted-foreground">
                {images[selectedImage].caption}
              </p>
            )}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 px-4 py-2 bg-card rounded-lg soft-shadow text-sm text-foreground hover:text-primary transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
