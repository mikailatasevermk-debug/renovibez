#!/usr/bin/env ts-node

/**
 * SQLite to PostgreSQL Data Migration Script
 *
 * This script migrates all data from the SQLite database (dev.db)
 * to the PostgreSQL database specified in DATABASE_URL.
 *
 * Usage:
 *   npm run db:migrate-data
 *
 * Prerequisites:
 *   1. PostgreSQL database must be set up and accessible
 *   2. DATABASE_URL in .env.local must point to PostgreSQL
 *   3. Schema must be pushed to PostgreSQL (npm run db:push)
 */

import { PrismaClient as PrismaClientSQLite } from '@prisma/client';
import { PrismaClient as PrismaClientPostgres } from '@prisma/client';

// SQLite connection
const sqliteClient = new PrismaClientSQLite({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db',
    },
  },
});

// PostgreSQL connection (from .env.local)
const postgresClient = new PrismaClientPostgres();

async function migrateData() {
  console.log('🚀 Starting data migration from SQLite to PostgreSQL...\n');

  try {
    // Test connections
    console.log('📊 Testing database connections...');
    await sqliteClient.$connect();
    console.log('✅ SQLite connected');
    await postgresClient.$connect();
    console.log('✅ PostgreSQL connected\n');

    // Migrate Users
    console.log('👥 Migrating Users...');
    const users = await sqliteClient.user.findMany();
    for (const user of users) {
      await postgresClient.user.upsert({
        where: { id: user.id },
        update: user,
        create: user,
      });
    }
    console.log(`✅ Migrated ${users.length} users\n`);

    // Migrate Accounts
    console.log('🔐 Migrating Accounts...');
    const accounts = await sqliteClient.account.findMany();
    for (const account of accounts) {
      await postgresClient.account.upsert({
        where: { id: account.id },
        update: account,
        create: account,
      });
    }
    console.log(`✅ Migrated ${accounts.length} accounts\n`);

    // Migrate Sessions
    console.log('🎫 Migrating Sessions...');
    const sessions = await sqliteClient.session.findMany();
    for (const session of sessions) {
      await postgresClient.session.upsert({
        where: { id: session.id },
        update: session,
        create: session,
      });
    }
    console.log(`✅ Migrated ${sessions.length} sessions\n`);

    // Migrate Verification Tokens
    console.log('🔑 Migrating Verification Tokens...');
    const tokens = await sqliteClient.verificationToken.findMany();
    for (const token of tokens) {
      await postgresClient.verificationToken.upsert({
        where: {
          identifier_token: {
            identifier: token.identifier,
            token: token.token,
          },
        },
        update: token,
        create: token,
      });
    }
    console.log(`✅ Migrated ${tokens.length} verification tokens\n`);

    // Migrate Contractors
    console.log('🔨 Migrating Contractors...');
    const contractors = await sqliteClient.contractor.findMany();
    for (const contractor of contractors) {
      await postgresClient.contractor.upsert({
        where: { id: contractor.id },
        update: contractor,
        create: contractor,
      });
    }
    console.log(`✅ Migrated ${contractors.length} contractors\n`);

    // Migrate Renovation Templates
    console.log('📋 Migrating Renovation Templates...');
    const templates = await sqliteClient.renovationTemplate.findMany();
    for (const template of templates) {
      await postgresClient.renovationTemplate.upsert({
        where: { id: template.id },
        update: template,
        create: template,
      });
    }
    console.log(`✅ Migrated ${templates.length} renovation templates\n`);

    // Migrate Renovation Requests
    console.log('📝 Migrating Renovation Requests...');
    const requests = await sqliteClient.renovationRequest.findMany();
    for (const request of requests) {
      await postgresClient.renovationRequest.upsert({
        where: { id: request.id },
        update: request,
        create: request,
      });
    }
    console.log(`✅ Migrated ${requests.length} renovation requests\n`);

    // Migrate Request Templates
    console.log('🔗 Migrating Request Templates...');
    const requestTemplates = await sqliteClient.requestTemplate.findMany();
    for (const rt of requestTemplates) {
      await postgresClient.requestTemplate.upsert({
        where: { id: rt.id },
        update: rt,
        create: rt,
      });
    }
    console.log(`✅ Migrated ${requestTemplates.length} request templates\n`);

    // Migrate Matches
    console.log('🤝 Migrating Matches...');
    const matches = await sqliteClient.match.findMany();
    for (const match of matches) {
      await postgresClient.match.upsert({
        where: { id: match.id },
        update: match,
        create: match,
      });
    }
    console.log(`✅ Migrated ${matches.length} matches\n`);

    // Migrate Messages
    console.log('💬 Migrating Messages...');
    const messages = await sqliteClient.message.findMany();
    for (const message of messages) {
      await postgresClient.message.upsert({
        where: { id: message.id },
        update: message,
        create: message,
      });
    }
    console.log(`✅ Migrated ${messages.length} messages\n`);

    // Migrate Visits
    console.log('📅 Migrating Visits...');
    const visits = await sqliteClient.visit.findMany();
    for (const visit of visits) {
      await postgresClient.visit.upsert({
        where: { id: visit.id },
        update: visit,
        create: visit,
      });
    }
    console.log(`✅ Migrated ${visits.length} visits\n`);

    console.log('🎉 Data migration completed successfully!');
    console.log('\n📊 Migration Summary:');
    console.log(`   Users: ${users.length}`);
    console.log(`   Accounts: ${accounts.length}`);
    console.log(`   Sessions: ${sessions.length}`);
    console.log(`   Contractors: ${contractors.length}`);
    console.log(`   Templates: ${templates.length}`);
    console.log(`   Requests: ${requests.length}`);
    console.log(`   Matches: ${matches.length}`);
    console.log(`   Messages: ${messages.length}`);
    console.log(`   Visits: ${visits.length}`);

  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    throw error;
  } finally {
    await sqliteClient.$disconnect();
    await postgresClient.$disconnect();
  }
}

// Run migration
migrateData()
  .then(() => {
    console.log('\n✅ All done! Your data has been migrated to PostgreSQL.');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Migration failed with error:', error);
    process.exit(1);
  });
