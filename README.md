# 🤖 Temu.AI

**Temu.AI** adalah aplikasi AI Meeting Assistant yang memungkinkan Anda untuk mengadakan meeting dengan AI agents yang dapat berpartisipasi secara real-time, memberikan transcription otomatis, dan summary meeting yang intelligent.

## ✨ Fitur Utama

- 🤖 **AI Agents Management** - Buat dan kelola AI agents dengan instruksi khusus
- 📹 **Video Meetings** - Meeting berkualitas tinggi dengan integrasi AI real-time
- 📝 **Auto Transcription** - Otomatis transcribe percakapan meeting
- 📊 **AI Summary** - Summary meeting yang intelligent dan terstruktur
- 🔐 **Authentication** - Sistem auth yang aman dengan Better Auth
- 📱 **Responsive Design** - UI yang responsif untuk semua device

## 🛠 Tech Stack

### Frontend

- **Next.js 15** - React framework dengan App Router
- **React 19** - UI library terbaru
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **Shadcn/ui** - Beautiful UI components

### Backend

- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - TypeScript ORM
- **PostgreSQL** - Database (Neon)
- **Better Auth** - Authentication solution

### AI & Video

- **OpenAI GPT-4o** - AI model untuk agents
- **Inngest Agent Kit** - AI agent framework
- **Stream Video SDK** - Video calling infrastructure

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database (atau Neon account)
- OpenAI API key
- Stream Video API key

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

Edit `.env.local` dengan konfigurasi Anda (lihat [Environment Variables](#environment-variables))

4. **Setup database**

```bash
npm run db:push
```

5. **Run development server**

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## 🔧 Environment Variables

Buat file `.env.local` dengan variabel berikut:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/temuai"

# Authentication
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OpenAI
OPENAI_API_KEY="sk-your-openai-api-key"

# Stream Video
NEXT_PUBLIC_STREAM_VIDEO_API_KEY="your-stream-api-key"
STREAM_VIDEO_SECRET_KEY="your-stream-secret-key"

# Inngest (optional untuk development)
INNGEST_EVENT_KEY="your-inngest-event-key"
INNGEST_SIGNING_KEY="your-inngest-signing-key"
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Dashboard pages
│   ├── api/               # API routes
│   └── call/              # Video call pages
├── components/            # Reusable UI components
├── db/                    # Database schema & config
├── hooks/                 # Custom React hooks
├── inngest/               # Background job functions
├── lib/                   # Utility libraries
├── modules/               # Feature modules
│   ├── agents/           # AI agents management
│   ├── auth/             # Authentication
│   ├── call/             # Video calling
│   ├── dashboard/        # Dashboard UI
│   ├── home/             # Home page
│   └── meetings/         # Meetings management
└── trpc/                  # tRPC configuration
```

## 🎯 Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server
npm run lint            # Run ESLint

# Database
npm run db:push         # Push schema changes to database
npm run db:studio       # Open Drizzle Studio

# Development tools
npm run dev:webhook     # Start ngrok tunnel for webhooks
```

## 📚 API Documentation

### tRPC Endpoints

#### Agents

- `agents.getMany` - Get paginated list of agents
- `agents.getOne` - Get single agent by ID
- `agents.create` - Create new agent
- `agents.update` - Update existing agent
- `agents.delete` - Delete agent

#### Meetings

- `meetings.getMany` - Get paginated list of meetings
- `meetings.getOne` - Get single meeting by ID
- `meetings.create` - Create new meeting
- `meetings.update` - Update meeting
- `meetings.delete` - Delete meeting
- `meetings.generateToken` - Generate Stream Video token

### Webhook Endpoints

#### Stream Video Webhooks

- `POST /api/webhook` - Handle Stream Video events
  - `call.session_started` - Meeting started
  - `call.session_participant_left` - Participant left
  - `call.ended` - Meeting ended
  - `call.transcription_ready` - Transcription available
  - `call.recording_ready` - Recording available

## 🏗 Architecture

### Database Schema

```sql
-- Users & Authentication
users (id, name, email, image, created_at, updated_at)
sessions (id, user_id, token, expires_at, ...)
accounts (id, user_id, provider_id, access_token, ...)

-- Core Features
agents (id, user_id, name, instructions, created_at, updated_at)
meetings (id, user_id, agent_id, name, status, transcript_url, summary, ...)
```

### AI Processing Flow

1. **Meeting Creation** → Stream Video call setup
2. **Meeting Start** → AI agent joins via OpenAI Realtime API
3. **Real-time Interaction** → AI responds to participants
4. **Meeting End** → Transcript processing via Inngest
5. **Summary Generation** → AI summarizes meeting content

## 🚀 Deployment

### Vercel (Recommended)

1. **Deploy to Vercel**

```bash
npm i -g vercel
vercel
```

2. **Set environment variables** di Vercel dashboard

3. **Setup database** (Neon PostgreSQL recommended)

4. **Configure webhooks** dengan production URL

### Docker (Alternative)

```dockerfile
# Dockerfile sudah tersedia di repository
docker build -t temuai .
docker run -p 3000:3000 temuai
```

## 🧪 Testing

```bash
# Run tests (akan ditambahkan)
npm run test
npm run test:watch
npm run test:coverage
```

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

Jika Anda mengalami masalah atau memiliki pertanyaan:

- 📧 Email: inuldev0@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/inuldev/temuainul/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/inuldev/temuainul/discussions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [OpenAI](https://openai.com/) - AI capabilities
- [Stream](https://getstream.io/) - Video infrastructure
- [Vercel](https://vercel.com/) - Deployment platform
