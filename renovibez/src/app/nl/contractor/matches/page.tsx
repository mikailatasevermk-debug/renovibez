import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function ContractorMatches() {
  const session = await auth();

  // Redirect if not authenticated or not a contractor
  if (!session?.user) {
    redirect("/nl/contractor/login");
  }

  if (session.user.role !== "CONTRACTOR") {
    redirect("/nl");
  }

  // Get contractor profile
  const contractor = await prisma.contractor.findFirst({
    where: { userId: session.user.id },
  });

  if (!contractor) {
    return (
      <div className="min-h-screen" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 py-8">
          <Card className="glass-card border-0 p-8 text-center">
            <h1 className="text-2xl font-bold text-ink mb-4">
              Geen Aannemersprofiel Gevonden
            </h1>
            <p className="text-muted-foreground">
              Er is geen aannemersprofiel gekoppeld aan uw account.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // Get matches for this contractor
  const matches = await prisma.match.findMany({
    where: {
      contractorId: contractor.id,
    },
    include: {
      user: true,
      template: true,
      messages: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  // Count unread messages (simplified - any message from user that contractor hasn't replied to recently)
  const matchesWithUnread = await Promise.all(
    matches.map(async (match) => {
      const lastMessage = match.messages[0];
      const unreadCount = lastMessage && lastMessage.authorUserId 
        ? await prisma.message.count({
            where: {
              matchId: match.id,
              authorUserId: { not: null },
              createdAt: { gt: lastMessage.createdAt },
            },
          })
        : 0;

      return {
        ...match,
        unreadCount,
      };
    })
  );

  const statusLabels = {
    MATCHED: "Nieuw",
    CHATTING: "In gesprek",
    VISIT_PROPOSED: "Bezoek voorgesteld",
    VISIT_CONFIRMED: "Bezoek bevestigd",
    COMPLETED: "Afgerond",
    CANCELLED: "Geannuleerd",
  };

  const statusColors = {
    MATCHED: "bg-blue-100 text-blue-700",
    CHATTING: "bg-green-100 text-green-700", 
    VISIT_PROPOSED: "bg-terracotta/10 text-terracotta",
    VISIT_CONFIRMED: "bg-purple-100 text-purple-700",
    COMPLETED: "bg-gray-100 text-gray-700",
    CANCELLED: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-ink">
                Mijn Matches
              </h1>
              <p className="text-muted-foreground">
                {contractor.companyName} - {matches.length} actieve matches
              </p>
            </div>
            
            <Link href="/nl/contractor/dashboard">
              <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                Terug naar Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {matches.length === 0 ? (
          <Card className="glass-card border-0 p-8 text-center">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-bold text-ink mb-2">
              Nog geen matches
            </h2>
            <p className="text-muted-foreground mb-6">
              Zodra klanten u selecteren voor hun project, verschijnen de matches hier.
            </p>
          </Card>
        ) : (
          <div className="space-y-4">
            {matchesWithUnread.map((match) => (
              <Card key={match.id} className="glass-card border-0 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-muted-foreground mr-1" />
                          <span className="font-medium text-ink">
                            {match.nameRevealed ? match.user.name : "Klant"}
                          </span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[match.status]}`}>
                          {statusLabels[match.status]}
                        </span>
                        {match.unreadCount > 0 && (
                          <span className="bg-terracotta text-white px-2 py-1 rounded-full text-xs font-medium">
                            {match.unreadCount} nieuwe berichten
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(match.updatedAt).toLocaleDateString('nl-NL')}
                      </div>
                    </div>

                    <div className="mb-3">
                      <h3 className="font-semibold text-ink mb-1">
                        {match.template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {match.template.summary}
                      </p>
                    </div>

                    {match.messages.length > 0 && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-muted-foreground mb-1">
                          Laatste bericht:
                        </p>
                        <p className="text-sm text-ink">
                          {match.messages[0].content.substring(0, 100)}
                          {match.messages[0].content.length > 100 ? "..." : ""}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="ml-6">
                    <Link href={`/nl/chat/${match.id}`}>
                      <Button className="bg-terracotta hover:bg-terracotta/90">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Chat openen
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}