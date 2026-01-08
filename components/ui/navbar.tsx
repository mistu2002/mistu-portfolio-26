"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const offset = 80; // Navbar height offset
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        window.history.pushState(null, "", href);
      }
    }
  };

  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4 pointer-events-none"
      >
        <div className="pointer-events-auto bg-background/80 backdrop-blur-md border border-foreground/5 rounded-full px-2 py-2 shadow-lg flex items-center gap-2 md:gap-4">
          
          <Link href="/" className="flex items-center gap-2 pl-4 pr-2">
            <span className="font-display font-bold text-xl tracking-tight">Mistu</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-secondary/50 rounded-full px-2 py-1">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleScroll(e, link.href)}
                className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-primary"
              >
                {link.label}
                {pathname === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 pr-2">
            <Link href="mailto:suchismitadas.2002@gmail.com" className="hidden md:block">
              <div className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2.5 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95">
                Let&apos;s Talk
              </div>
            </Link>
            
            <button
              className="md:hidden p-3 rounded-full hover:bg-secondary transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center"
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-8 right-8 p-4 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleScroll(e, link.href);
                  }}
                  className="text-5xl font-display font-bold hover:text-stroke hover:text-transparent transition-all duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8"
            >
              <Link
                href="mailto:suchismitadas.2002@gmail.com"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-full text-xl font-medium"
              >
                Get in touch
              </Link>
            </motion.div>
          </nav>
        </motion.div>
      )}
    </>
  );
}
