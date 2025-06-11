# 📚 API Documentation

## Overview

TemuAinul menggunakan **tRPC** untuk type-safe API communication antara client dan server. Semua API endpoints adalah type-safe dan auto-generated.

## 🔧 tRPC Setup

### Client Usage

```typescript
import { trpc } from "@/trpc/client";

// Dalam React component
const { data, isLoading, error } = trpc.meetings.list.useQuery({
  page: 1,
  pageSize: 10,
});
```

### Server Procedures

```typescript
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";

export const meetingsRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ page: z.number(), pageSize: z.number() }))
    .query(async ({ input, ctx }) => {
      // Implementation
    }),
});
```

## 🤖 Agents API

### `agents.list`

List semua AI agents milik user

**Input:**

```typescript
{
  page?: number;        // Default: 1
  pageSize?: number;    // Default: 10
  search?: string;      // Optional search query
}
```

**Output:**

```typescript
{
  data: Agent[];
  meta: {
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }
}
```

### `agents.create`

Membuat AI agent baru

**Input:**

```typescript
{
  name: string; // Agent name (required)
  instructions: string; // AI instructions (required)
}
```

**Output:**

```typescript
{
  id: string;
  name: string;
  instructions: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### `agents.update`

Update AI agent yang sudah ada

**Input:**

```typescript
{
  id: string;           // Agent ID (required)
  name?: string;        // Optional
  instructions?: string; // Optional
}
```

### `agents.delete`

Hapus AI agent

**Input:**

```typescript
{
  id: string; // Agent ID (required)
}
```

## 📅 Meetings API

### `meetings.list`

List semua meetings dengan pagination dan filter

**Input:**

```typescript
{
  page?: number;        // Default: 1
  pageSize?: number;    // Default: 10
  search?: string;      // Search by name
  status?: MeetingStatus; // Filter by status
  agentId?: string;     // Filter by agent
}
```

**Output:**

```typescript
{
  data: Meeting[];
  meta: PaginationMeta;
}
```

### `meetings.create`

Membuat meeting baru

**Input:**

```typescript
{
  name: string; // Meeting name (required)
  agentId: string; // Agent ID (required)
}
```

**Output:**

```typescript
{
  id: string;
  name: string;
  agentId: string;
  status: "upcoming";
  // ... other fields
}
```

### `meetings.update`

Update meeting status atau data

**Input:**

```typescript
{
  id: string;           // Meeting ID (required)
  name?: string;
  status?: MeetingStatus;
  startedAt?: Date;
  endedAt?: Date;
}
```

### `meetings.delete`

Hapus meeting

**Input:**

```typescript
{
  id: string; // Meeting ID (required)
}
```

### `meetings.getById`

Get meeting detail by ID

**Input:**

```typescript
{
  id: string; // Meeting ID (required)
}
```

**Output:**

```typescript
{
  id: string;
  name: string;
  status: MeetingStatus;
  agent: Agent;
  transcriptUrl?: string;
  recordingUrl?: string;
  summary?: string;
  // ... other fields
}
```

## 🔐 Authentication

### Protected Procedures

Semua API endpoints (kecuali auth) memerlukan authentication:

```typescript
// Otomatis handled oleh protectedProcedure
const session = ctx.auth; // Available in all protected procedures
```

### Error Handling

```typescript
// Unauthorized access
throw new TRPCError({
  code: "UNAUTHORIZED",
  message: "Tidak terautentikasi",
});

// Not found
throw new TRPCError({
  code: "NOT_FOUND",
  message: "Meeting tidak ditemukan",
});

// Validation error
throw new TRPCError({
  code: "BAD_REQUEST",
  message: "Data tidak valid",
});
```

## 📊 Types

### Core Types

```typescript
// Agent
interface Agent {
  id: string;
  name: string;
  instructions: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Meeting
interface Meeting {
  id: string;
  name: string;
  userId: string;
  agentId: string;
  status: MeetingStatus;
  startedAt?: Date;
  endedAt?: Date;
  transcriptUrl?: string;
  recordingUrl?: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Meeting Status
type MeetingStatus =
  | "upcoming"
  | "active"
  | "completed"
  | "processing"
  | "cancelled";

// Pagination
interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
```

## 🔄 Real-time Updates

### Webhook Endpoints

#### `/api/webhook`

Handles Stream.io webhooks untuk real-time events:

**Events:**

- `call.session_started` - Meeting dimulai
- `call.session_ended` - Meeting selesai
- `call.transcription_ready` - Transkripsi siap
- `call.recording_ready` - Recording siap

**Processing:**

1. Validate webhook signature
2. Update meeting status
3. Trigger background jobs
4. Send real-time updates

### Background Jobs

#### Meeting Processing

```typescript
// Triggered after meeting ends
inngest.createFunction(
  { id: "meetings-processing" },
  { event: "meeting.ended" },
  async ({ event }) => {
    // 1. Process transcription
    // 2. Generate AI summary
    // 3. Update database
    // 4. Send notifications
  }
);
```

## 🚨 Error Codes

| Code                    | Description              | HTTP Status |
| ----------------------- | ------------------------ | ----------- |
| `UNAUTHORIZED`          | User not authenticated   | 401         |
| `FORBIDDEN`             | User tidak punya akses   | 403         |
| `NOT_FOUND`             | Resource tidak ditemukan | 404         |
| `BAD_REQUEST`           | Invalid input data       | 400         |
| `INTERNAL_SERVER_ERROR` | Server error             | 500         |
| `TOO_MANY_REQUESTS`     | Rate limit exceeded      | 429         |

## 📝 Usage Examples

### Create Meeting Flow

```typescript
// 1. Get available agents
const agents = await trpc.agents.list.query();

// 2. Create meeting
const meeting = await trpc.meetings.create.mutate({
  name: "Meeting dengan AI Assistant",
  agentId: agents.data[0].id,
});

// 3. Start video call
// (handled by Stream.io SDK)
```

### Real-time Meeting Updates

```typescript
// Subscribe to meeting updates
const { data: meeting } = trpc.meetings.getById.useQuery(
  { id: meetingId },
  {
    refetchInterval: 5000, // Poll every 5 seconds
    // Or use WebSocket subscription (future enhancement)
  }
);
```

---

Semua API endpoints adalah type-safe dan auto-completed di IDE berkat tRPC integration.
