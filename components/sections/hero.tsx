"use client";

import { motion } from "motion/react";
import { ArrowDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { SlotMachine } from "../ui/slot-machine";
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-foreground/10 bg-background/50 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium tracking-wide uppercase">Available for work</span>
            </div>
          </motion.div>

          {/* Main Title */}
          <div className="text-center mb-16 space-y-4">
          <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter text-foreground leading-[0.9]"
            >
              {/* <SlotMachine
                items={["Designing", "Drawing", "Crafting", "Conceptualizing"]}
                interval={2800}
                // highlightColor={true}
              /> */}
              Designing
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="block text-6xl md:text-8xl lg:text-9xl text-primary italic font-serif tracking-tighter leading-[0.9]"
            >
              <SlotMachine
                items={["apps", "interfaces", "websites", "products"]}
                interval={3500}
              />
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mt-8"
            >
              <p className="text-xl md:text-2xl text-muted-foreground max-w-lg text-center leading-relaxed">
                I&apos;m{" "}
                <span className="text-foreground font-bold">Mistu</span>{" "}
                <span className="inline-block align-bottom mx-1">
                  <Image
                    src="/Mistu.png"
                    alt="mistu"
                    width={80}
                    height={26}
                    className="inline-block"
                  />
                </span>
                {" "}a wave of design, empathy, and just the right amount of chaos.
              </p>

            </motion.div>
          </div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="#projects" className="group relative px-8 py-4 bg-foreground text-background rounded-full overflow-hidden">
              <span className="relative z-10 font-medium text-lg group-hover:text-background transition-colors duration-300">View Work</span>
              <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            </Link>

            <Link href="#contact" className="group px-8 py-4 rounded-full border border-foreground/20 hover:border-primary hover:bg-primary/5 transition-colors">
              <span className="font-medium text-lg group-hover:text-primary transition-colors duration-300">Contact Me</span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="w-5 h-5 text-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
