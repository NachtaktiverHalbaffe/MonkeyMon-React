import { z } from "zod";
import { MonSchema } from "./mon";

export const MonkeySchema = MonSchema.extend({
  knownFrom: z.string().nullable(),
  strength: z.string().nullable(),
  weaknesses: z.string().nullable(),
  speciesName: z.string().nullable(),
  // speciesContent: z.object(),
});

export type Monkey = z.infer<typeof MonkeySchema>;
