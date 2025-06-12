import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from "../constants";

describe("Constants", () => {
  describe("Pagination constants", () => {
    it("has correct default values", () => {
      expect(DEFAULT_PAGE).toBe(1);
      expect(DEFAULT_PAGE_SIZE).toBe(10);
    });

    it("has correct min and max page sizes", () => {
      expect(MIN_PAGE_SIZE).toBe(1);
      expect(MAX_PAGE_SIZE).toBe(100);
    });

    it("has logical relationships between values", () => {
      expect(MIN_PAGE_SIZE).toBeLessThan(DEFAULT_PAGE_SIZE);
      expect(DEFAULT_PAGE_SIZE).toBeLessThan(MAX_PAGE_SIZE);
      expect(DEFAULT_PAGE).toBeGreaterThanOrEqual(MIN_PAGE_SIZE);
    });

    it("values are positive integers", () => {
      expect(DEFAULT_PAGE).toBeGreaterThan(0);
      expect(DEFAULT_PAGE_SIZE).toBeGreaterThan(0);
      expect(MIN_PAGE_SIZE).toBeGreaterThan(0);
      expect(MAX_PAGE_SIZE).toBeGreaterThan(0);

      expect(Number.isInteger(DEFAULT_PAGE)).toBe(true);
      expect(Number.isInteger(DEFAULT_PAGE_SIZE)).toBe(true);
      expect(Number.isInteger(MIN_PAGE_SIZE)).toBe(true);
      expect(Number.isInteger(MAX_PAGE_SIZE)).toBe(true);
    });
  });
});
