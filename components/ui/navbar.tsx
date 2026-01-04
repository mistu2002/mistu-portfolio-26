"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["hsl(var(--background) / 0)", "hsl(var(--background) / 0.8)"]
  );
  const backdropBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 1]);

  if (pathname?.startsWith("/studio")) return null;

  return (
    <>
      <motion.header
        style={{ backgroundColor, backdropFilter: backdropBlur }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <motion.div
          style={{ opacity: borderOpacity }}
          className="absolute bottom-0 left-0 right-0 h-px bg-border"
        />
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 md:h-20 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center"
              >
                <span className="text-primary-foreground font-bold text-lg">R</span>
              </motion.div>
              <span className="font-display font-bold text-lg hidden sm:block">
                Rohosen
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "text-muted-foreground hover:text-foreground",
                      pathname === link.href && "text-foreground bg-accent"
                    )}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <Link href="mailto:rohosen2@gmail.com?subject=Hello Roho! I'd like to discuss a project with you." className="hidden md:block">
                <Button variant="glow">Get in touch</Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-40 bg-background pt-20 md:hidden"
        >
          <nav className="container px-4 py-8">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-2xl font-display py-6"
                    >
                      {link.label}
                    </Button>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-4"
              >
                <Link href="mailto:rohosen2@gmail.com?subject=Hello Roho! I'd like to discuss a project with you." onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="glow" className="w-full" size="lg">
                    Get in touch
                  </Button>
                </Link>
              </motion.div>
            </div>
          </nav>
        </motion.div>
      )}
    </>
  );
}

