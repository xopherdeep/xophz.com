import { resolve } from "path";
import { readdirSync, existsSync } from "fs";
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

// TEMP DEBUG — remove after diagnosing
console.log("=== CONTENT CONFIG DEBUG ===");
console.log("process.cwd():", process.cwd());
console.log("resolved docs path:", docsPath);
console.log("docs path exists:", existsSync(docsPath));
try {
  console.log("docs contents:", readdirSync(docsPath));
} catch (e) {
  console.log("readdirSync error:", e.message);
}
console.log("=============================");

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
