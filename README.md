# 🤖 TemuAinul - AI Meeting Assistant

TemuAinul adalah platform AI meeting assistant yang memungkinkan pengguna untuk melakukan video call dengan AI agents yang dapat membantu dalam berbagai keperluan bisnis.

## ✨ Fitur Utama

- 🎥 **Video Calling dengan AI Agents** - Panggilan video real-time dengan AI assistant
- 💬 **Chat Integration** - Sistem chat terintegrasi dengan Stream.io
- 🤖 **Custom AI Agents** - Buat dan kelola AI agents dengan instruksi khusus
- 📝 **Meeting Transcription** - Transkripsi otomatis dari percakapan
- 📊 **Meeting Management** - Kelola jadwal dan riwayat meeting
- 🔐 **Authentication** - Sistem autentikasi yang aman dengan Better Auth
- 📱 **Responsive Design** - Tampilan yang optimal di semua perangkat

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework dengan App Router
- **React 19** - UI library terbaru
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI components

### Backend & Database

- **tRPC** - Type-safe API layer
- **Drizzle ORM** - Modern TypeScript ORM
- **Neon Database** - Serverless PostgreSQL
- **Better Auth** - Modern authentication solution

### AI & Real-time

- **OpenAI API** - AI conversation capabilities
- **Stream.io** - Video calling dan chat infrastructure
- **Inngest** - Background job processing

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Drizzle Kit** - Database migrations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm/yarn/pnpm
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone repository**

```bash
git clone https://github.com/inuldev/temuainul.git
cd temuainul
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
cp .env.example .env.local
```

Isi variabel environment yang diperlukan:

```env
# Database
DATABASE_URL="postgresql://..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Stream.io
STREAM_API_KEY="..."
STREAM_API_SECRET="..."

# Inngest
INNGEST_SIGNING_KEY="..."

# Auth
BETTER_AUTH_SECRET="..."
BETTER_AUTH_URL="http://localhost:3000"
```

4. **Setup database**

```bash
npm run db:push
```

5. **Run development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## 📁 Struktur Proyek

```
src/
├── app/                  # Next.js App Router
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Dashboard pages
│   ├── api/              # API routes
│   └── call/             # Video call pages
├── components/           # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── db/                   # Database configuration
│   ├── index.ts          # Database connection
│   └── schema.ts         # Database schema
├── hooks/                # Custom React hooks
├── inngest/              # Background job functions
├── lib/                  # Utility libraries
├── modules/              # Feature modules
│   ├── agents/           # AI agents management
│   ├── auth/             # Authentication
│   ├── call/             # Video calling
│   ├── dashboard/        # Dashboard components
│   ├── home/             # Home page
│   └── meetings/         # Meeting management
└── trpc/                 # tRPC configuration
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:push         # Push schema changes to database
npm run db:studio       # Open Drizzle Studio

# Webhook Development
npm run dev:webhook     # Start ngrok tunnel for webhooks
```

## 🏗️ Arsitektur

### Modular Architecture

Proyek ini menggunakan **modular architecture** dimana setiap fitur diorganisir dalam folder `modules/`:

```
modules/
├── agents/
│   ├── hooks/          # Custom hooks untuk agents
│   ├── server/         # tRPC procedures
│   ├── ui/            # UI components
│   ├── schemas.ts     # Zod validation schemas
│   └── types.ts       # TypeScript types
└── meetings/
    ├── hooks/         # Custom hooks untuk meetings
    ├── server/        # tRPC procedures
    ├── ui/           # UI components
    ├── schemas.ts    # Zod validation schemas
    └── types.ts      # TypeScript types
```

### Data Flow

1. **Client** → tRPC → **Server Procedures**
2. **Server** → Drizzle ORM → **Database**
3. **Webhooks** → Background Jobs → **Database Updates**
4. **Real-time** → Stream.io → **Client Updates**

## 🔐 Authentication

Menggunakan **Better Auth** dengan fitur:

- Email/Password authentication
- Session management
- Protected routes
- User profile management

### Protected Routes

```typescript
// Contoh penggunaan di page
const session = await auth.api.getSession({
  headers: await headers(),
});

if (!session) {
  redirect("/sign-in");
}
```

## 🗄️ Database Schema

### Core Tables

- **users** - Data pengguna
- **sessions** - Session management
- **agents** - AI agents configuration
- **meetings** - Meeting data dan status

### Meeting Status Flow

```
upcoming → active → completed/cancelled
                 ↓
              processing (background job)
```

## 🤖 AI Integration

### OpenAI Integration

- GPT-4 untuk conversation
- Custom instructions per agent
- Context-aware responses

### Stream.io Integration

- Video calling infrastructure
- Real-time chat
- Webhook events untuk automation

## 🔄 Background Jobs (Inngest)

### Meeting Processing

```typescript
// Otomatis dijalankan setelah meeting selesai
export const meetingsProcessing = inngest.createFunction(
  { id: "meetings-processing" },
  { event: "meeting.ended" },
  async ({ event, step }) => {
    // Process transcription
    // Generate summary
    // Update database
  }
);
```

## 🚀 Deployment

### Environment Setup

1. **Database**: Setup Neon PostgreSQL
2. **Stream.io**: Create app dan dapatkan API keys
3. **OpenAI**: Setup API key
4. **Inngest**: Setup untuk background jobs

### Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Webhook endpoints configured
- [ ] SSL certificates setup
- [ ] Monitoring tools installed

## 🧪 Testing (Recommended)

```bash
# Install testing dependencies
npm install -D @testing-library/react @testing-library/jest-dom jest

# Run tests
npm test
```

## 📚 API Documentation

### tRPC Endpoints

#### Agents

- `agents.list` - List all agents
- `agents.create` - Create new agent
- `agents.update` - Update agent
- `agents.delete` - Delete agent

#### Meetings

- `meetings.list` - List meetings with pagination
- `meetings.create` - Create new meeting
- `meetings.update` - Update meeting status
- `meetings.delete` - Delete meeting

## 🔧 Development Tips

### Hot Reload

Development server mendukung hot reload untuk:

- React components
- tRPC procedures
- Database schema changes

### Debugging

```bash
# Database debugging
npm run db:studio

# API debugging
console.log() di tRPC procedures

# Real-time debugging
Stream.io dashboard
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push ke branch
5. Create Pull Request

### Code Style

- Gunakan TypeScript
- Follow ESLint rules
- Gunakan Prettier untuk formatting
- Tulis tests untuk fitur baru

## 📄 License

[MIT License](LICENSE)

## 🆘 Support

Jika ada pertanyaan atau issue:

1. Check existing issues
2. Create new issue dengan detail lengkap
3. Sertakan steps to reproduce

---

**Happy Coding! 🚀**
