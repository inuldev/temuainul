import { cn } from "../utils";

describe("utils", () => {
  describe("cn (className utility)", () => {
    it("merges class names correctly", () => {
      const result = cn("px-4", "py-2", "bg-blue-500");
      expect(result).toBe("px-4 py-2 bg-blue-500");
    });

    it("handles conditional classes", () => {
      const isActive = true;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class active-class");
    });

    it("handles false conditional classes", () => {
      const isActive = false;
      const result = cn("base-class", isActive && "active-class");
      expect(result).toBe("base-class");
    });

    it("handles undefined and null values", () => {
      const result = cn("base-class", undefined, null, "another-class");
      expect(result).toBe("base-class another-class");
    });

    it("handles empty input", () => {
      const result = cn();
      expect(result).toBe("");
    });

    it("handles conflicting Tailwind classes", () => {
      // tailwind-merge should resolve conflicts
      const result = cn("px-4 px-6", "py-2 py-4");
      // Should keep the last conflicting class
      expect(result).toContain("px-6");
      expect(result).toContain("py-4");
      expect(result).not.toContain("px-4");
      expect(result).not.toContain("py-2");
    });
  });
});
