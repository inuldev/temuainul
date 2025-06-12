import { meetingsInsertSchema, meetingsUpdateSchema } from "../schemas";

describe("Meetings Schemas", () => {
  describe("meetingsInsertSchema", () => {
    it("validates valid meeting data", () => {
      const validData = {
        name: "Test Meeting",
        agentId: "agent-123",
      };

      const result = meetingsInsertSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("rejects empty name", () => {
      const invalidData = {
        name: "",
        agentId: "agent-123",
      };

      const result = meetingsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Nama harus diisi");
      }
    });

    it("rejects empty agentId", () => {
      const invalidData = {
        name: "Test Meeting",
        agentId: "",
      };

      const result = meetingsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Agen harus diisi");
      }
    });

    it("rejects missing required fields", () => {
      const invalidData = {};

      const result = meetingsInsertSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues).toHaveLength(2);
      }
    });
  });

  describe("meetingsUpdateSchema", () => {
    it("validates valid update data with id", () => {
      const validData = {
        id: "meeting-123",
        name: "Updated Meeting",
        agentId: "agent-456",
      };

      const result = meetingsUpdateSchema.safeParse(validData);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it("rejects update data without id", () => {
      const invalidData = {
        name: "Updated Meeting",
        agentId: "agent-456",
      };

      const result = meetingsUpdateSchema.safeParse(invalidData);
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
        name: "Updated Meeting",
        agentId: "agent-456",
      };

      const result = meetingsUpdateSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe("Id harus diisi");
      }
    });
  });
});
