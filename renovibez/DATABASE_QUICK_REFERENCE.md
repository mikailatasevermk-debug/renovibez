# 🚀 Database Quick Reference - RenoviBez

Fast reference for common database operations.

---

## 🎯 TL;DR - Three Ways to Manage Your Database

| Method | When to Use | How to Access |
|--------|-------------|---------------|
| **Let App Handle It** ⭐ | User registration, matches, messages | Automatic - do nothing! |
| **Ask Claude Code** 🤖 | Bulk operations, testing, complex tasks | Just ask in chat! |
| **Prisma Studio** 🎨 | Quick edits, viewing data, one-off changes | `npm run db:studio` |

---

## ⚡ Lightning Quick Start

### Open Prisma Studio (Visual Database Browser)
```bash
cd renovibez
npm run db:studio
```
Then open: **http://localhost:5555**

### Ask Claude Code for Help
Just type naturally:
```
"Add contractor: Bouwbedrijf Amsterdam, kitchen specialist, 4.7 rating"
"Show me all matches for user jan@renovibez.nl"
"Create 5 test users for demo"
```

---

## 🔑 Key Concepts

### ✅ Automatic (No Work Needed)

These happen automatically when users use your app:
- ✅ User registration
- ✅ Password hashing
- ✅ User login/sessions
- ✅ Match creation (via app logic)
- ✅ Messages
- ✅ Visit scheduling
- ✅ Timestamps (createdAt, updatedAt)
- ✅ ID generation

**You don't need to create users manually - the app does it!**

### 🖐️ Manual (Your Control)

Add these via Claude Code or Prisma Studio:
- Contractors (in bulk)
- Renovation templates
- Test/demo data
- Price updates
- Custom queries

---

## 📊 Your Database Models

| Model | What It Stores | Example |
|-------|----------------|---------|
| **User** | All users (consumers & contractors) | jan@renovibez.nl |
| **Contractor** | Contractor company info | Bouwbedrijf De Jong |
| **RenovationTemplate** | Available project types | Kitchen Renovation |
| **RenovationRequest** | Customer project requests | User wants new kitchen |
| **Match** | User ↔ Contractor matches | Jan + Contractor A |
| **Message** | Chat messages | "When can you start?" |
| **Visit** | Scheduled visits | Site visit on Mon 10AM |
| **Session** | Login sessions | Active user sessions |
| **Account** | OAuth accounts | Google login data |

---

## 💻 Essential Commands

```bash
# Open visual database browser
npm run db:studio

# After changing prisma/schema.prisma
npm run db:push

# Seed demo data
npm run db:seed

# Generate Prisma client
npm run db:generate

# Create migration (for production)
npm run db:migrate

# Start dev server
npm run dev
```

---

## 🌐 Cloud Access

### Prisma Data Platform (Recommended)
1. Go to: https://console.prisma.io
2. Sign up/login
3. Import your database
4. Access from anywhere!

### Vercel Postgres Dashboard
1. Go to: https://vercel.com/dashboard
2. Navigate to: Storage → Your Database
3. Click "Browse Data"

---

## 🤖 Ask Claude Code - Common Examples

### Add Data
```
"Add contractor: [NAME], [CITY], [SPECIALTIES], rating [X]"
"Create renovation template: [NAME], €[PRICE], [DURATION]"
"Add 5 test users for demo"
```

### Query Data
```
"Show me all contractors in Amsterdam"
"List all matches for user X"
"Find all bathroom renovation templates"
```

### Update Data
```
"Update contractor X rating to 4.8"
"Increase all kitchen prices by 10%"
"Mark all old matches as completed"
```

### Analyze
```
"How many contractors per city?"
"What's the average project price?"
"Show me registration stats this week"
```

---

## 🎨 Prisma Studio Quick Guide

### Navigate
- **Left Sidebar:** Click any model (User, Contractor, etc.)
- **Top Bar:** Filter, search, export
- **Table View:** Click row to edit

### Add Record
1. Click "Add record" button
2. Fill in fields (required fields marked)
3. Click "Save 1 change"

### Edit Record
1. Click row to expand
2. Modify fields
3. Click "Save 1 change"

### View Relationships
- Purple fields = relationships
- Click arrow icon to navigate
- Example: User → see their Matches

### Export Data
- Click export icon (top right)
- Choose CSV or JSON
- Download

---

## 📋 Data Relationships

```
User
 ├─→ Contractor (if role = CONTRACTOR)
 ├─→ RenovationRequest (consumer's requests)
 ├─→ Match (as consumer)
 └─→ Message (sent messages)

Contractor
 ├─→ User (linked account)
 └─→ Match (contractor's matches)

RenovationTemplate
 └─→ Match (which projects)

Match
 ├─→ User (consumer)
 ├─→ Contractor
 ├─→ RenovationTemplate
 ├─→ Message (chat)
 └─→ Visit (scheduled visits)
```

---

## 🔐 Security Notes

### Passwords
- **NEVER store plain text passwords**
- Always use bcrypt hash
- Ask Claude Code: "Generate bcrypt hash for password 'xyz'"

### Production Database
- Same structure as local
- Different data (real users)
- Same connection URL for both environments

### Environment Variables
- **Local:** `.env.local`
- **Production:** Vercel environment variables
- Never commit `.env.local` to git

---

## 🆘 Quick Troubleshoots

### "Can't connect to database"
```bash
# Check environment file exists
cat .env.local

# Verify DATABASE_URL is set
echo $DATABASE_URL

# Restart Prisma Studio
npm run db:studio
```

### "Changes not showing"
- Refresh browser (Ctrl/Cmd + R)
- Check you're viewing correct environment
- Restart Prisma Studio

### "Schema out of sync"
```bash
npm run db:generate
npm run db:push
```

### "Need to reset everything"
```bash
# ⚠️ WARNING: Deletes all data!
# Ask Claude Code first!
npm run db:reset
```

---

## 📞 Get Help

### From Claude Code
Just ask:
- "Help me add a contractor"
- "How do I see all users?"
- "Create test data for me"
- "Explain the Match model"

### Documentation
- `DATABASE_MANAGEMENT_GUIDE.md` - Complete guide
- `CLAUDE_CODE_WORKFLOWS.md` - AI workflows
- `DATABASE_SETUP.md` - Setup instructions

### Resources
- Prisma Docs: https://www.prisma.io/docs
- Your Schema: `prisma/schema.prisma`

---

## 🎯 Common Workflows

### Workflow 1: Add New Contractors
**Best Method:** Ask Claude Code
```
"Add these 3 contractors: [LIST]"
```
**Result:** All added in seconds

### Workflow 2: View Match Details
**Best Method:** Prisma Studio
1. Open http://localhost:5555
2. Click "Match"
3. Click row to see details
**Result:** See all match info + messages

### Workflow 3: Create Test Data
**Best Method:** Ask Claude Code
```
"Create demo scenario with 5 users and 10 matches"
```
**Result:** Full test environment ready

### Workflow 4: Update Pricing
**Best Method:** Ask Claude Code (bulk) or Prisma Studio (single)
```
"Update all bathroom renovation prices to €18,000"
```
**Result:** All prices updated

### Workflow 5: Export Data
**Best Method:** Prisma Studio
1. Open table
2. Click export icon
3. Download CSV/JSON
**Result:** Data file ready

---

## 💡 Pro Tips

1. **Let the App Work**
   - Don't manually create users for registrations
   - App handles it automatically
   - You focus on contractors & templates

2. **Use Claude Code for Bulk**
   - Adding 5+ items? Ask me
   - Faster and error-free
   - Get verification included

3. **Use Prisma Studio for Quick Looks**
   - Checking a single record? Prisma Studio
   - Beautiful UI, easy navigation
   - Great for exploring relationships

4. **Always Verify**
   - After adding data, check it
   - Use Prisma Studio or ask me
   - Better safe than sorry

5. **Keep Backups**
   - Ask me to create backup scripts
   - Export important data regularly
   - Store in safe location

---

## 🎉 You're Ready!

**Three golden rules:**
1. **Let the app handle user operations** (automatic!)
2. **Use Claude Code for bulk/complex tasks** (fast & easy)
3. **Use Prisma Studio for quick viewing/editing** (beautiful UI)

**Questions?** Just ask me! 🤖

---

## 📱 Mobile Reference

**Quick Commands:**
```
# Open database
npm run db:studio

# Ask Claude
"Add contractor X"
"Show me all Y"
"Update Z"
```

**Quick URLs:**
- Local DB: http://localhost:5555
- Prisma Cloud: https://console.prisma.io
- Vercel DB: https://vercel.com/dashboard

**Need Help:**
Ask Claude Code anything!

---

**Last Updated:** 2025-10-26
**Database:** PostgreSQL (Prisma Postgres)
**Environment:** Production + Local Development
