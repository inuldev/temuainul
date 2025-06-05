import { z } from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),

  instructions: z.string().min(1, { message: "Instruksi harus diisi" }),
});
