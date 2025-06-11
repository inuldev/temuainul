# 🚀 Deployment Guide

## Overview

TemuAinul dapat di-deploy ke berbagai platform. Guide ini fokus pada deployment ke **Vercel** sebagai platform utama.

## 🎯 Prerequisites

### Required Services

1. **Vercel Account** - Untuk hosting
2. **Neon Database** - PostgreSQL serverless
3. **Stream.io Account** - Video calling infrastructure
4. **OpenAI Account** - AI capabilities
5. **Inngest Account** - Background job processing

### Development Tools

- Node.js 18+
- Git
- Vercel CLI (optional)

## 🔧 Environment Setup

### 1. Database Setup (Neon)

1. **Create Neon Project**

   ```bash
   # Visit https://neon.tech
   # Create new project
   # Copy connection string
   ```

2. **Configure Database**
   ```env
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
   ```

### 2. Stream.io Setup

1. **Create Stream App**

   ```bash
   # Visit https://getstream.io
   # Create new app
   # Get API credentials
   ```

2. **Configure Stream.io**
   ```env
   STREAM_API_KEY="your-api-key"
   STREAM_API_SECRET="your-api-secret"
   ```

### 3. OpenAI Setup

1. **Get API Key**

   ```bash
   # Visit https://platform.openai.com
   # Create API key
   ```

2. **Configure OpenAI**
   ```env
   OPENAI_API_KEY="sk-your-api-key"
   ```

### 4. Inngest Setup

1. **Create Inngest Account**

   ```bash
   # Visit https://inngest.com
   # Create account and app
   ```

2. **Configure Inngest**
   ```env
   INNGEST_SIGNING_KEY="signkey-your-signing-key"
   INNGEST_EVENT_KEY="your-event-key"
   ```

## 🚀 Vercel Deployment

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Vercel**

   - Visit [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Configure project settings

3. **Environment Variables**
   Add di Vercel dashboard:

   ```env
   DATABASE_URL=postgresql://...
   BETTER_AUTH_SECRET=your-32-char-secret
   BETTER_AUTH_URL=https://your-domain.vercel.app
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_STREAM_VIDEO_API_KEY=your-stream-video-key
   STREAM_VIDEO_SECRET_KEY=your-stream-video-secret
   NEXT_PUBLIC_STREAM_CHAT_API_KEY=your-stream-chat-key
   STREAM_CHAT_SECRET_KEY=your-stream-chat-secret
   OPENAI_API_KEY=sk-proj-...
   INNGEST_EVENT_KEY=production
   INNGEST_SIGNING_KEY=signkey-...
   ```

4. **Deploy**
   - Vercel akan auto-deploy setiap push ke main branch

### Method 2: Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm i -g vercel
   ```

2. **Login dan Deploy**

   ```bash
   vercel login
   vercel --prod
   ```

3. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add OPENAI_API_KEY
   # ... add all required env vars
   ```

## 🗄️ Database Migration

### Initial Setup

```bash
# Push schema to production database
npm run db:push

# Verify with Drizzle Studio
npm run db:studio
```

### Schema Updates

```bash
# After schema changes
npm run db:push

# Or use migrations (recommended for production)
npx drizzle-kit generate:pg
npx drizzle-kit push:pg
```

## 🔗 Webhook Configuration

### Stream.io Webhooks

1. **Configure Webhook URL**

   ```
   https://your-domain.vercel.app/api/webhook
   ```

2. **Required Events**

   - `call.session_started`
   - `call.session_ended`
   - `call.transcription_ready`
   - `call.recording_ready`

3. **Webhook Security**
   - Enable signature verification
   - Use HTTPS only

### Inngest Webhooks

1. **Configure Inngest URL**

   ```
   https://your-domain.vercel.app/api/inngest
   ```

2. **Verify Connection**
   - Check Inngest dashboard
   - Test function execution

## 🔐 Security Configuration

### Environment Variables

```env
# Production values
NODE_ENV=production
BETTER_AUTH_SECRET=your-super-secure-32-char-secret
BETTER_AUTH_URL=https://your-domain.vercel.app

# API Keys (keep secure)
OPENAI_API_KEY=sk-...
STREAM_API_SECRET=...
INNGEST_SIGNING_KEY=signkey-...
```

### Domain Configuration

```typescript
// next.config.ts
const nextConfig = {
  allowedDevOrigins: ["your-domain.vercel.app", "*.vercel.app"],
};
```

## 📊 Monitoring Setup

### 1. Vercel Analytics

```bash
# Enable in Vercel dashboard
# Automatic performance monitoring
```

### 2. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs

# Configure in sentry.client.config.js
```

### 3. Database Monitoring

```bash
# Neon provides built-in monitoring
# Check connection pooling
# Monitor query performance
```

## 🧪 Testing Deployment

### Pre-deployment Checklist

- [ ] All environment variables set
- [ ] Database schema updated
- [ ] Webhooks configured
- [ ] SSL certificates valid
- [ ] Domain configured

### Post-deployment Testing

```bash
# Test API endpoints
curl https://your-domain.vercel.app/api/trpc/agents.list

# Test authentication
# Test video calling
# Test AI agent creation
# Test meeting flow
```

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test # if tests exist
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**

   ```bash
   # Check DATABASE_URL format
   # Verify Neon database is active
   # Check connection pooling limits
   ```

2. **Webhook Not Working**

   ```bash
   # Verify webhook URL is accessible
   # Check signature verification
   # Review webhook logs in Stream.io dashboard
   ```

3. **Build Errors**

   ```bash
   # Check TypeScript errors
   # Verify all dependencies installed
   # Check environment variables
   ```

4. **Performance Issues**
   ```bash
   # Enable Vercel Analytics
   # Check database query performance
   # Review bundle size
   ```

### Debug Commands

```bash
# Check deployment logs
vercel logs

# Check function logs
vercel logs --function=api/trpc

# Check build output
npm run build
```

## 📈 Scaling Considerations

### Vercel Limits

- Function execution time: 10s (Hobby), 60s (Pro)
- Memory: 1GB (Hobby), 3GB (Pro)
- Bandwidth: 100GB (Hobby), 1TB (Pro)

### Database Scaling

- Neon auto-scales connections
- Monitor connection pool usage
- Consider read replicas for heavy read workloads

### Background Jobs

- Inngest handles scaling automatically
- Monitor job execution times
- Consider job prioritization

---

Deployment berhasil! 🎉 Aplikasi TemuAinul siap digunakan di production.
