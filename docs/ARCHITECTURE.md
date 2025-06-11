# 🏗️ Arsitektur TemuAinul

## Overview

TemuAinul dibangun dengan arsitektur modern yang scalable dan maintainable, menggunakan Next.js sebagai full-stack framework dengan integrasi AI dan real-time features.

## 🎯 Design Principles

1. **Modular Architecture** - Setiap fitur diorganisir dalam modul terpisah
2. **Type Safety** - TypeScript di seluruh codebase
3. **Separation of Concerns** - UI, business logic, dan data layer terpisah
4. **Real-time First** - Built untuk real-time interactions
5. **AI-Centric** - AI sebagai core feature, bukan add-on

## 📊 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   Server Side   │    │   External      │
│                 │    │                 │    │   Services      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ React Components│◄──►│ tRPC Procedures │◄──►│ OpenAI API      │
│ Stream.io SDK   │    │ Drizzle ORM     │    │ Stream.io       │
│ TanStack Query  │    │ Better Auth     │    │ Neon Database   │
│ Tailwind CSS    │    │ Inngest Jobs    │    │ Inngest Cloud   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🗂️ Folder Structure

### App Router Structure

```
src/app/
├── (auth)/              # Authentication pages
│   ├── sign-in/
│   └── sign-up/
├── (dashboard)/         # Protected dashboard pages
│   ├── page.tsx        # Home dashboard
│   ├── meetings/       # Meeting management
│   └── agents/         # Agent management
├── api/                # API routes
│   ├── auth/           # Auth endpoints
│   ├── trpc/           # tRPC handler
│   ├── webhook/        # Stream.io webhooks
│   └── inngest/        # Background jobs
└── call/               # Video call interface
```

### Modular Feature Structure

```
src/modules/
├── agents/
│   ├── hooks/          # React hooks
│   ├── server/         # tRPC procedures
│   ├── ui/            # UI components
│   │   ├── components/ # Feature components
│   │   └── views/     # Page views
│   ├── schemas.ts     # Zod schemas
│   └── types.ts       # TypeScript types
└── meetings/
    ├── hooks/
    ├── server/
    ├── ui/
    ├── schemas.ts
    └── types.ts
```

## 🔄 Data Flow

### 1. Client-Server Communication

```
Client Component
    ↓ (tRPC hook)
tRPC Procedure
    ↓ (Drizzle ORM)
Database
    ↓ (Response)
Client Component
```

### 2. Real-time Updates

```
Stream.io Event
    ↓ (Webhook)
API Route Handler
    ↓ (Inngest)
Background Job
    ↓ (Database Update)
Client Refresh
```

### 3. AI Integration Flow

```
User Input
    ↓ (Meeting Call)
Stream.io Transcription
    ↓ (Webhook)
OpenAI Processing
    ↓ (AI Response)
Stream.io Chat
    ↓ (Real-time)
User Interface
```

## 🔐 Authentication Flow

```
User Login
    ↓
Better Auth
    ↓
Session Creation
    ↓
Protected Route Access
    ↓
tRPC Context (with user)
```

## 🗄️ Database Design

### Entity Relationship

```
Users (1) ──── (N) Agents
  │
  └── (1) ──── (N) Meetings
                 │
                 └── (N) ──── (1) Agents
```

### Schema Overview

- **users**: User accounts dan profiles
- **sessions**: Authentication sessions
- **agents**: AI agent configurations
- **meetings**: Meeting data dan metadata

## 🚀 Performance Considerations

### Client-Side

- **React 19**: Concurrent features untuk better UX
- **TanStack Query**: Intelligent caching dan background updates
- **Code Splitting**: Automatic dengan Next.js App Router
- **Image Optimization**: Next.js built-in optimization

### Server-Side

- **tRPC**: Type-safe API dengan minimal overhead
- **Drizzle ORM**: Lightweight dengan excellent TypeScript support
- **Edge Runtime**: Untuk API routes yang membutuhkan low latency
- **Database Connection Pooling**: Neon serverless PostgreSQL

### Real-time Performance

- **Stream.io**: Enterprise-grade infrastructure
- **WebRTC**: Direct peer-to-peer untuk video calls
- **Webhook Processing**: Asynchronous dengan Inngest

## 🔧 Development Workflow

### 1. Feature Development

```
1. Define types (types.ts)
2. Create schemas (schemas.ts)
3. Build server procedures (server/)
4. Create UI components (ui/components/)
5. Build page views (ui/views/)
6. Add hooks if needed (hooks/)
```

### 2. Database Changes

```
1. Update schema.ts
2. Run `npm run db:push`
3. Update types dan procedures
4. Test dengan Drizzle Studio
```

### 3. API Integration

```
1. Add tRPC procedure
2. Update client hooks
3. Handle loading/error states
4. Add optimistic updates
```

## 🧪 Testing Strategy

### Unit Tests

- Components dengan React Testing Library
- Utility functions
- Schema validations

### Integration Tests

- tRPC procedures
- Database operations
- Authentication flows

### E2E Tests

- Critical user journeys
- Video call functionality
- AI agent interactions

## 🚀 Deployment Architecture

### Production Stack

```
Vercel (Frontend + API)
    ↓
Neon Database (PostgreSQL)
    ↓
Stream.io (Video/Chat)
    ↓
OpenAI API (AI Processing)
    ↓
Inngest Cloud (Background Jobs)
```

### Environment Separation

- **Development**: Local dengan ngrok untuk webhooks
- **Staging**: Preview deployments
- **Production**: Vercel production dengan monitoring

## 📈 Scalability Considerations

### Horizontal Scaling

- Serverless functions auto-scale
- Database connection pooling
- CDN untuk static assets

### Vertical Scaling

- Database query optimization
- Caching strategies
- Background job processing

### Monitoring

- Error tracking dengan Sentry
- Performance monitoring
- Database query analysis
- Real-time metrics

---

Arsitektur ini dirancang untuk mendukung pertumbuhan aplikasi sambil mempertahankan developer experience yang baik dan performance yang optimal.
