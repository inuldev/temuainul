import { MeetingStatus } from "../types";

describe("Meeting Types", () => {
  describe("MeetingStatus", () => {
    it("has correct enum values", () => {
      expect(MeetingStatus.Upcoming).toBe("upcoming");
      expect(MeetingStatus.Active).toBe("active");
      expect(MeetingStatus.Completed).toBe("completed");
      expect(MeetingStatus.Processing).toBe("processing");
      expect(MeetingStatus.Cancelled).toBe("cancelled");
    });

    it("contains all expected status values", () => {
      const statusValues = Object.values(MeetingStatus);
      expect(statusValues).toHaveLength(5);
      expect(statusValues).toContain("upcoming");
      expect(statusValues).toContain("active");
      expect(statusValues).toContain("completed");
      expect(statusValues).toContain("processing");
      expect(statusValues).toContain("cancelled");
    });

    it("can be used in type checking", () => {
      const testStatus: MeetingStatus = MeetingStatus.Upcoming;
      expect(typeof testStatus).toBe("string");
      expect(testStatus).toBe("upcoming");
    });
  });
});
