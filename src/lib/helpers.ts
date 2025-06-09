import { z } from 'zod';

export const GalaxyParamsSchema = z.object({
  stars: z.coerce.number().int().min(1000).max(50000),
  radius: z.coerce.number().min(1).max(20),
  branches: z.coerce.number().int().min(2).max(20),
  spin: z.coerce.number(),
  randomness: z.coerce.number().min(0),
  randomnessPower: z.coerce.number().min(0),
  insideColor: z.string().startsWith('#').length(7),
  outsideColor: z.string().startsWith('#').length(7),
});
