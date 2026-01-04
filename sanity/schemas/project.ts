import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "meta", title: "Meta Info" },
    { name: "hero", title: "Hero Section" },
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Project Title",
      type: "string",
      group: "meta",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "meta",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle / Project Type",
      type: "string",
      group: "meta",
      description: "e.g., 'Web Application', 'Mobile App', 'UI/UX Design'",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      group: "meta",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      group: "meta",
    }),
    defineField({
      name: "tags",
      title: "Tags / Technologies",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      group: "meta",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "hero",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt Text",
        },
      ],
    }),
    defineField({
      name: "heroVideo",
      title: "Hero Video URL",
      type: "url",
      group: "hero",
      description: "YouTube or Vimeo embed URL",
    }),
    defineField({
      name: "excerpt",
      title: "Short Description",
      type: "text",
      group: "hero",
      rows: 3,
      description: "Brief description shown on project cards",
    }),
    defineField({
      name: "projectInfo",
      title: "Project Info",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "platform",
          title: "Platform",
          type: "string",
        },
        {
          name: "role",
          title: "My Role",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        },
        {
          name: "team",
          title: "Team",
          type: "string",
        },
        {
          name: "duration",
          title: "Duration",
          type: "string",
        },
        {
          name: "client",
          title: "Client",
          type: "string",
        },
      ],
    }),
    defineField({
      name: "content",
      title: "Case Study Content",
      type: "array",
      group: "content",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
              { title: "Code", value: "code" },
              { title: "Highlight", value: "highlight" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt Text",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
            {
              name: "layout",
              type: "string",
              title: "Layout",
              options: {
                list: [
                  { title: "Full Width", value: "full" },
                  { title: "Wide", value: "wide" },
                  { title: "Normal", value: "normal" },
                  { title: "Small", value: "small" },
                ],
              },
              initialValue: "wide",
            },
          ],
        },
        {
          type: "object",
          name: "imageGallery",
          title: "Image Gallery",
          fields: [
            {
              name: "images",
              type: "array",
              of: [
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", type: "string", title: "Alt Text" },
                    { name: "caption", type: "string", title: "Caption" },
                  ],
                },
              ],
            },
            {
              name: "columns",
              type: "number",
              title: "Columns",
              initialValue: 2,
              options: {
                list: [2, 3, 4],
              },
            },
          ],
          preview: {
            select: {
              images: "images",
            },
            prepare({ images }) {
              return {
                title: `Gallery (${images?.length || 0} images)`,
              };
            },
          },
        },
        {
          type: "object",
          name: "videoEmbed",
          title: "Video Embed",
          fields: [
            {
              name: "url",
              type: "url",
              title: "Video URL",
              description: "YouTube or Vimeo URL",
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
          preview: {
            select: {
              url: "url",
            },
            prepare({ url }) {
              return {
                title: "Video Embed",
                subtitle: url,
              };
            },
          },
        },
        {
          type: "object",
          name: "codeBlock",
          title: "Code Block",
          fields: [
            {
              name: "language",
              type: "string",
              title: "Language",
              options: {
                list: [
                  "javascript",
                  "typescript",
                  "python",
                  "css",
                  "html",
                  "json",
                  "bash",
                ],
              },
            },
            {
              name: "code",
              type: "text",
              title: "Code",
            },
            {
              name: "filename",
              type: "string",
              title: "Filename",
            },
          ],
          preview: {
            select: {
              language: "language",
              filename: "filename",
            },
            prepare({ language, filename }) {
              return {
                title: filename || "Code Block",
                subtitle: language,
              };
            },
          },
        },
        {
          type: "object",
          name: "section",
          title: "Content Section",
          fields: [
            {
              name: "sectionNumber",
              type: "string",
              title: "Section Number",
              description: "e.g., '01', '02'",
            },
            {
              name: "sectionTitle",
              type: "string",
              title: "Section Title",
            },
            {
              name: "sectionContent",
              type: "array",
              title: "Section Content",
              of: [
                { type: "block" },
                {
                  type: "image",
                  options: { hotspot: true },
                  fields: [
                    { name: "alt", type: "string", title: "Alt Text" },
                    { name: "caption", type: "string", title: "Caption" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              number: "sectionNumber",
              title: "sectionTitle",
            },
            prepare({ number, title }) {
              return {
                title: `${number ? `_${number} ` : ""}${title || "Section"}`,
              };
            },
          },
        },
        {
          type: "object",
          name: "callout",
          title: "Callout Box",
          fields: [
            {
              name: "type",
              type: "string",
              title: "Type",
              options: {
                list: [
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Quote", value: "quote" },
                ],
              },
              initialValue: "info",
            },
            {
              name: "content",
              type: "text",
              title: "Content",
            },
          ],
          preview: {
            select: {
              type: "type",
              content: "content",
            },
            prepare({ type, content }) {
              return {
                title: `Callout: ${type}`,
                subtitle: content?.substring(0, 50),
              };
            },
          },
        },
        {
          type: "object",
          name: "stats",
          title: "Stats Grid",
          fields: [
            {
              name: "items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "string", title: "Label" },
                    { name: "value", type: "string", title: "Value" },
                  ],
                },
              ],
            },
          ],
          preview: {
            select: {
              items: "items",
            },
            prepare({ items }) {
              return {
                title: `Stats (${items?.length || 0} items)`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "links",
      title: "Project Links",
      type: "object",
      group: "settings",
      fields: [
        {
          name: "live",
          title: "Live URL",
          type: "url",
        },
        {
          name: "github",
          title: "GitHub URL",
          type: "url",
        },
        {
          name: "figma",
          title: "Figma URL",
          type: "url",
        },
        {
          name: "video",
          title: "Demo Video URL",
          type: "url",
        },
      ],
    }),
    defineField({
      name: "featured",
      title: "Featured Project",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "settings",
      initialValue: 0,
    }),
    defineField({
      name: "hidden",
      title: "Hide Project",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "settings",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "heroImage",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Published Date",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
});

