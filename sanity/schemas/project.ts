import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      group: "content",
      rows: 4,
      description: "Brief description of the project",
    }),
    defineField({
      name: "date",
      title: "Project Date",
      type: "date",
      group: "content",
      description: "When was this project completed?",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      group: "content",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "projectImages",
      title: "Project Images",
      type: "array",
      group: "content",
      description: "Gallery of project images",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption (Optional)",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "video",
      title: "Project Video",
      type: "url",
      group: "content",
      description: "YouTube, Vimeo, or other video URL (optional)",
    }),
    defineField({
      name: "websiteLink",
      title: "Website Link",
      type: "url",
      group: "content",
      description: "Link to live project website (optional)",
    }),
    defineField({
      name: "behanceLink",
      title: "Behance Link",
      type: "url",
      group: "content",
      description: "Link to project on Behance (optional)",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      group: "settings",
      description: "Tags for filtering (e.g., UI/UX, Branding, Web Design)",
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "settings",
      initialValue: false,
      description: "Highlight this project on the homepage",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
      initialValue: 0,
      description: "Lower numbers appear first",
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "date",
      media: "coverImage",
    },
    prepare({ title, date, media }) {
      return {
        title: title,
        subtitle: date ? new Date(date).getFullYear().toString() : "No date",
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Project Date (Newest First)",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Project Date (Oldest First)",
      name: "dateAsc",
      by: [{ field: "date", direction: "asc" }],
    },
  ],
});
