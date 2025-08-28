import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { templateId, budget, preferredStartDate, description, address } = body;

    // Create the renovation request with scope
    const scope = JSON.stringify({
      budget: budget ? parseFloat(budget) : null,
      startDate: preferredStartDate ? new Date(preferredStartDate) : null,
      description: description || '',
      address: address || '',
    });

    const renovationRequest = await prisma.renovationRequest.create({
      data: {
        userId: session.user.id,
        scope: scope,
      },
    });

    // Create request template link
    if (templateId) {
      await prisma.requestTemplate.create({
        data: {
          requestId: renovationRequest.id,
          templateId,
          order: 0,
        },
      });
    }

    // Find 3 available contractors
    const contractors = await prisma.contractor.findMany({
      where: {
        verified: true,
      },
      take: 3,
      orderBy: {
        rating: 'desc',
      },
    });

    // Create matches with the contractors
    const matches = await Promise.all(
      contractors.map(async (contractor) => {
        return prisma.match.create({
          data: {
            userId: session.user.id,
            contractorId: contractor.id,
            templateId: templateId,
            requestId: renovationRequest.id,
            status: 'MATCHED',
          },
          include: {
            contractor: true,
          },
        });
      })
    );

    return NextResponse.json({ renovationRequest, matches }, { status: 201 });
  } catch (error) {
    console.error('Error creating renovation request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requests = await prisma.renovationRequest.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        requestTemplates: {
          include: {
            template: true,
          },
        },
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

    return NextResponse.json(requests);
  } catch (error) {
    console.error('Error fetching renovation requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}