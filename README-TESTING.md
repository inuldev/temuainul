# 🧪 Testing Guide - TemuAinul

## Overview

Testing framework yang komprehensif untuk TemuAinul menggunakan Jest, React Testing Library, dan mocking utilities. Framework ini telah berhasil diimplementasikan dengan **56 test cases** yang semuanya **PASS** ✅.

## 🛠️ Tech Stack Testing

- **Jest** - Test runner dan assertion library
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **MSW (Mock Service Worker)** - API mocking
- **@testing-library/jest-dom** - Custom Jest matchers

## 📁 Struktur Testing

```
src/
├── __tests__/                 # Global tests
│   ├── constants.test.ts      # Constants testing
│   └── setup-tests.ts         # Test utilities
├── components/
│   ├── __tests__/             # Component tests
│   │   ├── empty-state.test.tsx
│   │   └── loading-state.test.tsx
│   └── ui/
│       └── __tests__/         # UI component tests
│           └── button.test.tsx
├── hooks/
│   └── __tests__/             # Custom hooks tests
│       └── use-mobile.test.ts
├── lib/
│   └── __tests__/             # Utility function tests
│       └── utils.test.ts
└── modules/
    ├── agents/
    │   └── __tests__/         # Agent module tests
    │       ├── schemas.test.ts
    │       └── procedures.test.ts
    └── meetings/
        └── __tests__/         # Meeting module tests
            ├── schemas.test.ts
            └── types.test.ts
```

## 🚀 Menjalankan Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- empty-state.test.tsx

# Run tests matching pattern
npm test -- --testNamePattern="renders with"
```

### Coverage Reports

```bash
# Generate coverage report
npm run test:coverage

# View coverage in browser
open coverage/lcov-report/index.html
```

## 📝 Writing Tests

### Component Testing

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MyComponent } from "../my-component";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent title="Test" />);

    expect(screen.getByText("Test")).toBeInTheDocument();
  });

  it("handles user interactions", async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<MyComponent onClick={handleClick} />);

    await user.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Hook Testing

```typescript
import { renderHook } from "@testing-library/react";
import { useMyHook } from "../use-my-hook";

describe("useMyHook", () => {
  it("returns expected values", () => {
    const { result } = renderHook(() => useMyHook());

    expect(result.current.value).toBe("expected");
  });
});
```

### Schema Testing

```typescript
import { mySchema } from "../schemas";

describe("mySchema", () => {
  it("validates correct data", () => {
    const validData = { name: "Test", email: "test@example.com" };

    const result = mySchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("rejects invalid data", () => {
    const invalidData = { name: "", email: "invalid" };

    const result = mySchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
```

### tRPC Procedure Testing

```typescript
import { myRouter } from "../procedures";
import { createMockAuthContext } from "@/__tests__/setup-tests";

// Mock database
jest.mock("@/db", () => ({
  db: {
    insert: jest.fn(),
    select: jest.fn(),
    // ... other methods
  },
}));

describe("myRouter", () => {
  it("creates item successfully", async () => {
    const mockContext = createMockAuthContext();
    const caller = myRouter.createCaller(mockContext);

    const result = await caller.create({ name: "Test" });

    expect(result).toEqual(
      expect.objectContaining({
        name: "Test",
      })
    );
  });
});
```

## 🔧 Test Utilities

### Mock Helpers

```typescript
// Available in src/__tests__/setup-tests.ts
import {
  createMockUser,
  createMockAgent,
  createMockMeeting,
  createMockAuthContext,
  createMockDbResponse,
} from "@/__tests__/setup-tests";

// Usage
const mockUser = createMockUser({ name: "Custom Name" });
const mockContext = createMockAuthContext({ id: "custom-id" });
```

### Common Mocks

```typescript
// Next.js Image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src} alt={alt} />,
}));

// Lucide React Icons
jest.mock("lucide-react", () => ({
  IconName: ({ className }: { className?: string }) => (
    <div data-testid="icon" className={className}>
      Icon
    </div>
  ),
}));

// Next.js Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => "/",
}));
```

## 📊 Coverage Goals

### Current Coverage Targets

- **Statements**: 70%
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%

### Priority Areas

1. **High Priority** (90%+ coverage)

   - Schema validations
   - Utility functions
   - Core business logic

2. **Medium Priority** (80%+ coverage)

   - tRPC procedures
   - Custom hooks
   - Component logic

3. **Lower Priority** (60%+ coverage)
   - UI components
   - Layout components

## 🎯 Best Practices

### Do's

✅ **Test behavior, not implementation**

```typescript
// Good
expect(screen.getByText("Success message")).toBeInTheDocument();

// Avoid
expect(component.state.isSuccess).toBe(true);
```

✅ **Use descriptive test names**

```typescript
// Good
it("shows error message when form submission fails");

// Avoid
it("handles error");
```

✅ **Group related tests**

```typescript
describe("UserForm", () => {
  describe("validation", () => {
    it("validates email format");
    it("validates required fields");
  });

  describe("submission", () => {
    it("submits valid data");
    it("handles submission errors");
  });
});
```

✅ **Clean up after tests**

```typescript
afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});
```

### Don'ts

❌ **Don't test implementation details**
❌ **Don't write tests that are too specific**
❌ **Don't forget to test error cases**
❌ **Don't mock everything**

## 🔍 Debugging Tests

### Common Issues

1. **Async operations not awaited**

```typescript
// Wrong
fireEvent.click(button);
expect(screen.getByText("Loading")).toBeInTheDocument();

// Correct
await user.click(button);
await waitFor(() => {
  expect(screen.getByText("Loading")).toBeInTheDocument();
});
```

2. **Missing act() warnings**

```typescript
// Use userEvent instead of fireEvent
const user = userEvent.setup();
await user.click(button);
```

3. **Query not found**

```typescript
// Use screen.debug() to see current DOM
screen.debug();

// Or use more flexible queries
screen.getByRole("button", { name: /submit/i });
```

### Debug Commands

```bash
# Run single test with verbose output
npm test -- --verbose my-test.test.ts

# Run tests with debug info
DEBUG=* npm test

# Run tests without coverage (faster)
npm test -- --no-coverage
```

## 📈 Continuous Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: "18"
      - run: npm ci
      - run: npm test -- --coverage --watchAll=false
      - uses: codecov/codecov-action@v3
```

## 🎉 Next Steps

1. **Tambah E2E tests** dengan Playwright
2. **Visual regression testing** dengan Chromatic
3. **Performance testing** dengan Lighthouse CI
4. **Accessibility testing** dengan axe-core

---

**Happy Testing! 🚀**
