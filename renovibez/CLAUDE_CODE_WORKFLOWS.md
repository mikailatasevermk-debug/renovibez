# 🤖 Working with Claude Code - Database Workflows

Practical examples of how to use Claude Code for efficient database management.

---

## 🎯 Quick Start: What Can I Do?

Just ask me naturally! Here are real examples:

### ✨ Example Conversations

**Add Contractors:**
```
You: "Add a new contractor: 'Bouwbedrijf De Jong' in Rotterdam,
      specializing in kitchens and bathrooms, 4.7 rating, 15 reviews"

Me: I'll create a script to add this contractor to your database!
    [Creates user + contractor, runs script, confirms success]
```

**Add Multiple Items:**
```
You: "Add these 3 renovation templates:
     1. Dakisolatie - €8000 - 1 week
     2. Vloerverwarming - €6000 - 3 days
     3. Kozijnen Vervangen - €12000 - 2 weeks"

Me: I'll create all three templates for you!
    [Creates script, adds all templates, shows results]
```

**Query Data:**
```
You: "Show me all contractors in Amsterdam"

Me: [Runs query, shows formatted list with details]
```

**Update Data:**
```
You: "Increase all kitchen renovation prices by 10%"

Me: I'll update all kitchen projects for you!
    [Creates update script, runs it, shows affected records]
```

---

## 📋 Common Workflows

### 1️⃣ Adding Contractors

#### Scenario: You found great contractors to add

**Simple Ask:**
```
"Add contractor: 'Totaal Verbouw Amsterdam', Amsterdam,
 specialties: kitchen, bathroom, living room, rating 4.8"
```

**I will:**
1. Create a TypeScript script
2. Generate a user account (if needed)
3. Create contractor profile
4. Link them together
5. Confirm it's added
6. Show you the new contractor ID

**What you get:**
- ✅ New contractor in database
- ✅ Linked user account
- ✅ Ready to match with customers

---

### 2️⃣ Creating Renovation Templates

#### Scenario: Add new service offerings

**Example Request:**
```
"Create a renovation template for 'Complete Bathroom Renovation'
 - Categories: bathroom, modern, luxury
 - Average price: €18,500
 - Duration: 3-4 weeks
 - Description: Complete bathroom transformation including tiles, fixtures, plumbing"
```

**I will:**
1. Create template with proper slug
2. Set all fields correctly
3. Make it active
4. Add to database
5. Confirm creation

---

### 3️⃣ Creating Test Data

#### Scenario: Testing new features

**Example:**
```
"Create 3 test users and 5 matches for testing the chat feature"
```

**I will:**
1. Create test consumer users
2. Create test contractor users
3. Create matches between them
4. Add some test messages
5. Give you the IDs for testing

**Perfect for:**
- Testing chat functionality
- Testing match flow
- Testing visit scheduling
- Demo presentations

---

### 4️⃣ Data Analysis

#### Scenario: Understand your data

**Example Questions:**
```
"How many contractors do we have in each city?"
"What's the average rating of all contractors?"
"Show me all matches that are in 'CHATTING' status"
"List all renovation templates sorted by price"
```

**I will:**
- Write and run queries
- Format results nicely
- Show statistics
- Export if needed

---

### 5️⃣ Bulk Operations

#### Scenario: Import or update many records

**Example:**
```
"Import these 10 contractors from my CSV file:
[paste CSV data]"

OR

"Update all bathroom renovation prices:
 - Modern Bathroom: €19,000
 - Luxury Bathroom: €25,000
 - Basic Bathroom: €12,000"
```

**I will:**
- Parse the data
- Create transaction-safe script
- Execute all changes
- Verify integrity
- Report results

---

### 6️⃣ Database Maintenance

#### Scenario: Cleanup and optimization

**Example Tasks:**
```
"Delete all test users with email containing 'test'"
"Remove all matches that were cancelled more than 6 months ago"
"Archive old messages from completed projects"
```

**I will:**
- Confirm what will be deleted
- Ask for confirmation
- Execute safely
- Report what was changed

---

## 🎨 Real-World Examples

### Example 1: Setting Up Demo Data

```
You: "I need to demo the app tomorrow. Create:
      - 5 consumer users
      - 8 contractors across different cities
      - 12 matches in various stages
      - Some chat messages between them
      - 3 scheduled visits"

Me: I'll create a complete demo scenario for you!
```

**Result:** Fully populated database ready for demo

---

### Example 2: Importing Contractors

```
You: "I have a list of 25 contractors in this format:
      CompanyName | City | Specialties | Rating

      Can you import them all?"

Me: Yes! Paste the list and I'll create an import script.
```

**Result:** All 25 contractors imported correctly

---

### Example 3: Updating Prices

```
You: "Our kitchen renovation prices need updating:
      - Basic Kitchen: €15,000
      - Modern Kitchen: €22,000
      - Luxury Kitchen: €35,000"

Me: I'll update all kitchen templates with these prices.
```

**Result:** All prices updated across templates

---

### Example 4: Data Export

```
You: "Export all contractors with ratings above 4.5
      as CSV for marketing purposes"

Me: I'll query and export the data for you!
```

**Result:** CSV file ready for marketing team

---

## 💡 Tips for Working with Me

### ✅ DO:

**Be Specific:**
```
✅ "Add contractor 'De Bouwer' in Utrecht, kitchen specialist, 4.5 rating"
❌ "Add a contractor"
```

**Provide Context:**
```
✅ "I'm testing the chat feature, create 2 matches with messages"
❌ "Create some matches"
```

**Ask for Explanations:**
```
✅ "Show me how contractors link to users in the database"
✅ "Explain the Match model to me"
```

**Request Verification:**
```
✅ "Add the contractor and then verify it was created correctly"
✅ "After updating, show me the new values"
```

### ❌ DON'T:

**Don't Be Vague:**
```
❌ "Add some data"
❌ "Fix the database"
❌ "Update stuff"
```

**Don't Skip Details:**
```
❌ "Add a renovation template" (which type? price? duration?)
```

---

## 🔧 Advanced Workflows

### Custom Scripts

**Request:**
```
"Create a script that:
1. Finds all contractors without matches
2. Checks their status
3. Sends them a notification
4. Logs the results"
```

**I will:**
- Write the complete script
- Add error handling
- Create logging
- Test it
- Save it for reuse

### Data Validation

**Request:**
```
"Check database integrity:
- Any orphaned contractor records?
- Any matches without valid users?
- Any templates with invalid data?"
```

**I will:**
- Run validation queries
- Report issues
- Suggest fixes
- Execute repairs if needed

### Performance Analysis

**Request:**
```
"Analyze database performance:
- Most queried tables
- Slowest operations
- Optimization suggestions"
```

**I will:**
- Analyze schema
- Check indexes
- Suggest optimizations
- Implement if approved

---

## 📝 Templates You Can Use

### Add Contractor Template

```
"Add contractor:
 - Company: [NAME]
 - City: [CITY]
 - Specialties: [LIST]
 - Rating: [NUMBER]
 - Reviews: [NUMBER]
 - Verified: [yes/no]"
```

### Add Renovation Template

```
"Create renovation template:
 - Name: [NAME]
 - Categories: [LIST]
 - Price: €[AMOUNT]
 - Duration: [TIME]
 - Description: [TEXT]"
```

### Create Test Scenario

```
"Create test scenario:
 - [NUMBER] consumers
 - [NUMBER] contractors in [CITIES]
 - [NUMBER] matches
 - [NUMBER] messages
 - [NUMBER] visits"
```

### Bulk Update Template

```
"Update all [TYPE] records:
 - Set [FIELD] to [VALUE]
 - Where [CONDITION]"
```

---

## 🎓 Learning Mode

### Understanding Your Data

**Ask me:**
```
"Explain the relationship between User and Contractor"
"How are Matches created?"
"What fields does a RenovationTemplate have?"
"Show me the schema for the Message model"
```

**I will:**
- Explain the model
- Show relationships
- Give examples
- Suggest best practices

### Best Practices

**Ask me:**
```
"What's the best way to add 50 contractors?"
"Should I use Prisma Studio or ask you for bulk updates?"
"How should I backup my database?"
"What's the safest way to delete old data?"
```

**I will:**
- Recommend best approach
- Explain trade-offs
- Show examples
- Create scripts if needed

---

## 🚀 Quick Commands for Me

Copy these and modify as needed:

```
# Add single contractor
"Add contractor: [NAME], [CITY], [SPECIALTIES], rating [X]"

# Add multiple contractors
"Add these contractors: [LIST]"

# Create renovation template
"Create template: [NAME], €[PRICE], [DURATION], [CATEGORIES]"

# Query data
"Show me all [TYPE] where [CONDITION]"

# Update data
"Update [RECORD] set [FIELD] to [VALUE]"

# Delete data
"Delete all [TYPE] where [CONDITION]" (I'll confirm first!)

# Create test data
"Create [NUMBER] test [TYPE] for [PURPOSE]"

# Export data
"Export [TYPE] as [FORMAT] where [CONDITION]"

# Analyze data
"Show me statistics about [TOPIC]"

# Verify data
"Check if [CONDITION] exists"
```

---

## 🎯 Your Most Common Tasks

Based on typical RenoviBez operations:

### Daily Operations

**These Happen Automatically (Don't Ask Me):**
- New user registrations → App handles it
- User logins → App handles it
- Matches created by algorithm → App handles it
- Messages sent → App handles it

**Ask Me For:**
- Adding contractors manually
- Creating new renovation templates
- Updating prices
- Generating reports
- Test data for features

### Weekly Operations

**Ask Me To:**
- "Show me this week's new registrations"
- "List all new matches this week"
- "Report on contractor activity"
- "Update popular templates"

### Monthly Operations

**Ask Me To:**
- "Generate monthly statistics"
- "Export all data for backup"
- "Clean up old test data"
- "Update contractor ratings based on reviews"

---

## 💬 Example Session

Here's a real workflow:

```
You: "I need to add contractors for the Amsterdam region.
      I have 5 companies ready to onboard."

Me: Great! Please provide their details and I'll add them all.

You: "1. Bouwbedrijf Amsterdam - kitchen, bathroom - 4.6 rating
      2. Renovatie Masters - living room, bedroom - 4.8 rating
      3. De Verbouwers - complete renovation - 4.5 rating
      4. Keuken Experts - kitchen only - 4.9 rating
      5. Badkamer Specialists - bathroom only - 4.7 rating"

Me: Perfect! I'll create all 5 contractors for you.
    [Creates script, adds all contractors]

    ✅ Added 5 contractors successfully!
    - Bouwbedrijf Amsterdam (ID: ck...)
    - Renovatie Masters (ID: ck...)
    - De Verbouwers (ID: ck...)
    - Keuken Experts (ID: ck...)
    - Badkamer Specialists (ID: ck...)

    All are ready to receive matches!

You: "Thanks! Can you verify they all appear in Amsterdam?"

Me: Checking... Yes! All 5 contractors are correctly set with city: "Amsterdam"
    [Shows formatted list]
```

---

## 📞 Getting Help

**Stuck? Just ask:**
- "I don't know how to [TASK], help me"
- "What's the best way to [GOAL]?"
- "Can you explain [CONCEPT]?"
- "Show me an example of [TASK]"

**I'm here to:**
- ✅ Create scripts for you
- ✅ Execute database operations
- ✅ Verify results
- ✅ Explain concepts
- ✅ Suggest best practices
- ✅ Debug issues
- ✅ Optimize workflows

---

**Ready to start?** What would you like to do with your database? 🚀
