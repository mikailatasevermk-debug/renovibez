import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sanitizeMessage, validateMessageSending } from "@/lib/sanitize";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !session.user.role) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // Verify user has access to this match based on role
    let match;
    
    if (session.user.role === "CONSUMER") {
      // Consumer can access matches where they are the userId
      match = await prisma.match.findFirst({
        where: {
          id: matchId,
          userId: session.user.id,
        },
        include: {
          contractor: true,
        },
      });
    } else if (session.user.role === "CONTRACTOR") {
      // Contractor can access matches where they own the contractor profile
      match = await prisma.match.findFirst({
        where: {
          id: matchId,
          contractor: {
            userId: session.user.id,
          },
        },
        include: {
          contractor: true,
          user: true,
        },
      });
    }

    if (!match) {
      return NextResponse.json(
        { error: "Match not found or access denied" },
        { status: 404 }
      );
    }

    // Get all messages for this match
    const messages = await prisma.message.findMany({
      where: {
        matchId: matchId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    // Sanitize messages if names are not revealed
    const sanitizedMessages = messages.map(message => {
      const shouldSanitize = !match.nameRevealed;
      
      if (shouldSanitize && !message.isFiltered) {
        const { sanitized, isFiltered } = sanitizeMessage(message.content, true);
        return {
          ...message,
          content: sanitized,
          isFiltered: isFiltered,
        };
      }
      
      return message;
    });

    return NextResponse.json({
      messages: sanitizedMessages,
      nameRevealed: match.nameRevealed,
    });

  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ matchId: string }> }
) {
  try {
    const { matchId } = await params;
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id || !session.user.role) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { content } = body;

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json(
        { error: "Message content is required" },
        { status: 400 }
      );
    }

    if (content.length > 1000) {
      return NextResponse.json(
        { error: "Message too long (max 1000 characters)" },
        { status: 400 }
      );
    }

    // Verify user has access to this match based on role
    let match;
    let contractorId = null;
    
    if (session.user.role === "CONSUMER") {
      // Consumer can access matches where they are the userId
      match = await prisma.match.findFirst({
        where: {
          id: matchId,
          userId: session.user.id,
        },
        include: {
          contractor: true,
        },
      });
    } else if (session.user.role === "CONTRACTOR") {
      // Contractor can access matches where they own the contractor profile
      match = await prisma.match.findFirst({
        where: {
          id: matchId,
          contractor: {
            userId: session.user.id,
          },
        },
        include: {
          contractor: true,
          user: true,
        },
      });
      
      // Get the contractor ID for message authoring
      if (match) {
        const contractor = await prisma.contractor.findFirst({
          where: { userId: session.user.id },
        });
        contractorId = contractor?.id;
      }
    }

    if (!match) {
      return NextResponse.json(
        { error: "Match not found or access denied" },
        { status: 404 }
      );
    }

    // Get recent messages for rate limiting
    const recentMessages = await prisma.message.findMany({
      where: {
        matchId: matchId,
        createdAt: {
          gte: new Date(Date.now() - 5 * 60 * 1000), // Last 5 minutes
        },
      },
    });

    // Validate rate limiting
    const validation = validateMessageSending(session.user.id, recentMessages);
    if (!validation.canSend) {
      return NextResponse.json(
        { error: validation.reason },
        { status: 429 }
      );
    }

    // Sanitize the message content if names are not revealed
    const { sanitized, isFiltered } = sanitizeMessage(content, !match.nameRevealed);

    // Create the message with proper author field based on role
    const messageData = {
      matchId: matchId,
      content: sanitized,
      isFiltered: isFiltered,
      authorUserId: session.user.role === "CONSUMER" ? session.user.id : null,
      authorContractorId: session.user.role === "CONTRACTOR" ? session.user.id : null,
    };

    const message = await prisma.message.create({
      data: messageData,
    });

    // Update match status to CHATTING if it's still MATCHED
    if (match.status === 'MATCHED') {
      await prisma.match.update({
        where: { id: matchId },
        data: { status: 'CHATTING' },
      });
    }

    return NextResponse.json({
      message: message,
      success: true,
    });

  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}