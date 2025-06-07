import { z } from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Nama harus diisi" }),
  agentId: z.string().min(1, { message: "Agen harus diisi" }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id harus diisi" }),
});
