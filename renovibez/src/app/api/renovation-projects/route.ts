import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const renovationProjects = await prisma.renovationTemplate.findMany({
      where: {
        active: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(renovationProjects);
  } catch (error) {
    console.error('Error fetching renovation projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}