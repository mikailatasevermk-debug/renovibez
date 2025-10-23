# Database Setup Guide

This guide covers setting up PostgreSQL for the RenoviBez application in both local development and production environments.

## Table of Contents

1. [Overview](#overview)
2. [Local Development Setup](#local-development-setup)
3. [Production Setup (Vercel)](#production-setup-vercel)
4. [Database Migrations](#database-migrations)
5. [Seeding Data](#seeding-data)
6. [Health Checks](#health-checks)
7. [Troubleshooting](#troubleshooting)

---

## Overview

**Database System**: PostgreSQL
**ORM**: Prisma 6.14.0
**Schema Location**: `prisma/schema.prisma`

The application uses PostgreSQL for robust, production-ready database management with:
- Connection pooling
- Transaction support
- Advanced query capabilities
- Scalability for multiple serverless instances

---

## Local Development Setup

### Option 1: Install PostgreSQL Locally

#### macOS (using Homebrew)
```bash
# Install PostgreSQL
brew install postgresql@16

# Start PostgreSQL service
brew services start postgresql@16

# Create database
createdb renovibez
```

#### Linux (Ubuntu/Debian)
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create user and database
sudo -u postgres psql
postgres=# CREATE DATABASE renovibez;
postgres=# CREATE USER renovibez_user WITH PASSWORD 'your_password';
postgres=# GRANT ALL PRIVILEGES ON DATABASE renovibez TO renovibez_user;
postgres=# \q
```

#### Windows
1. Download PostgreSQL installer from https://www.postgresql.org/download/windows/
2. Run installer and follow setup wizard
3. Note the password you set for the `postgres` user
4. Use pgAdmin to create a database named `renovibez`

### Option 2: Use Docker

```bash
# Run PostgreSQL in Docker
docker run --name renovibez-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=renovibez \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

### Option 3: Use Cloud Database Providers

Popular options for development:
- **Neon** (https://neon.tech) - Free tier with generous limits
- **Supabase** (https://supabase.com) - Free PostgreSQL with additional features
- **Railway** (https://railway.app) - Simple deployment with free tier
- **ElephantSQL** (https://elephantsql.com) - Managed PostgreSQL

### Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your database credentials:
```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/renovibez?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/renovibez?schema=public"
NEXTAUTH_SECRET="b1djgGwIfzE9lFDPDkudeH/DX/yDC/T1A7Fg345Az6A="
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

3. Install dependencies:
```bash
npm install
```

4. Generate Prisma Client:
```bash
npm run db:generate
```

5. Push schema to database:
```bash
npm run db:push
```

6. Seed the database with demo data:
```bash
npm run db:seed
```

7. Start the development server:
```bash
npm run dev
```

---

## Production Setup (Vercel)

### Option 1: Vercel Postgres (Recommended)

1. Go to your Vercel project dashboard
2. Navigate to **Storage** tab
3. Click **Create Database** → **Postgres**
4. Follow the setup wizard
5. Vercel will automatically add these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`

6. In your Vercel project settings, add:
```env
DATABASE_URL=$POSTGRES_PRISMA_URL
DIRECT_URL=$POSTGRES_URL_NON_POOLING
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

7. Deploy your application:
```bash
git push origin main
```

8. Run migrations in Vercel:
   - Go to **Deployments** → Select latest deployment
   - Click **...** → **View Function Logs**
   - Or use Vercel CLI:
   ```bash
   vercel env pull .env.production
   npx prisma migrate deploy
   ```

### Option 2: External PostgreSQL Provider

Popular production options:
- **Neon** - Serverless PostgreSQL with auto-scaling
- **Supabase** - PostgreSQL with real-time features
- **Railway** - Simple deployment platform
- **AWS RDS** - Enterprise-grade managed PostgreSQL
- **Google Cloud SQL** - Fully managed PostgreSQL

1. Create a PostgreSQL database with your chosen provider
2. Copy the connection string
3. Add to Vercel environment variables:
```env
DATABASE_URL=<your-connection-string>
DIRECT_URL=<your-connection-string>
NEXTAUTH_SECRET=<generate-secure-key>
NEXTAUTH_URL=https://your-domain.vercel.app
NODE_ENV=production
```

---

## Database Migrations

### Available Commands

```bash
# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes (development only - no migration history)
npm run db:push

# Create a new migration
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:deploy

# Reset database (WARNING: deletes all data)
npm run db:reset

# Open Prisma Studio (visual database editor)
npm run db:studio
```

### Creating Migrations

1. Modify `prisma/schema.prisma`
2. Run migration:
```bash
npm run db:migrate
```
3. Enter a descriptive name (e.g., "add_user_roles")
4. Commit migration files to git

### Applying Migrations in Production

**Important**: Always test migrations locally first!

```bash
# Deploy migrations
npm run db:migrate:deploy
```

For Vercel deployments, migrations should run automatically via the build command in `package.json`.

---

## Seeding Data

The seed file (`prisma/seed.ts`) creates demo data:
- 2 consumer users
- 2 contractor users
- 6 contractors in Overijssel region
- 6 renovation templates

### Demo Credentials

**Consumers:**
- Email: `jan@renovibez.nl` | Password: `demo123`
- Email: `maria@renovibez.nl` | Password: `demo123`

**Contractors:**
- Email: `piet@renovatiepro.nl` | Password: `demo123`
- Email: `kees@devakman.nl` | Password: `demo123`

### Run Seed Script

```bash
npm run db:seed
```

---

## Health Checks

### Database Health Endpoint

Check database connectivity at any time:

```bash
# Local
curl http://localhost:3000/api/health

# Production
curl https://your-domain.vercel.app/api/health
```

**Response (Healthy):**
```json
{
  "status": "healthy",
  "database": {
    "connected": true,
    "latency": 45,
    "version": "PostgreSQL 16.3..."
  },
  "timestamp": "2025-10-23T...",
  "environment": "production"
}
```

**Response (Unhealthy):**
```json
{
  "status": "unhealthy",
  "database": {
    "connected": false,
    "error": "Connection timeout"
  },
  "timestamp": "2025-10-23T...",
  "environment": "production"
}
```

### Monitoring

Add uptime monitoring:
- **Vercel**: Use Vercel's built-in monitoring
- **Better Uptime**: https://betteruptime.com
- **UptimeRobot**: https://uptimerobot.com
- **Pingdom**: https://pingdom.com

---

## Troubleshooting

### Connection Refused

**Error**: `ECONNREFUSED` or `Connection refused`

**Solutions**:
1. Verify PostgreSQL is running:
   ```bash
   # macOS
   brew services list | grep postgresql

   # Linux
   sudo systemctl status postgresql

   # Docker
   docker ps | grep postgres
   ```

2. Check DATABASE_URL format:
   ```
   postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA
   ```

3. Verify port (default: 5432):
   ```bash
   # Check if port is listening
   netstat -an | grep 5432
   ```

### Authentication Failed

**Error**: `password authentication failed`

**Solutions**:
1. Verify credentials in `.env.local`
2. Reset PostgreSQL password:
   ```bash
   sudo -u postgres psql
   postgres=# ALTER USER postgres PASSWORD 'new_password';
   ```

3. Check `pg_hba.conf` authentication method

### Schema Out of Sync

**Error**: `Database schema is not in sync`

**Solutions**:
```bash
# Development: push schema changes
npm run db:push

# Production: run migrations
npm run db:migrate:deploy

# Nuclear option (loses data)
npm run db:reset
```

### SSL/TLS Errors

**Error**: `SSL connection error`

**Solutions**:
1. For local development, add `?sslmode=disable`:
   ```
   DATABASE_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"
   ```

2. For production with SSL:
   ```
   DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
   ```

### Connection Pool Exhausted

**Error**: `Prepared statement already exists`

**Solutions**:
1. Increase connection limit in Prisma schema:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```

2. Use connection pooling (Vercel Postgres handles this automatically)

### Vercel Build Errors

**Error**: `Prisma Client not found`

**Solution**: Ensure `postinstall` script runs:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

---

## Additional Resources

- **Prisma Documentation**: https://www.prisma.io/docs
- **PostgreSQL Documentation**: https://www.postgresql.org/docs/
- **Vercel Postgres Docs**: https://vercel.com/docs/storage/vercel-postgres
- **NextAuth Prisma Adapter**: https://next-auth.js.org/adapters/prisma

---

## Support

For issues or questions:
1. Check the [Troubleshooting](#troubleshooting) section
2. Review application logs in Vercel dashboard
3. Test database connectivity with `/api/health`
4. Check Prisma Client logs (enable with `log: ['query', 'error']`)

---

**Last Updated**: October 2025
**Database Version**: PostgreSQL 16+
**Prisma Version**: 6.14.0
