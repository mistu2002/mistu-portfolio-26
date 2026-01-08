"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { href: "https://dribbble.com/mistudoi", icon: Github, label: "GitHub" },
  { href: "https://www.linkedin.com/in/suchismita-das-551b44227/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.behance.net/suchismitadas2", icon: Twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer id="contact" className="mx-8 mb-8 rounded-[48px] relative bg-foreground text-background overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-8 py-20 md:py-32 relative z-10">
        <div className="flex flex-col gap-12 md:gap-24">
          {/* Header Section */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl lg:text-9xl font-display font-bold tracking-tight leading-[0.9]"
            >
              Let&apos;s create
              <br />
              <span className="text-stroke-sm text-transparent hover:text-primary transition-colors duration-500">
                something beautiful
              </span>
            </motion.h2>
          </div>

          {/* Contact Actions */}
          <div className="grid md:grid-cols-2 gap-8 items-end">
            <div>
              <p className="text-xl md:text-2xl text-background/60 mb-8 max-w-lg">
                Have a project in mind or just want to say hello? I&apos;m always open to discussing new ideas.
              </p>
              <Link
                href="mailto:suchismitadas.2002@gmail.com"
                className="inline-flex items-center gap-4 bg-primary text-primary-foreground px-8 py-4 md:px-10 md:py-5 rounded-full text-xl font-medium hover:scale-105 hover:rotate-2 transition-transform duration-300"
              >
                Start a Project
                <ArrowUpRight className="w-6 h-6" />
              </Link>
            </div>

            <div className="flex flex-col gap-8 md:items-end">
               <div className="flex gap-4">
                 {socialLinks.map((link) => (
                   <Link
                     key={link.label}
                     href={link.href}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="p-4 rounded-full border border-background/20 hover:bg-background hover:text-foreground transition-all duration-300 group"
                   >
                     <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                   </Link>
                 ))}
               </div>
               <div className="text-right">
                 <p className="text-background/40 font-display text-lg">Based in India</p>
                 <p className="text-background/40 font-display text-lg">Working Worldwide</p>
               </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-2 text-background/40 text-sm">
          <p>© {new Date().getFullYear()} Rohosen. All Rights Reserved.</p>
          <p className="font-mono">DESIGNED & CODED WITH LOVE ❤️</p>
        </div>
      </div>
    </footer>
  );
}
