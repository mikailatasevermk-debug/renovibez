# 🗄️ RenoviBez Database Management Guide

Complete guide for managing your PostgreSQL database efficiently using cloud tools, local tools, and AI assistance.

---

## 📋 Table of Contents

1. [Database Access Methods](#database-access-methods)
2. [Cloud Database Management](#cloud-database-management)
3. [Local Database Management](#local-database-management)
4. [How User Registration Works](#how-user-registration-works)
5. [Managing Data with Claude Code](#managing-data-with-claude-code)
6. [Manual Data Management](#manual-data-management)
7. [Best Practices & Workflows](#best-practices--workflows)
8. [Common Tasks & Examples](#common-tasks--examples)

---

## 1. Database Access Methods

You have **3 ways** to access and manage your database:

### ✅ Option 1: Prisma Studio (Local) - **EASIEST**
- **URL:** http://localhost:5555
- **Command:** `npm run db:studio`
- **Pros:** Beautiful UI, easy to use, real-time updates
- **Cons:** Must be running locally, requires terminal

### ✅ Option 2: Prisma Data Platform (Cloud) - **RECOMMENDED**
- **URL:** https://console.prisma.io
- **Pros:** Access from anywhere, no local setup needed, team collaboration
- **Cons:** Requires Prisma account
- **Setup:** See section below

### ✅ Option 3: Direct PostgreSQL Clients
- **Tools:** TablePlus, pgAdmin, DBeaver, Postico
- **Pros:** Advanced features, SQL queries
- **Cons:** More complex, requires connection string

---

## 2. Cloud Database Management

### 🌐 Access Your Database from Anywhere

#### A. Prisma Data Platform (Recommended)

**Setup (One-time):**

1. **Create Prisma Account:**
   - Visit: https://console.prisma.io
   - Sign up with your email or GitHub

2. **Connect Your Database:**
   - Click "New Project"
   - Select "Import existing project"
   - Enter your database connection string (from `.env.local`)
   - Your connection string:
   ```
   postgres://136e577f8bfcfeae9a21251ccc6bbe78dac13edcfc107d4c6f143911b9b7fee4:sk_dmH81s0lzoWiDZnljpM3X@db.prisma.io:5432/postgres?sslmode=require
   ```

3. **Features You Get:**
   - 🔍 Query browser
   - 📊 Visual data editor
   - 📈 Performance monitoring
   - 🔔 Query insights
   - 👥 Team collaboration

#### B. Vercel Postgres Dashboard

**Access:**
- Visit: https://vercel.com/dashboard
- Go to Storage → Your Postgres Database
- Click "Browse Data"

**Features:**
- View all tables
- Run SQL queries
- Monitor usage
- See connection info

---

## 3. Local Database Management

### 💻 Working Locally

#### Prisma Studio (Your Current Setup)

**Start Prisma Studio:**
```bash
cd renovibez
npm run db:studio
```

**Access:** http://localhost:5555

**What You Can Do:**
- ✅ View all tables
- ✅ Add/edit/delete records
- ✅ Filter and search
- ✅ Navigate relationships
- ✅ Export data

**Stop Prisma Studio:**
- Press `Ctrl + C` in terminal

---

## 4. How User Registration Works

### 🔐 Automatic User Creation - **YES, IT'S AUTOMATIC!**

**When someone registers on your site:**

1. **User Fills Registration Form:**
   - Email
   - Password
   - Name
   - Role (Consumer or Contractor)

2. **Your App Automatically:**
   - ✅ Creates User in database
   - ✅ Hashes password with bcrypt
   - ✅ Sets role (CONSUMER or CONTRACTOR)
   - ✅ Creates timestamp (createdAt, updatedAt)
   - ✅ Stores in PostgreSQL

3. **If Contractor Registration:**
   - ✅ Creates User
   - ✅ Creates linked Contractor profile
   - ✅ Sets company name, specialties, city
   - ✅ Links User and Contractor records

**You don't need to manually create users!** The app handles it automatically.

### Where to See New Users

**In Prisma Studio:**
```bash
npm run db:studio
# Open http://localhost:5555
# Click "User" → See all registered users
```

**In Vercel Postgres Dashboard:**
- Go to Vercel → Storage → Browse Data → User table

---

## 5. Managing Data with Claude Code

### 🤖 AI-Assisted Database Management

You can ask me (Claude Code) to help you:

#### A. Add New Data

**Example 1: Add a New Contractor**
```
You: "Add a new contractor named 'De Bouwmeesters' in Utrecht specializing in kitchen and bathroom renovations"

I will:
1. Create a Prisma script
2. Add the contractor to database
3. Verify it was added successfully
```

**Example 2: Add New Renovation Template**
```
You: "Create a new renovation project template for 'Zoldervebouwing' (attic conversion) with average price €25,000"

I will:
1. Create the template
2. Set categories and details
3. Add to database
```

#### B. Update Existing Data

**Example:**
```
You: "Update contractor 'Renovatie Pro Zwolle' rating to 4.8 stars"

I will:
1. Find the contractor
2. Update the rating
3. Confirm the change
```

#### C. Query and Analyze Data

**Example:**
```
You: "Show me all contractors in Amsterdam with rating above 4.5"

I will:
1. Write Prisma query
2. Execute it
3. Show formatted results
```

#### D. Bulk Operations

**Example:**
```
You: "Import 10 new contractors from this list..."

I will:
1. Create migration script
2. Add all contractors
3. Verify data integrity
```

### 🎯 How to Work with Me

**Best Practices:**

1. **Be Specific:**
   ❌ "Add a contractor"
   ✅ "Add contractor 'Bouwbedrijf Jansen' in Amsterdam, specializing in kitchens and bathrooms, with rating 4.5"

2. **Use Natural Language:**
   - "Create a new user account for testing"
   - "Delete all matches that are cancelled"
   - "Update all kitchen projects to increase price by 10%"

3. **I Can Create Scripts:**
   - One-time data additions
   - Bulk imports
   - Database migrations
   - Seed data updates

4. **I Can Help Debug:**
   - "Why isn't this user showing up?"
   - "Check if contractor X has any matches"
   - "Find all messages from user Y"

---

## 6. Manual Data Management

### 🖱️ Using Prisma Studio Manually

#### Add a New User (Consumer)

1. Open Prisma Studio: http://localhost:5555
2. Click **"User"** in sidebar
3. Click **"Add record"** button
4. Fill in:
   ```
   email: test@example.com
   name: Test User
   role: CONSUMER
   passwordHash: (use bcrypt hash - see below)
   ```
5. Click **"Save 1 change"**

**Generate Password Hash:**
```bash
# Ask me: "Generate bcrypt hash for password 'test123'"
# I'll create a script to generate it
```

#### Add a New Contractor

1. First create the **User** (see above) with `role: CONTRACTOR`
2. Copy the User's ID
3. Click **"Contractor"** in sidebar
4. Click **"Add record"**
5. Fill in:
   ```
   userId: (paste the User ID)
   companyName: My Company
   city: Amsterdam
   specialties: ["kitchen", "bathroom"]
   rating: 4.5
   reviewCount: 10
   verified: true
   ```
6. Click **"Save 1 change"**

#### Add a Renovation Template

1. Click **"RenovationTemplate"** in sidebar
2. Click **"Add record"**
3. Fill in:
   ```
   slug: my-project
   title: My Project Title
   summary: Project description
   categories: ["kitchen", "modern"]
   avgPrice: 15000
   duration: "2-3 weeks"
   active: true
   ```
4. Click **"Save 1 change"**

---

## 7. Best Practices & Workflows

### 🎯 Recommended Workflow

#### For Daily Operations

**Option A: Let the App Handle It (BEST)**
- User registrations → Automatic ✅
- Match creation → Automatic via app ✅
- Messages → Automatic via chat ✅
- Visits → Automatic via booking ✅

**Option B: Use Claude Code for Bulk/Complex Tasks**
- Adding 10+ contractors → Ask me
- Updating pricing across templates → Ask me
- Data migrations → Ask me
- Testing/demo data → Ask me

**Option C: Manual via Prisma Studio for Quick Edits**
- Fix a typo → Prisma Studio
- Update a single field → Prisma Studio
- View specific records → Prisma Studio

#### For Development

1. **Local Development:**
   ```bash
   # Terminal 1: Run dev server
   npm run dev

   # Terminal 2: Open Prisma Studio
   npm run db:studio
   ```

2. **Schema Changes:**
   ```bash
   # Edit prisma/schema.prisma
   # Then push changes:
   npm run db:push

   # Or create migration:
   npm run db:migrate
   ```

3. **Seed New Data:**
   ```bash
   # Edit prisma/seed.ts
   npm run db:seed
   ```

---

## 8. Common Tasks & Examples

### 📝 Frequent Operations

#### Task 1: Add 5 New Contractors

**Using Claude Code (Easiest):**
```
You: "Add these 5 contractors to the database:
1. Bouwbedrijf Amsterdam - Amsterdam - Kitchen, Bathroom
2. Renovatie Utrecht - Utrecht - Living Room, Bedroom
3. ...etc"

I will create and run the script for you.
```

#### Task 2: View All Matches for a User

**Using Prisma Studio:**
1. Open http://localhost:5555
2. Click **"User"** → Find user by email
3. Click the **user's row** to expand
4. Scroll to **"consumerMatches"** field
5. Click the arrow icon to see all matches

**Using Claude Code:**
```
You: "Show me all matches for user jan@renovibez.nl"

I will query and display the results.
```

#### Task 3: Update Contractor Rating

**Using Prisma Studio:**
1. Click **"Contractor"**
2. Find the contractor
3. Click to edit
4. Change **rating** field
5. Click "Save 1 change"

**Using Claude Code:**
```
You: "Update 'Renovatie Pro Zwolle' rating to 4.9"
```

#### Task 4: Export All Users

**Using Prisma Studio:**
1. Click **"User"**
2. Click export icon (top right)
3. Choose format (CSV, JSON)
4. Download file

#### Task 5: Test New Feature with Demo Data

**Ask Claude Code:**
```
You: "Create 3 test matches between jan@renovibez.nl and different contractors for testing the chat feature"

I will:
1. Create the matches
2. Add some test messages
3. Give you the match IDs to test with
```

---

## 🎓 Learning Resources

### Understanding Prisma

- **Prisma Docs:** https://www.prisma.io/docs
- **Prisma Schema:** `renovibez/prisma/schema.prisma`
- **Your Models:** See schema file for all tables and relationships

### Database Relationships

Your database has these connections:
- **User** ← → **Contractor** (one-to-one)
- **User** → **RenovationRequest** (one-to-many)
- **User** → **Match** (one-to-many)
- **Contractor** → **Match** (one-to-many)
- **Match** → **Message** (one-to-many)
- **Match** → **Visit** (one-to-many)

---

## 🚀 Quick Reference Commands

```bash
# Start Prisma Studio (local GUI)
npm run db:studio

# Generate Prisma Client (after schema changes)
npm run db:generate

# Push schema changes to database
npm run db:push

# Create migration (for production)
npm run db:migrate

# Seed database with demo data
npm run db:seed

# View database in terminal (requires psql)
# Not recommended - use Prisma Studio instead

# Backup database (ask Claude Code for script)
# I can create a backup script for you
```

---

## 🆘 Need Help?

### Ask Claude Code:

- "How do I add a new contractor?"
- "Create 5 test users for me"
- "Show me all renovation requests"
- "Update contractor X's rating"
- "Export all users to CSV"
- "Create a backup of the database"
- "Write a script to import contractors from JSON"
- "Help me understand the Match model"

### Common Issues:

**Issue:** Can't connect to database
- Check `.env.local` has correct DATABASE_URL
- Verify internet connection (cloud database)
- Check Prisma Studio is using correct .env file

**Issue:** Changes not showing
- Refresh Prisma Studio (Ctrl/Cmd + R)
- Check you're looking at correct environment (local vs production)
- Verify npm run db:generate was run after schema changes

**Issue:** Want to reset database
```bash
# Ask me first! This deletes all data
npm run db:reset
```

---

## 📊 Summary: What Happens Automatically vs Manually

### ✅ Automatic (No Action Needed)

- User registration → Creates User record
- Contractor signup → Creates User + Contractor records
- Login → Creates Session
- Password hashing → Automatic bcrypt
- Timestamps → createdAt, updatedAt auto-set
- ID generation → Automatic CUID
- User matches → Created via app
- Messages → Saved via chat
- Visits → Scheduled via app

### 🖐️ Manual (You Control)

- Adding bulk contractors → Use Claude Code or Prisma Studio
- Creating renovation templates → Seed file or Prisma Studio
- Updating prices → Prisma Studio or Claude Code
- Testing data → Claude Code
- Data analysis → Claude Code queries
- Backups → Custom scripts (ask me)
- Migrations → Schema changes

---

## 🎯 Best Workflow Recommendation

1. **For Regular App Operations:**
   - Let users register naturally → Automatic ✅
   - Let matches happen via app flow → Automatic ✅

2. **For Initial Setup / Bulk Data:**
   - Ask Claude Code to help you:
     - "Add 20 contractors from this list"
     - "Create 10 renovation templates"
     - "Set up test data for demo"

3. **For Viewing / Monitoring:**
   - Use Prisma Studio: http://localhost:5555
   - Or Prisma Cloud: https://console.prisma.io

4. **For Quick Fixes:**
   - Small edits → Prisma Studio
   - Bulk updates → Claude Code

---

**You're all set!** Your database management is now easy with these tools. Let me know what you'd like to do first! 🚀
