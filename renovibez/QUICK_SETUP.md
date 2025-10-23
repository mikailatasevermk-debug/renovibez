# Quick Setup Guide

Your Prisma Postgres database is configured! Now complete the setup on your local machine.

## ✅ What's Already Done

- ✅ Prisma Postgres database created on Vercel
- ✅ `.env.local` configured with connection strings
- ✅ Schema updated for PostgreSQL
- ✅ Migration scripts ready

## 🚀 Complete Setup (Run on Your Local Machine)

### Option 1: Automated Setup (Easiest)

```bash
# Make sure you're in the project directory
cd renovibez

# Run the setup script
./setup-database.sh
```

The script will:
1. Push schema to PostgreSQL
2. Ask if you want to migrate SQLite data or seed demo data
3. Test the database connection
4. Give you next steps

### Option 2: Manual Setup

```bash
# 1. Install dependencies (if needed)
npm install

# 2. Push schema to PostgreSQL
npm run db:push

# 3a. Migrate existing SQLite data
npm run db:migrate:data

# OR 3b. Seed fresh demo data
npm run db:seed

# 4. Start development server
npm run dev

# 5. Test health endpoint (in another terminal)
curl http://localhost:3000/api/health
```

## 🧪 Testing

After setup, test your database:

```bash
# Start dev server
npm run dev

# Test health endpoint
curl http://localhost:3000/api/health

# Expected response:
# {
#   "status": "healthy",
#   "database": {
#     "connected": true,
#     "latency": 50,
#     "version": "PostgreSQL 16.x..."
#   }
# }
```

**Login with demo credentials:**
- URL: http://localhost:3000
- Email: `jan@renovibez.nl`
- Password: `demo123`

## 🚢 Deploying to Production

Once local setup works, deploy to Vercel:

### 1. Add Environment Variables to Vercel

Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

Add these for **Production**:

```bash
DATABASE_URL = prisma+postgres://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RfaWQiOjEsInNlY3VyZV9rZXkiOiJza19kbUg4MXMwbHpvV2lEWm5sanBNM1giLCJhcGlfa2V5IjoiMDFLODkzOUtOSlRZR0I1OFI1R1IzMVhGQk4iLCJ0ZW5hbnRfaWQiOiIxMzZlNTc3ZjhiZmNmZWFlOWEyMTI1MWNjYzZiYmU3OGRhYzEzZWRjZmMxMDdkNGM2ZjE0MzkxMWI5YjdmZWU0IiwiaW50ZXJuYWxfc2VjcmV0IjoiN2Q1YjcyMzEtNTk5OS00Yjg2LTg3NGEtZDUwZWQwMjhjNGE2In0.iEXkTAFzUb2n_603qduhDJNxFvoEsCO1PP3U4u7QNwM

DIRECT_URL = postgres://136e577f8bfcfeae9a21251ccc6bbe78dac13edcfc107d4c6f143911b9b7fee4:sk_dmH81s0lzoWiDZnljpM3X@db.prisma.io:5432/postgres?sslmode=require

NEXTAUTH_SECRET = [Generate new: openssl rand -base64 32]

NEXTAUTH_URL = https://your-domain.vercel.app

NODE_ENV = production
```

**Important:** Generate a NEW `NEXTAUTH_SECRET` for production:
```bash
openssl rand -base64 32
```

### 2. Deploy

```bash
# Commit latest changes
git add .
git commit -m "Configure Prisma Postgres database"
git push origin main

# Vercel will auto-deploy
```

### 3. Verify Production

```bash
# Test production health endpoint
curl https://your-domain.vercel.app/api/health

# Should return:
# {"status": "healthy", "database": {"connected": true, ...}}
```

## 🐛 Troubleshooting

### "Connection timeout"
- Verify DATABASE_URL and DIRECT_URL are correct in `.env.local`
- Check internet connection

### "Schema not in sync"
- Run: `npm run db:push` again

### "Cannot find module '@prisma/client'"
- Run: `npm run db:generate`
- Or: `npm install`

### Migration script fails
- Make sure SQLite `prisma/dev.db` exists
- Or use `npm run db:seed` instead for demo data

## 📚 Additional Commands

```bash
npm run db:generate       # Generate Prisma Client
npm run db:push           # Push schema changes
npm run db:migrate        # Create migration
npm run db:migrate:data   # Migrate SQLite → PostgreSQL
npm run db:seed           # Seed demo data
npm run db:studio         # Open Prisma Studio (visual DB editor)
npm run db:reset          # Reset database (WARNING: deletes all data)
```

## ✅ Checklist

- [ ] Run `./setup-database.sh` or manual setup steps
- [ ] Database schema pushed successfully
- [ ] Data migrated or seeded
- [ ] Local dev server runs without errors
- [ ] Health endpoint returns "healthy"
- [ ] Can login with demo credentials
- [ ] Environment variables added to Vercel
- [ ] Deployed to production
- [ ] Production health endpoint works

## 🎉 You're Done!

Your app is now running on Prisma Postgres! Both locally and in production.

For detailed troubleshooting, see `DATABASE_SETUP.md` and `DEPLOYMENT_GUIDE.md`.
