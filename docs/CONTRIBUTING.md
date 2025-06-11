# 🤝 Contributing Guide

## Welcome!

Terima kasih atas minat Anda untuk berkontribusi pada TemuAinul! Guide ini akan membantu Anda memulai kontribusi dengan mudah.

## 🎯 Code of Conduct

- Bersikap profesional dan respectful
- Gunakan bahasa yang inclusive
- Fokus pada constructive feedback
- Help others learn dan grow

## 🚀 Getting Started

### 1. Fork Repository

```bash
# Fork di GitHub UI
# Clone your fork
git clone https://github.com/inuldev/temuainul.git
cd temuainul
```

### 2. Setup Development Environment

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Setup database
npm run db:push

# Start development server
npm run dev
```

### 3. Create Feature Branch

```bash
# Create branch dari main
git checkout -b feature/your-feature-name

# Atau untuk bug fix
git checkout -b fix/bug-description
```

## 📝 Development Workflow

### 1. Code Style

**TypeScript First**

```typescript
// ✅ Good - Type everything
interface CreateMeetingProps {
  name: string;
  agentId: string;
}

// ❌ Bad - Avoid any
function createMeeting(data: any) {}
```

**Functional Components**

```typescript
// ✅ Good - Functional component
const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
  return <div>{meeting.name}</div>;
};

// ❌ Bad - Class component (avoid unless necessary)
class MeetingCard extends Component {}
```

**Consistent Naming**

```typescript
// ✅ Good - Consistent naming
const useMeetings = () => {};
const MeetingsList = () => {};
const meetingsRouter = createTRPCRouter({});

// ❌ Bad - Inconsistent
const getMeetings = () => {};
const meeting_list = () => {};
```

### 2. File Organization

**Module Structure**

```
src/modules/feature-name/
├── hooks/              # Custom hooks
├── server/            # tRPC procedures
├── ui/
│   ├── components/    # Feature components
│   └── views/        # Page views
├── schemas.ts        # Zod validation
└── types.ts          # TypeScript types
```

**Component Structure**

```typescript
// Component file structure
import { ... } from "react";
import { ... } from "external-libs";
import { ... } from "@/lib/...";
import { ... } from "./local-imports";

// Types
interface ComponentProps {
  // ...
}

// Component
export const Component = ({ }: ComponentProps) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
};
```

### 3. Commit Convention

Gunakan **Conventional Commits**:

```bash
# Features
git commit -m "feat: add meeting transcription feature"

# Bug fixes
git commit -m "fix: resolve video call connection issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: improve meeting status handling"

# Tests
git commit -m "test: add unit tests for agents module"

# Chores
git commit -m "chore: update dependencies"
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- MeetingCard.test.tsx
```

### Writing Tests

**Component Tests**

```typescript
import { render, screen } from "@testing-library/react";
import { MeetingCard } from "./MeetingCard";

describe("MeetingCard", () => {
  it("should display meeting name", () => {
    const meeting = { id: "1", name: "Test Meeting" };
    render(<MeetingCard meeting={meeting} />);

    expect(screen.getByText("Test Meeting")).toBeInTheDocument();
  });
});
```

**API Tests**

```typescript
import { createTRPCMsw } from "msw-trpc";
import { appRouter } from "@/trpc/routers/_app";

const trpcMsw = createTRPCMsw(appRouter);

// Mock API responses
const handlers = [
  trpcMsw.meetings.list.query(() => {
    return { data: [], meta: { total: 0 } };
  }),
];
```

## 🔍 Code Review Process

### Before Submitting PR

**Self Review Checklist**

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No console.log statements
- [ ] Documentation updated if needed
- [ ] Environment variables documented

**Testing Checklist**

- [ ] Feature works as expected
- [ ] Edge cases handled
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Responsive design tested

### PR Guidelines

**PR Title**

```
feat: add real-time meeting notifications

fix: resolve authentication redirect loop

docs: update deployment guide
```

**PR Description Template**

```markdown
## What

Brief description of changes

## Why

Reason for the change

## How

Technical approach used

## Testing

- [ ] Unit tests added/updated
- [ ] Manual testing completed
- [ ] Edge cases tested

## Screenshots

(if UI changes)

## Breaking Changes

(if any)
```

## 🐛 Bug Reports

### Bug Report Template

```markdown
## Bug Description

Clear description of the bug

## Steps to Reproduce

1. Go to...
2. Click on...
3. See error

## Expected Behavior

What should happen

## Actual Behavior

What actually happens

## Environment

- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Node.js: [e.g. 18.17.0]

## Additional Context

Screenshots, logs, etc.
```

## 💡 Feature Requests

### Feature Request Template

```markdown
## Feature Description

Clear description of the feature

## Problem Statement

What problem does this solve?

## Proposed Solution

How should it work?

## Alternatives Considered

Other approaches considered

## Additional Context

Mockups, examples, etc.
```

## 📚 Documentation

### Documentation Standards

- Write in Indonesian untuk user-facing docs
- Use English untuk technical/code docs
- Include code examples
- Keep it up-to-date
- Use clear headings dan structure

### Types of Documentation

- **README.md** - Project overview
- **API.md** - API documentation
- **ARCHITECTURE.md** - Technical architecture
- **DEPLOYMENT.md** - Deployment guide
- **Code comments** - Inline documentation

## 🏷️ Release Process

### Version Numbering

Follow **Semantic Versioning**:

- `MAJOR.MINOR.PATCH`
- `1.0.0` → `1.0.1` (patch)
- `1.0.1` → `1.1.0` (minor)
- `1.1.0` → `2.0.0` (major)

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] CHANGELOG.md updated
- [ ] Version bumped
- [ ] Tagged in git
- [ ] Deployed to staging
- [ ] Deployed to production

## 🎉 Recognition

Contributors akan diakui di:

- README.md contributors section
- Release notes
- Project documentation

## 📞 Getting Help

**Stuck? Need help?**

- Create GitHub issue
- Ask in discussions
- Review existing documentation
- Check similar implementations

**Response Time**

- Bug reports: 24-48 hours
- Feature requests: 1 week
- Pull requests: 2-3 days

---

Happy contributing! 🚀 Setiap kontribusi, sekecil apapun, sangat dihargai!
