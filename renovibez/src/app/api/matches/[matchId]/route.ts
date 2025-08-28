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
        request: true,
      },
    });

    if (!existingMatch || existingMatch.request.userId !== session.user.id) {
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
        request: true,
        template: true,
      },
    });

    // If status is changing to CHATTING or beyond, cancel other matches for the same request
    if (status === 'CHATTING' || status === 'VISIT_PROPOSED' || status === 'VISIT_CONFIRMED') {
      // Cancel other matches for the same request
      await prisma.match.updateMany({
        where: {
          requestId: existingMatch.requestId,
          id: { not: matchId },
          status: 'MATCHED',
        },
        data: { status: 'CANCELLED' },
      });
    }

    return NextResponse.json(updatedMatch);
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}