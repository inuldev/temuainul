import {
  cn,
  formatDuration,
  copyToClipboard,
  formatBytes,
  formatDate,
  formatRelativeTime,
  generateMeetingId,
  truncateText,
} from "../utils";

// Mock navigator.clipboard
const mockClipboard = {
  writeText: jest.fn(),
};
Object.assign(navigator, {
  clipboard: mockClipboard,
});

// Mock window.isSecureContext
Object.defineProperty(window, "isSecureContext", {
  writable: true,
  value: true,
});

describe("utils", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
    });

    it("should handle conditional classes", () => {
      expect(cn("base-class", true && "conditional-class")).toBe(
        "base-class conditional-class"
      );
      expect(cn("base-class", false && "conditional-class")).toBe("base-class");
    });

    it("should handle undefined and null values", () => {
      expect(cn("base-class", undefined, null)).toBe("base-class");
    });

    it("should handle arrays", () => {
      expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
    });
  });

  describe("formatDuration", () => {
    it("should format seconds correctly", () => {
      expect(formatDuration(30)).toBe("30 seconds");
      expect(formatDuration(60)).toBe("1 minute");
      expect(formatDuration(90)).toBe("2 minutes");
    });

    it("should format minutes correctly", () => {
      expect(formatDuration(120)).toBe("2 minutes");
      expect(formatDuration(3600)).toBe("1 hour");
    });

    it("should format hours correctly", () => {
      expect(formatDuration(7200)).toBe("2 hours");
    });

    it("should handle zero duration", () => {
      expect(formatDuration(0)).toBe("0 seconds");
    });

    it("should round durations", () => {
      expect(formatDuration(65)).toBe("1 minute");
      expect(formatDuration(125)).toBe("2 minutes");
    });
  });

  describe("copyToClipboard", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Suppress console.error for these tests
      jest.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should copy text using navigator.clipboard", async () => {
      mockClipboard.writeText.mockResolvedValue(undefined);

      const result = await copyToClipboard("test text");

      expect(result).toBe(true);
      expect(mockClipboard.writeText).toHaveBeenCalledWith("test text");
    });

    it("should handle clipboard API failure", async () => {
      mockClipboard.writeText.mockRejectedValue(new Error("Clipboard failed"));

      const result = await copyToClipboard("test text");

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });
  });

  describe("formatBytes", () => {
    it("should format bytes correctly", () => {
      expect(formatBytes(0)).toBe("0 Bytes");
      expect(formatBytes(1024)).toBe("1 KB");
      expect(formatBytes(1048576)).toBe("1 MB");
      expect(formatBytes(1073741824)).toBe("1 GB");
    });

    it("should handle decimals", () => {
      expect(formatBytes(1536, 1)).toBe("1.5 KB");
      expect(formatBytes(1536, 0)).toBe("2 KB");
    });
  });

  describe("formatDate", () => {
    it("should format date with default options", () => {
      const date = new Date("2024-01-15T10:30:00");
      const formatted = formatDate(date);

      expect(formatted).toContain("15");
      expect(formatted).toContain("Januari");
      expect(formatted).toContain("2024");
    });

    it("should format date string", () => {
      const formatted = formatDate("2024-01-15T10:30:00");

      expect(formatted).toContain("15");
      expect(formatted).toContain("Januari");
    });
  });

  describe("formatRelativeTime", () => {
    it('should return "Baru saja" for recent times', () => {
      const now = new Date();
      const recent = new Date(now.getTime() - 30000); // 30 seconds ago

      expect(formatRelativeTime(recent)).toBe("Baru saja");
    });

    it("should return minutes for times within an hour", () => {
      const now = new Date();
      const minutes = new Date(now.getTime() - 300000); // 5 minutes ago

      expect(formatRelativeTime(minutes)).toBe("5 menit yang lalu");
    });
  });

  describe("generateMeetingId", () => {
    it("should generate a string", () => {
      const id = generateMeetingId();

      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
    });

    it("should generate unique IDs", () => {
      const id1 = generateMeetingId();
      const id2 = generateMeetingId();

      expect(id1).not.toBe(id2);
    });
  });

  describe("truncateText", () => {
    it("should not truncate short text", () => {
      expect(truncateText("short", 10)).toBe("short");
    });

    it("should truncate long text", () => {
      expect(truncateText("this is a very long text", 10)).toBe(
        "this is a ..."
      );
    });

    it("should handle exact length", () => {
      expect(truncateText("exactly10!", 10)).toBe("exactly10!");
    });
  });
});
