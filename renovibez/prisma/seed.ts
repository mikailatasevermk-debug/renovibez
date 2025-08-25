import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create demo users
  const users = [
    {
      name: 'Jan van der Berg',
      email: 'jan@renovibez.nl',
      passwordHash: await bcrypt.hash('demo123', 12),
      role: 'CONSUMER' as const,
    },
    {
      name: 'Maria Jansen',
      email: 'maria@renovibez.nl',
      passwordHash: await bcrypt.hash('demo123', 12),
      role: 'CONSUMER' as const,
    },
    {
      name: 'Piet Bakker',
      email: 'piet@renovatiepro.nl',
      passwordHash: await bcrypt.hash('demo123', 12),
      role: 'CONTRACTOR' as const,
    },
    {
      name: 'Kees de Vries',
      email: 'kees@devakman.nl',
      passwordHash: await bcrypt.hash('demo123', 12),
      role: 'CONTRACTOR' as const,
    },
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: user,
      create: user,
    });
    createdUsers.push(createdUser);
    console.log(`✅ Upserted ${user.role.toLowerCase()}: ${user.name} (${user.email})`);
  }

  // Get contractor users for linking
  const contractorUsers = createdUsers.filter(user => user.role === 'CONTRACTOR');

  // Create sample contractors (6 from Overijssel as requested)
  const contractors = [
    {
      companyName: 'Renovatie Pro Zwolle',
      city: 'Zwolle',
      rating: 4.8,
      reviewCount: 23,
      specialties: JSON.stringify(['Badkamer', 'Keuken', 'Algemeen']),
      verified: true,
      userId: contractorUsers[0]?.id, // Link to Piet Bakker
    },
    {
      companyName: 'Bouwbedrijf De Vakman',
      city: 'Deventer',
      rating: 4.9,
      reviewCount: 18,
      specialties: JSON.stringify(['Badkamer', 'Slaapkamer', 'Loodgieterwerk']),
      verified: true,
      userId: contractorUsers[1]?.id, // Link to Kees de Vries
    },
    {
      companyName: 'Keuken & Interieur Enschede',
      city: 'Enschede', 
      rating: 4.6,
      reviewCount: 31,
      specialties: JSON.stringify(['Keuken', 'Woonkamer', 'Afwerking']),
      verified: true,
      userId: null, // No user account for this contractor
    },
    {
      companyName: 'Totaal Renovatie Almelo',
      city: 'Almelo',
      rating: 4.7,
      reviewCount: 42,
      specialties: JSON.stringify(['Woonkamer', 'Slaapkamer', 'Algemeen']),
      verified: true,
      userId: null, // No user account for this contractor
    },
    {
      companyName: 'Eco Bouw Kampen',
      city: 'Kampen',
      rating: 4.5,
      reviewCount: 27,
      specialties: JSON.stringify(['Duurzaam', 'Buitenruimte', 'Isolatie']),
      verified: true,
      userId: null, // No user account for this contractor
    },
    {
      companyName: 'Thuiskantoor Experts Hengelo',
      city: 'Hengelo',
      rating: 4.8,
      reviewCount: 15,
      specialties: JSON.stringify(['Thuiskantoor', 'Elektra', 'Interieur']),
      verified: true,
      userId: null, // No user account for this contractor
    },
  ];

  for (const contractor of contractors) {
    await prisma.contractor.upsert({
      where: { companyName: contractor.companyName },
      update: contractor,
      create: contractor,
    });
    console.log(`✅ Upserted contractor: ${contractor.companyName}${contractor.userId ? ' (linked to user)' : ''}`);
  }

  // Create sample renovation templates (combined packages)
  const templates = [
    {
      slug: 'moderne-badkamer-renovatie',
      title: 'Moderne Badkamer Renovatie',
      summary: 'Complete badkamertransformatie met hedendaagse armaturen',
      categories: JSON.stringify(['Badkamer']),
      avgPrice: 12500,
      duration: '2-3 weken',
    },
    {
      slug: 'volledige-keuken-verbouwing', 
      title: 'Volledige Keuken Verbouwing',
      summary: 'Keukenrenovatie van ontwerp tot oplevering',
      categories: JSON.stringify(['Keuken']),
      avgPrice: 25000,
      duration: '4-5 weken',
    },
    {
      slug: 'luxe-woonkamer-makeover',
      title: 'Luxe Woonkamer Makeover',
      summary: 'Sfeervolle woonruimte met warme materialen',
      categories: JSON.stringify(['Woonkamer']),
      avgPrice: 18500,
      duration: '3-4 weken',
    },
    {
      slug: 'slaapkamer-suite-renovatie',
      title: 'Slaapkamer Suite Renovatie',
      summary: 'Rustgevende slaapruimte met inloopkast',
      categories: JSON.stringify(['Slaapkamer']),
      avgPrice: 15000,
      duration: '2-3 weken',
    },
    {
      slug: 'tuinkamer-overkapping',
      title: 'Tuinkamer & Overkapping',
      summary: 'Uitbreiding van uw leefruimte naar buiten',
      categories: JSON.stringify(['Buitenruimte']),
      avgPrice: 22000,
      duration: '3-5 weken',
    },
    {
      slug: 'thuiskantoor-verbouwing',
      title: 'Thuiskantoor Verbouwing',
      summary: 'Productieve werkruimte in uw eigen huis',
      categories: JSON.stringify(['Thuiskantoor']),
      avgPrice: 8500,
      duration: '1-2 weken',
    },
  ];

  for (const template of templates) {
    await prisma.renovationTemplate.upsert({
      where: { slug: template.slug },
      update: template,
      create: template,
    });
    console.log(`✅ Upserted template: ${template.title}`);
  }

  console.log('🎉 Seeding completed successfully!');
  console.log('\n📋 Demo Credentials:');
  console.log('👤 Consumers:');
  console.log('   jan@renovibez.nl / demo123');
  console.log('   maria@renovibez.nl / demo123');
  console.log('🔨 Contractors:');
  console.log('   piet@renovatiepro.nl / demo123');
  console.log('   kees@devakman.nl / demo123');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });