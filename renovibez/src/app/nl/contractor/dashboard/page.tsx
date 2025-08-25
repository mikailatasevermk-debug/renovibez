import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HardHat, MessageSquare, Calendar, Star } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import Link from "next/link";

export default async function ContractorDashboard() {
  const session = await auth();

  // Redirect if not authenticated or not a contractor
  if (!session?.user) {
    redirect("/nl/contractor/login");
  }

  if (session.user.role !== "CONTRACTOR") {
    redirect("/nl");
  }

  // Get contractor profile and stats
  const contractor = await prisma.contractor.findFirst({
    where: { userId: session.user.id },
    include: {
      matches: {
        include: {
          messages: true,
          visits: true,
        },
      },
    },
  });

  const stats = {
    activeChats: contractor?.matches.filter(m => m.status === 'CHATTING' || m.status === 'MATCHED').length || 0,
    scheduledVisits: contractor?.matches.filter(m => m.status === 'VISIT_CONFIRMED').length || 0,
    rating: contractor?.rating || 4.8,
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-terracotta/10 rounded-full mr-4">
                <HardHat className="h-6 w-6 text-terracotta" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-ink">
                  Aannemer Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Welkom {session.user.email}
                </p>
              </div>
            </div>
            
            <LogoutButton 
              variant="outline" 
              className="border-terracotta text-terracotta hover:bg-terracotta/10"
              callbackUrl="/nl"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <Card className="glass-card border-0 p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
              <HardHat className="h-8 w-8 text-terracotta" />
            </div>
            <h2 className="text-3xl font-bold text-ink mb-2">
              Welkom bij Renovibez Pro
            </h2>
            <p className="text-muted-foreground mb-6">
              Hier kunt u uw projecten beheren, met klanten communiceren en nieuwe opdrachten ontvangen.
            </p>
            <div className="bg-terracotta/5 border border-terracotta/20 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-terracotta font-medium">
                🚧 Deze dashboard is momenteel in ontwikkeling
              </p>
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/nl/contractor/matches">
            <Card className="glass-card border-0 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MessageSquare className="h-8 w-8 text-terracotta mr-3" />
                  <div>
                    <h3 className="font-semibold text-ink">Actieve Chats</h3>
                    <p className="text-2xl font-bold text-terracotta">{stats.activeChats}</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Matches en berichten van klanten
              </p>
            </Card>
          </Link>

          <Card className="glass-card border-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-terracotta mr-3" />
                <div>
                  <h3 className="font-semibold text-ink">Bezoeken</h3>
                  <p className="text-2xl font-bold text-terracotta">{stats.scheduledVisits}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Ingeplande klantbezoeken
            </p>
          </Card>

          <Card className="glass-card border-0 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-terracotta mr-3" />
                <div>
                  <h3 className="font-semibold text-ink">Beoordeling</h3>
                  <p className="text-2xl font-bold text-terracotta">{stats.rating}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Gemiddelde klantbeoordeling
            </p>
          </Card>
        </div>

        {/* Coming Soon Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card border-0 p-6">
            <h3 className="text-xl font-bold text-ink mb-4">Binnenkort Beschikbaar</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-terracotta rounded-full mr-3"></div>
                <span className="text-muted-foreground">Project management dashboard</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-terracotta rounded-full mr-3"></div>
                <span className="text-muted-foreground">Geïntegreerde chat & notificaties</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-terracotta rounded-full mr-3"></div>
                <span className="text-muted-foreground">Offerte templates & calculators</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-terracotta rounded-full mr-3"></div>
                <span className="text-muted-foreground">Klant reviews & portfolio</span>
              </div>
            </div>
          </Card>

          <Card className="glass-card border-0 p-6">
            <h3 className="text-xl font-bold text-ink mb-4">Ondersteuning</h3>
            <p className="text-muted-foreground mb-4">
              Heeft u vragen over het platform of heeft u hulp nodig? 
              Ons support team staat voor u klaar.
            </p>
            <Button 
              variant="outline" 
              className="border-terracotta text-terracotta hover:bg-terracotta/10"
            >
              Contact Support
            </Button>
          </Card>
        </div>
      </main>
    </div>
  );
}