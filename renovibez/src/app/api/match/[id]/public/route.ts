import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getContractorLabel } from "@/lib/sanitize";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Get the match with contractor details
    const match = await prisma.match.findFirst({
      where: {
        id: id,
        userId: session.user.id,
      },
      include: {
        contractor: true,
        template: true,
      },
    });

    if (!match) {
      return NextResponse.json(
        { error: "Match not found" },
        { status: 404 }
      );
    }

    // Get the contractor index for labeling (A, B, C)
    // This is a simplified approach - in a real app you'd store this
    const allMatches = await prisma.match.findMany({
      where: {
        requestId: match.requestId,
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
    
    const contractorIndex = allMatches.findIndex(m => m.id === match.id);

    const response = {
      matchId: match.id,
      label: getContractorLabel(contractorIndex),
      rating: match.contractor.rating,
      reviewCount: match.contractor.reviewCount,
      city: match.contractor.city,
      specialties: JSON.parse(match.contractor.specialties),
      nameRevealed: match.nameRevealed,
      revealedAt: match.revealedAt,
      status: match.status,
      createdAt: match.createdAt,
      // Only reveal contractor details if nameRevealed is true
      contractor: match.nameRevealed ? {
        companyName: match.contractor.companyName,
      } : null,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error("Error fetching match:", error);
    return NextResponse.json(
      { error: "Failed to fetch match" },
      { status: 500 }
    );
  }
}