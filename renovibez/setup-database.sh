#!/bin/bash

# RenoviBez PostgreSQL Setup Script
# Run this script on your local machine to complete the database setup

set -e  # Exit on error

echo "🚀 RenoviBez - PostgreSQL Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ Error: .env.local file not found"
    echo "Please make sure you're in the project root directory"
    exit 1
fi

echo "✅ Found .env.local"
echo ""

# Step 1: Push schema to database
echo "📊 Step 1: Pushing schema to PostgreSQL..."
npm run db:push

if [ $? -eq 0 ]; then
    echo "✅ Schema pushed successfully"
else
    echo "❌ Failed to push schema"
    exit 1
fi

echo ""

# Step 2: Migrate data from SQLite (optional)
echo "📦 Step 2: Migrate data from SQLite to PostgreSQL"
echo ""
read -p "Do you want to migrate existing SQLite data? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Migrating data..."
    npm run db:migrate:data

    if [ $? -eq 0 ]; then
        echo "✅ Data migrated successfully"
    else
        echo "❌ Data migration failed"
        echo "You can seed demo data instead with: npm run db:seed"
    fi
else
    echo "⏭️  Skipping data migration"
    echo ""
    read -p "Do you want to seed demo data instead? (y/n): " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "🌱 Seeding demo data..."
        npm run db:seed

        if [ $? -eq 0 ]; then
            echo "✅ Demo data seeded successfully"
        else
            echo "❌ Seeding failed"
        fi
    fi
fi

echo ""

# Step 3: Test connection
echo "🏥 Step 3: Testing database connection..."
npm run dev &
DEV_PID=$!

# Wait for server to start
echo "Waiting for server to start..."
sleep 5

# Test health endpoint
HEALTH_CHECK=$(curl -s http://localhost:3000/api/health)

# Kill the dev server
kill $DEV_PID 2>/dev/null || true

if echo "$HEALTH_CHECK" | grep -q "healthy"; then
    echo "✅ Database connection is healthy!"
    echo ""
    echo "📊 Connection details:"
    echo "$HEALTH_CHECK" | jq '.' 2>/dev/null || echo "$HEALTH_CHECK"
else
    echo "⚠️  Could not verify database health"
    echo "Response: $HEALTH_CHECK"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Start development server: npm run dev"
echo "   2. Visit: http://localhost:3000"
echo "   3. Test health endpoint: curl http://localhost:3000/api/health"
echo ""
echo "Demo credentials:"
echo "   Consumer: jan@renovibez.nl / demo123"
echo "   Contractor: piet@renovatiepro.nl / demo123"
echo ""
