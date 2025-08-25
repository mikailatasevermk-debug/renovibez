import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { matchId, proposedSlots } = body;

    if (!matchId || !proposedSlots || !Array.isArray(proposedSlots) || proposedSlots.length === 0) {
      return NextResponse.json(
        { error: "matchId and proposedSlots are required" },
        { status: 400 }
      );
    }

    // Validate that all proposed slots are valid dates
    const validSlots = proposedSlots.every(slot => {
      const date = new Date(slot);
      return !isNaN(date.getTime()) && date > new Date();
    });

    if (!validSlots) {
      return NextResponse.json(
        { error: "All proposed slots must be valid future dates" },
        { status: 400 }
      );
    }

    // Verify user has access to this match
    const match = await prisma.match.findFirst({
      where: {
        id: matchId,
        userId: session.user.id,
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: "Match not found or access denied" },
        { status: 404 }
      );
    }

    // Create or update visit proposal
    const existingVisit = await prisma.visit.findFirst({
      where: {
        matchId: matchId,
      },
    });

    let visit;
    if (existingVisit) {
      visit = await prisma.visit.update({
        where: { id: existingVisit.id },
        data: {
          proposedSlots: JSON.stringify(proposedSlots),
          status: 'PROPOSED',
        },
      });
    } else {
      visit = await prisma.visit.create({
        data: {
          matchId: matchId,
          proposedSlots: JSON.stringify(proposedSlots),
          status: 'PROPOSED',
        },
      });
    }

    // Update match status
    await prisma.match.update({
      where: { id: matchId },
      data: { status: 'VISIT_PROPOSED' },
    });

    return NextResponse.json({
      visit: {
        id: visit.id,
        proposedSlots: JSON.parse(visit.proposedSlots),
        status: visit.status,
      },
      success: true,
    });

  } catch (error) {
    console.error("Error proposing visit:", error);
    return NextResponse.json(
      { error: "Failed to propose visit" },
      { status: 500 }
    );
  }
}