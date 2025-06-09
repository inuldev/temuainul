import { z } from "zod";

// Create a function that returns the schema with translations
export const createAgentsInsertSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(1, { message: t("validation.nameRequired") }),
    instructions: z
      .string()
      .min(1, { message: t("validation.instructionsRequired") }),
  });

// Default schema for backward compatibility
export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  instructions: z.string().min(1, { message: "Instruksi harus diisi" }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "Id harus diisi" }),
});
