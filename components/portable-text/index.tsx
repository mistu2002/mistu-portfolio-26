"use client";

import { PortableText, PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";
import type { ContentBlock, ImageGallery, VideoEmbed, CodeBlock, Section, Callout, Stats, SanityImage } from "@/sanity/lib/types";
import { motion } from "motion/react";
import { Info, AlertTriangle, CheckCircle, Quote } from "lucide-react";

const calloutIcons = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle,
  quote: Quote,
};

const calloutStyles = {
  info: "bg-blue-500/10 border-blue-500/30 text-blue-200",
  warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-200",
  success: "bg-green-500/10 border-green-500/30 text-green-200",
  quote: "bg-primary/10 border-primary/30 text-foreground italic",
};

function ImageBlock({ value }: { value: SanityImage }) {
  if (!value?.asset) return null;
  
  const layoutClasses = {
    full: "w-full",
    wide: "w-full max-w-5xl mx-auto",
    normal: "w-full max-w-3xl mx-auto",
    small: "w-full max-w-xl mx-auto",
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn("my-8 md:my-12", layoutClasses[value.layout || "wide"])}
    >
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt || ""}
          fill
          className="object-cover"
        />
      </div>
      {value.caption && (
        <figcaption className="text-center text-muted-foreground text-sm mt-3">
          {value.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function ImageGalleryBlock({ value }: { value: ImageGallery }) {
  if (!value?.images?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "my-8 md:my-12 grid gap-4",
        value.columns === 2 && "grid-cols-1 md:grid-cols-2",
        value.columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        value.columns === 4 && "grid-cols-2 md:grid-cols-4"
      )}
    >
      {value.images.map((img, index) => (
        <figure key={index} className="relative aspect-square overflow-hidden rounded-xl">
          <Image
            src={urlFor(img).width(600).height(600).url()}
            alt={img.alt || ""}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </figure>
      ))}
    </motion.div>
  );
}

function VideoEmbedBlock({ value }: { value: VideoEmbed }) {
  if (!value?.url) return null;

  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = url.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/)?.[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("vimeo.com")) {
      const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <motion.figure
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 md:my-12"
    >
      <div className="relative aspect-video overflow-hidden rounded-xl bg-card">
        <iframe
          src={getEmbedUrl(value.url)}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {value.caption && (
        <figcaption className="text-center text-muted-foreground text-sm mt-3">
          {value.caption}
        </figcaption>
      )}
    </motion.figure>
  );
}

function CodeBlockComponent({ value }: { value: CodeBlock }) {
  if (!value?.code) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 md:my-12"
    >
      {value.filename && (
        <div className="bg-muted px-4 py-2 rounded-t-xl border border-b-0 border-border">
          <span className="text-sm font-mono text-muted-foreground">{value.filename}</span>
        </div>
      )}
      <pre className={cn(
        "p-4 overflow-x-auto bg-card border border-border",
        value.filename ? "rounded-b-xl" : "rounded-xl"
      )}>
        <code className="text-sm font-mono">{value.code}</code>
      </pre>
    </motion.div>
  );
}

function SectionBlock({ value }: { value: Section }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-16 md:my-24"
    >
      <div className="mb-8">
        {value.sectionNumber && (
          <span className="text-primary font-mono text-sm block mb-2">
            _{value.sectionNumber}
          </span>
        )}
        {value.sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            {value.sectionTitle}
          </h2>
        )}
      </div>
      {value.sectionContent && (
        <div className="prose prose-invert max-w-none">
          <PortableText value={value.sectionContent as any} components={portableTextComponents} />
        </div>
      )}
    </motion.section>
  );
}

function CalloutBlock({ value }: { value: Callout }) {
  const Icon = calloutIcons[value.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={cn(
        "my-8 p-6 rounded-xl border flex gap-4",
        calloutStyles[value.type]
      )}
    >
      <Icon className="w-6 h-6 flex-shrink-0 mt-0.5" />
      <p className="text-base leading-relaxed">{value.content}</p>
    </motion.div>
  );
}

function StatsBlock({ value }: { value: Stats }) {
  if (!value?.items?.length) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="my-8 md:my-12 grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {value.items.map((item, index) => (
        <div key={index} className="p-6 rounded-xl bg-card border border-border text-center">
          <div className="text-3xl md:text-4xl font-display font-bold text-primary mb-1">
            {item.value}
          </div>
          <div className="text-sm text-muted-foreground">{item.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

export const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl md:text-4xl font-display font-bold mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl md:text-3xl font-display font-bold mt-10 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl md:text-2xl font-display font-semibold mt-8 mb-3">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-muted-foreground leading-relaxed mb-6">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-xl text-foreground">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">{children}</code>
    ),
    highlight: ({ children }) => (
      <mark className="bg-primary/30 text-foreground px-1 rounded">{children}</mark>
    ),
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-6 ml-4">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 text-muted-foreground mb-6 ml-4">
        {children}
      </ol>
    ),
  },
  types: {
    image: ImageBlock,
    imageGallery: ImageGalleryBlock,
    videoEmbed: VideoEmbedBlock,
    codeBlock: CodeBlockComponent,
    section: SectionBlock,
    callout: CalloutBlock,
    stats: StatsBlock,
  },
};

interface PortableTextRendererProps {
  content: ContentBlock[];
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <PortableText value={content as any} components={portableTextComponents} />
    </div>
  );
}

