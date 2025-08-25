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
    const { visitId, selectedSlot } = body;

    if (!visitId || !selectedSlot) {
      return NextResponse.json(
        { error: "visitId and selectedSlot are required" },
        { status: 400 }
      );
    }

    // Validate selected slot is a valid date
    const selectedDate = new Date(selectedSlot);
    if (isNaN(selectedDate.getTime()) || selectedDate <= new Date()) {
      return NextResponse.json(
        { error: "Selected slot must be a valid future date" },
        { status: 400 }
      );
    }

    // Get the visit with match info
    const visit = await prisma.visit.findFirst({
      where: {
        id: visitId,
      },
      include: {
        match: true,
      },
    });

    if (!visit) {
      return NextResponse.json(
        { error: "Visit not found" },
        { status: 404 }
      );
    }

    // Verify user has access to this match
    if (visit.match.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      );
    }

    // Verify the selected slot is one of the proposed slots
    const proposedSlots = JSON.parse(visit.proposedSlots);
    if (!proposedSlots.includes(selectedSlot)) {
      return NextResponse.json(
        { error: "Selected slot is not one of the proposed slots" },
        { status: 400 }
      );
    }

    // Update visit with confirmed slot
    const updatedVisit = await prisma.visit.update({
      where: { id: visitId },
      data: {
        scheduledAt: selectedDate,
        status: 'CONFIRMED',
      },
    });

    // Update match status and reveal contractor name
    const updatedMatch = await prisma.match.update({
      where: { id: visit.matchId },
      data: {
        status: 'VISIT_CONFIRMED',
        nameRevealed: true,
        revealedAt: new Date(),
      },
    });

    return NextResponse.json({
      visit: {
        id: updatedVisit.id,
        scheduledAt: updatedVisit.scheduledAt,
        status: updatedVisit.status,
      },
      match: {
        nameRevealed: updatedMatch.nameRevealed,
        revealedAt: updatedMatch.revealedAt,
      },
      success: true,
    });

  } catch (error) {
    console.error("Error accepting visit:", error);
    return NextResponse.json(
      { error: "Failed to accept visit" },
      { status: 500 }
    );
  }
}