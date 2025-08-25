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
    const { templateIds, scope } = body;

    // Validate exactly 3 templateIds
    if (!templateIds || !Array.isArray(templateIds) || templateIds.length !== 3) {
      return NextResponse.json(
        { error: "Exactly 3 templateIds are required" },
        { status: 400 }
      );
    }

    // Validate scope
    if (!scope || !Array.isArray(scope)) {
      return NextResponse.json(
        { error: "Scope is required" },
        { status: 400 }
      );
    }

    // Validate that all templateIds exist (using our hardcoded IDs for now)
    const validTemplateIds = [1, 2, 3, 4, 5, 6];
    const invalidIds = templateIds.filter(id => !validTemplateIds.includes(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid template IDs: ${invalidIds.join(', ')}` },
        { status: 400 }
      );
    }

    // Create RenovationRequest
    const renovationRequest = await prisma.renovationRequest.create({
      data: {
        userId: session.user.id,
        scope: JSON.stringify(scope),
      },
    });

    // Create RequestTemplate entries for each selected template
    const requestTemplateData = templateIds.map((templateId: number, index: number) => ({
      requestId: renovationRequest.id,
      templateId: templateId.toString(), // Convert to string as required by schema
      order: index + 1,
    }));

    await prisma.requestTemplate.createMany({
      data: requestTemplateData,
    });

    return NextResponse.json({ 
      requestId: renovationRequest.id,
      success: true 
    });

  } catch (error) {
    console.error("Error creating renovation request:", error);
    return NextResponse.json(
      { error: "Failed to create renovation request" },
      { status: 500 }
    );
  }
}