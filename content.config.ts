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

export default defineContentConfig({
  collections: {
    posts: defineCollection({
      type: "page",
      source: {
        include: "**/*.md", // This will now grab all markdown files in the root of the submodule
        prefix: "/posts",
        cwd: resolve(process.cwd(), "docs"), // Changed from 'docs/posts' to just 'docs'
      },
      schema: postSchema,
    }),
  },
});
