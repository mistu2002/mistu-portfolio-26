"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/sanity/lib/image";
import type { Project } from "@/sanity/lib/types";
import { ArrowLeft, ExternalLink, Github, Figma, Play } from "lucide-react";

interface CaseStudyHeroProps {
  project: Project;
}

export function CaseStudyHero({ project }: CaseStudyHeroProps) {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="gradient-blur opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/#projects">
            <Button variant="ghost" className="mb-8 -ml-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to projects
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {project.date && (
                <span className="text-primary font-mono text-sm mb-4 block">
                  {project.date}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold tracking-tight mb-4">
                {project.title}
              </h1>
              {project.description && (
                <p className="text-xl md:text-2xl text-muted-foreground mb-6">
                  {project.description}
                </p>
              )}
            </motion.div>

            {project.description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg text-muted-foreground leading-relaxed mb-8"
              >
                {project.description}
              </motion.p>
            )}

            {project.tags && project.tags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-8"
              >
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </motion.div>
            )}

            {project.websiteLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-3"
              >
                {project.websiteLink && (
                  <Link href={project.websiteLink} target="_blank">
                    <Button variant="glow">
                      <ExternalLink className="w-4 h-4" />
                      View Live
                    </Button>
                  </Link>
                )}
                {project.behanceLink && (
                  <Link href={project.behanceLink} target="_blank">
                    <Button variant="outline">
                      <Github className="w-4 h-4" />
                      GitHub
                    </Button>
                  </Link>
                )}
                {project.video && (
                  <Link href={project.video} target="_blank">
                    <Button variant="outline">
                      <Figma className="w-4 h-4" />
                      Figma
                    </Button>
                  </Link>
                )}
              </motion.div>
            )}
          </div>

          {project.date && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="grid grid-cols-2 gap-6"
            >
              {project.date && (
                <InfoCard label="Date" value={project.date} />
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="col-span-2 p-6 rounded-xl bg-card border border-border">
                  <span className="text-sm text-muted-foreground block mb-2">Tags</span>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {project.coverImage && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative mt-8 md:mt-12"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl">
              <Image
                src={urlFor(project.coverImage).width(1920).height(820).url()}
                alt={project.coverImage.alt || project.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
            </div>
          </div>
        </motion.div>
      )}

      {project.video && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="container mx-auto px-4 md:px-6 mt-8 md:mt-12"
        >
          <div className="relative aspect-video overflow-hidden rounded-2xl md:rounded-3xl bg-card">
            <iframe
              src={getEmbedUrl(project.video)}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border">
      <span className="text-sm text-muted-foreground block mb-1">{label}</span>
      <span className="text-lg font-semibold">{value}</span>
    </div>
  );
}

function getEmbedUrl(url: string): string {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const videoId = url.match(
      /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/
    )?.[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (url.includes("vimeo.com")) {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
}

