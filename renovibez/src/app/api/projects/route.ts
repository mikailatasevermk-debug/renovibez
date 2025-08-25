import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

interface ContractorProfile {
  id: string;
  businessName: string;
  yearsExperience: number;
  rating: number;
  verified: boolean;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { renovationProjectId, budget, preferredStartDate, description, address } = body;

    // Create the project
    const project = await prisma.project.create({
      data: {
        userId: session.user.id,
        renovationProjectId,
        budget: budget ? parseFloat(budget) : null,
        preferredStartDate: preferredStartDate ? new Date(preferredStartDate) : null,
        description,
        address,
        status: 'PENDING',
      },
      include: {
        renovationProject: true,
      },
    });

    // Find 3 available contractors for this project type
    const contractors = await prisma.contractorProfile.findMany({
      where: {
        verified: true,
        specializations: {
          has: project.renovationProject.category,
        },
      },
      take: 3,
      orderBy: {
        rating: 'desc',
      },
    });

    // Create matches with the 3 contractors
    const matches = await Promise.all(
      contractors.map(async (contractor: ContractorProfile) => {
        // Generate offer price (base price + some variation)
        const basePrice = project.renovationProject.basePrice;
        const variation = (Math.random() - 0.5) * 0.2; // ±10% variation
        const offerPrice = basePrice * (1 + variation);

        return prisma.match.create({
          data: {
            projectId: project.id,
            contractorId: contractor.id,
            consumerId: session.user.id,
            status: 'OFFERED',
            offerPrice: Math.round(offerPrice),
            offerDetails: `Professional ${project.renovationProject.category.toLowerCase()} renovation with ${contractor.yearsExperience} years of experience.`,
          },
          include: {
            contractor: {
              include: {
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      })
    );

    return NextResponse.json({ project, matches }, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const projects = await prisma.project.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        renovationProject: true,
        matches: {
          include: {
            contractor: {
              include: {
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}