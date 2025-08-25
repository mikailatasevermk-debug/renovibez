import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;
    const { matchId } = await params;

    // Verify the match belongs to the user
    const existingMatch = await prisma.match.findUnique({
      where: { id: matchId },
      include: {
        project: true,
      },
    });

    if (!existingMatch || existingMatch.project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    // Update the match status
    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { status },
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
        project: {
          include: {
            renovationProject: true,
          },
        },
      },
    });

    // If accepted, update project status and decline other matches
    if (status === 'ACCEPTED') {
      await prisma.project.update({
        where: { id: existingMatch.projectId },
        data: { status: 'MATCHED' },
      });

      // Decline other matches for the same project
      await prisma.match.updateMany({
        where: {
          projectId: existingMatch.projectId,
          id: { not: matchId },
        },
        data: { status: 'DECLINED' },
      });
    }

    return NextResponse.json(updatedMatch);
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}