# PostgreSQL Deployment Guide

This guide will walk you through deploying RenoviBez with PostgreSQL, step by step.

## 🎯 Quick Start Options

Choose the option that best fits your needs:

### **Option A: Vercel Postgres (Recommended - Easiest)**
- ✅ Integrated with Vercel
- ✅ Auto-configured environment variables
- ✅ 256MB free tier
- ✅ Connection pooling included
- ⏱️ Setup time: 5 minutes

### **Option B: Neon (Great for Development)**
- ✅ Generous free tier (0.5GB storage)
- ✅ Serverless PostgreSQL
- ✅ Instant branching
- ✅ Auto-scaling
- ⏱️ Setup time: 3 minutes

### **Option C: Supabase (Feature-Rich)**
- ✅ 500MB free database
- ✅ Built-in auth (optional to use)
- ✅ Real-time subscriptions
- ✅ Storage and Edge functions
- ⏱️ Setup time: 5 minutes

### **Option D: Railway (Simple & Fast)**
- ✅ $5 free credit monthly
- ✅ Simple deployment
- ✅ Good for full-stack apps
- ⏱️ Setup time: 4 minutes

### **Option E: Local Docker (Development)**
- ✅ Full control
- ✅ No internet required
- ✅ Fast for local dev
- ⏱️ Setup time: 2 minutes

---

## 🚀 Deployment Steps

### **Step 1: Choose and Set Up PostgreSQL**

#### Option A: Vercel Postgres

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (or create new one)
3. Go to **Storage** tab
4. Click **Create Database** → Select **Postgres**
5. Choose a name (e.g., `renovibez-db`)
6. Click **Create**

Vercel will automatically set these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL`
- `POSTGRES_URL_NON_POOLING`

7. In your project settings, go to **Environment Variables** and add:
```
DATABASE_URL = [Copy from POSTGRES_PRISMA_URL]
DIRECT_URL = [Copy from POSTGRES_URL_NON_POOLING]
NEXTAUTH_SECRET = [Generate with: openssl rand -base64 32]
NEXTAUTH_URL = https://your-domain.vercel.app
NODE_ENV = production
```

#### Option B: Neon

1. Go to [Neon Console](https://console.neon.tech/)
2. Click **Create Project**
3. Choose a name: `renovibez`
4. Select region closest to your users
5. Click **Create Project**
6. Copy the connection string (it looks like):
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/renovibez?sslmode=require
   ```
7. Update `.env.local`:
   ```bash
   DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/renovibez?sslmode=require"
   DIRECT_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/renovibez?sslmode=require"
   ```

#### Option C: Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click **New Project**
3. Enter project details:
   - Name: `renovibez`
   - Database Password: (choose a strong password)
   - Region: Select closest to you
4. Wait for project to initialize (~2 minutes)
5. Go to **Settings** → **Database**
6. Find **Connection String** → **URI**
7. Copy connection string and update `.env.local`:
   ```bash
   DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres"
   ```

#### Option D: Railway

1. Go to [Railway](https://railway.app/)
2. Click **Start a New Project**
3. Select **Provision PostgreSQL**
4. Click on the PostgreSQL service
5. Go to **Connect** tab
6. Copy the **Postgres Connection URL**
7. Update `.env.local`:
   ```bash
   DATABASE_URL="postgresql://user:password@containers.railway.app:5432/railway"
   DIRECT_URL="postgresql://user:password@containers.railway.app:5432/railway"
   ```

#### Option E: Local Docker

```bash
# Start PostgreSQL container
docker run --name renovibez-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=renovibez \
  -p 5432:5432 \
  -d postgres:16

# Verify it's running
docker ps
```

Update `.env.local`:
```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/renovibez?schema=public"
DIRECT_URL="postgresql://postgres:password@localhost:5432/renovibez?schema=public"
```

---

### **Step 2: Update Local Environment**

1. Make sure `.env.local` has the correct DATABASE_URL from Step 1
2. Ensure you have other required variables:

```bash
# .env.local
DATABASE_URL="your-postgresql-connection-string"
DIRECT_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="b1djgGwIfzE9lFDPDkudeH/DX/yDC/T1A7Fg345Az6A="
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

---

### **Step 3: Push Schema to PostgreSQL**

```bash
# Install dependencies (if not already done)
npm install

# Push Prisma schema to PostgreSQL
npm run db:push

# You should see:
# ✅ Your database is now in sync with your Prisma schema
```

---

### **Step 4: Migrate Existing Data (Optional)**

If you have data in your SQLite database that you want to keep:

```bash
# Run the data migration script
npm run db:migrate:data

# This will copy all data from SQLite to PostgreSQL
```

**OR** seed fresh demo data:

```bash
# Seed demo data
npm run db:seed

# This creates demo users and contractors
```

---

### **Step 5: Test Local Setup**

```bash
# Start development server
npm run dev

# In another terminal, test health endpoint
curl http://localhost:3000/api/health

# You should see:
# {
#   "status": "healthy",
#   "database": {
#     "connected": true,
#     "latency": 45,
#     "version": "PostgreSQL 16.x..."
#   }
# }
```

**Test login with demo credentials:**
- Navigate to `http://localhost:3000`
- Login with:
  - Email: `jan@renovibez.nl`
  - Password: `demo123`

---

### **Step 6: Deploy to Vercel**

#### Configure Vercel Environment Variables

1. Go to Vercel Dashboard → Your Project → **Settings** → **Environment Variables**

2. Add the following variables for **Production**:

```bash
DATABASE_URL = [Your PostgreSQL connection string]
DIRECT_URL = [Your PostgreSQL connection string]
NEXTAUTH_SECRET = [Generate new: openssl rand -base64 32]
NEXTAUTH_URL = https://your-domain.vercel.app
NODE_ENV = production
```

**Important Notes:**
- If using Vercel Postgres, use `POSTGRES_PRISMA_URL` for DATABASE_URL
- If using Vercel Postgres, use `POSTGRES_URL_NON_POOLING` for DIRECT_URL
- Generate a NEW `NEXTAUTH_SECRET` for production (don't reuse dev secret)

#### Deploy

**Option 1: Deploy via Git (Recommended)**

```bash
# Commit migration script and changes
git add .
git commit -m "Add PostgreSQL migration and deployment setup"
git push origin main

# Vercel will auto-deploy
```

**Option 2: Deploy via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

---

### **Step 7: Run Migrations in Production**

After deploying, you need to set up the database schema in production:

**Option 1: Via Vercel Dashboard**

1. Go to your Vercel project
2. Navigate to **Deployments** → Select latest deployment
3. Click **...** → **Redeploy**
4. The `postinstall` script will run `prisma generate`

**Option 2: Via Vercel CLI**

```bash
# Pull production environment variables
vercel env pull .env.production

# Run migration (if you have migration files)
DATABASE_URL="your-prod-url" npx prisma migrate deploy

# OR push schema directly
DATABASE_URL="your-prod-url" npx prisma db push
```

---

### **Step 8: Seed Production Database**

```bash
# Connect to production database and seed
DATABASE_URL="your-prod-url" npm run db:seed

# This will create demo users in production
```

**Or migrate your existing data:**

```bash
# Set production DATABASE_URL temporarily
DATABASE_URL="your-prod-url" npm run db:migrate:data
```

---

### **Step 9: Verify Production Deployment**

1. **Test health endpoint:**
   ```bash
   curl https://your-domain.vercel.app/api/health
   ```

2. **Expected response:**
   ```json
   {
     "status": "healthy",
     "database": {
       "connected": true,
       "latency": 50,
       "version": "PostgreSQL 16.x..."
     },
     "environment": "production"
   }
   ```

3. **Test login:**
   - Go to `https://your-domain.vercel.app`
   - Try logging in with demo credentials

4. **Check Vercel logs:**
   - Go to Vercel Dashboard → Deployments → View Function Logs
   - Look for "✅ Database connected successfully"

---

## 🐛 Troubleshooting

### Connection Timeout

**Error:** `Connection timeout` or `ECONNREFUSED`

**Solution:**
1. Verify DATABASE_URL is correct
2. Check if database is accessible from Vercel (some providers require IP whitelisting)
3. Ensure `?sslmode=require` is in connection string for cloud databases

### SSL/TLS Errors

**Error:** `SSL connection required`

**Solution:**
Add `?sslmode=require` to your connection string:
```
postgresql://user:pass@host:5432/db?sslmode=require
```

### Schema Out of Sync

**Error:** `Database schema is not in sync`

**Solution:**
```bash
# Push schema again
npm run db:push

# Or create and deploy migration
npm run db:migrate
DATABASE_URL="prod-url" npx prisma migrate deploy
```

### Build Failed on Vercel

**Error:** `Prisma Client not found`

**Solution:**
Ensure `postinstall` script is in `package.json`:
```json
"postinstall": "prisma generate"
```

---

## 📊 Monitoring

### Set Up Uptime Monitoring

1. **Vercel Analytics** (Built-in)
   - Already enabled for all Vercel projects
   - View in Vercel Dashboard → Analytics

2. **Better Uptime** (Free tier available)
   - Go to [betteruptime.com](https://betteruptime.com)
   - Add monitor for: `https://your-domain.vercel.app/api/health`
   - Set check interval: 60 seconds

3. **UptimeRobot** (Free tier available)
   - Go to [uptimerobot.com](https://uptimerobot.com)
   - Create HTTP monitor
   - URL: `https://your-domain.vercel.app/api/health`
   - Interval: 5 minutes

---

## ✅ Post-Deployment Checklist

- [ ] PostgreSQL database is set up and accessible
- [ ] `.env.local` configured with correct DATABASE_URL
- [ ] Schema pushed to database (`npm run db:push`)
- [ ] Data migrated or seeded
- [ ] Local server runs without errors (`npm run dev`)
- [ ] Health endpoint returns "healthy" locally
- [ ] Vercel environment variables configured
- [ ] Deployed to Vercel successfully
- [ ] Production health endpoint returns "healthy"
- [ ] Can login with demo credentials in production
- [ ] Uptime monitoring configured (optional)

---

## 🎉 You're Done!

Your RenoviBez application is now running on PostgreSQL in production!

**Next Steps:**
- Set up monitoring (optional)
- Configure custom domain in Vercel (optional)
- Enable Vercel Analytics
- Review and update demo credentials
- Add your own contractors and templates

---

## 📚 Additional Resources

- [Prisma PostgreSQL Guide](https://www.prisma.io/docs/concepts/database-connectors/postgresql)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
- [Neon Documentation](https://neon.tech/docs)
- [Supabase Guides](https://supabase.com/docs/guides/database)
- [Railway Docs](https://docs.railway.app/databases/postgresql)

**Support:** Review `DATABASE_SETUP.md` for detailed troubleshooting.

---

**Last Updated:** October 2025
