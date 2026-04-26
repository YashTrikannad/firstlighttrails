import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const trails = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/trails' }),
  schema: z.object({
    title: z.string(),
    location: z.string(),
    summary: z.string(),
    difficulty: z.enum(['easy', 'moderate', 'hard', 'strenuous']),
    scenicRating: z.number().min(1).max(5),
    routes: z.array(z.object({
      name: z.string(),
      distance: z.number(),       // miles (round trip)
      elevationGain: z.number(),  // feet
      type: z.enum(['loop', 'out-and-back', 'point-to-point']),
    })),
    bestSeason: z.array(z.string()),
    hikingLists: z.array(z.string()).optional(),
    coverPhoto: z.string().optional(),      // base name, e.g. "imp-face-cover"
    coverImageAlt: z.string().optional(),
  }),
});

export const collections = { trails };
