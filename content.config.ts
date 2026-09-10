import { resolve } from "path";
import { defineContentConfig, defineCollection, z } from "@nuxt/content";

const postSchema = z.object({
  title: z.string(),
  date: z.string(),
  type: z.string().optional(),
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
  crosspost: z.boolean().optional(),
});

const docsPath = resolve(process.cwd(), "docs");

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: {
        include: "**/*.md",
        prefix: "/posts",
        cwd: docsPath,
      },
      schema: postSchema,
    }),
  },
});
