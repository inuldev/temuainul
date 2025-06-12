import { agentsInsertSchema, agentsUpdateSchema } from "../schemas";

describe("Agents Schemas", () => {
  describe("agentsInsertSchema", () => {
    it("validates valid agent data", () => {
      const validData = {
        name: "Test Agent",
        instructions: "Test instructions for the agent",
      };

      const result = agentsInsertSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("rejects empty name", () => {
      const invalidData = {
        name: "",
        instructions: "Test instructions",
      };

      const result = agentsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Nama harus diisi");
      }
    });

    it("rejects empty instructions", () => {
      const invalidData = {
        name: "Test Agent",
        instructions: "",
      };

      const result = agentsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Instruksi harus diisi");
      }
    });

    it("rejects missing required fields", () => {
      const invalidData = {};

      const result = agentsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
      }
    });
  });

  describe("agentsUpdateSchema", () => {
    it("validates valid update data with id", () => {
      const validData = {
        id: "agent-123",
        name: "Updated Agent",
        instructions: "Updated instructions",
      };

      const result = agentsUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("rejects update data without id", () => {
      const invalidData = {
        name: "Updated Agent",
        instructions: "Updated instructions",
      };

      const result = agentsUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasIdError = result.error.issues.some((issue) =>
          issue.path.includes("id")
        );
        expect(hasIdError).toBe(true);
      }
    });

    it("rejects empty id", () => {
      const invalidData = {
        id: "",
        name: "Updated Agent",
        instructions: "Updated instructions",
      };

      const result = agentsUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Id harus diisi");
      }
    });
  });
});
