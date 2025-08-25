import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getContractorLabel } from "@/lib/sanitize";

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
    const { requestId } = body;

    if (!requestId) {
      return NextResponse.json(
        { error: "requestId is required" },
        { status: 400 }
      );
    }

    // Verify the request belongs to the current user
    const renovationRequest = await prisma.renovationRequest.findFirst({
      where: {
        id: requestId,
        userId: session.user.id,
      },
      include: {
        requestTemplates: true,
      },
    });

    if (!renovationRequest) {
      return NextResponse.json(
        { error: "Renovation request not found" },
        { status: 404 }
      );
    }

    // Get all available contractors
    const allContractors = await prisma.contractor.findMany({
      where: {
        verified: true,
      },
    });

    if (allContractors.length < 3) {
      return NextResponse.json(
        { error: "Not enough contractors available" },
        { status: 400 }
      );
    }

    // Simple matching algorithm: randomly select 3 contractors
    // In a real app, this would be more sophisticated based on location, specialties, etc.
    const shuffled = allContractors.sort(() => Math.random() - 0.5);
    const selectedContractors = shuffled.slice(0, 3);

    // Create matches for each selected contractor and each template
    const matches = [];
    
    for (let contractorIndex = 0; contractorIndex < selectedContractors.length; contractorIndex++) {
      const contractor = selectedContractors[contractorIndex];
      
      // For this simple implementation, we'll create one match per contractor for the primary template
      // In a real app, you might create matches for each template or combine them
      const primaryTemplate = renovationRequest.requestTemplates[0];
      
      const match = await prisma.match.create({
        data: {
          userId: session.user.id,
          contractorId: contractor.id,
          templateId: primaryTemplate.templateId,
          requestId: requestId,
          status: 'MATCHED',
          nameRevealed: false,
        },
      });
      
      matches.push({
        matchId: match.id,
        label: getContractorLabel(contractorIndex),
        rating: contractor.rating,
        reviewCount: contractor.reviewCount,
        city: contractor.city,
        specialties: JSON.parse(contractor.specialties),
      });
    }

    return NextResponse.json({
      matches,
      success: true
    });

  } catch (error) {
    console.error("Error creating matches:", error);
    return NextResponse.json(
      { error: "Failed to create matches" },
      { status: 500 }
    );
  }
}