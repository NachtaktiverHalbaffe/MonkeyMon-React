import { z } from "zod";

export const MonSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  image: z.string().url().nullable(),
  description: z.string().nullable(),
  hp: z.number().int().gt(0).lt(500),
  attack: z.number().int().gt(0).lt(500),
  defense: z.number().int().gt(0).lt(500),
  specialAttack: z.number().int().gt(0).lt(500),
  specialDefense: z.number().int().gt(0).lt(500),
  speed: z.number().int().gt(0).lt(500),
});

export type Mon = z.infer<typeof MonSchema>;
