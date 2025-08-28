"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, MessageSquare, Users, CheckCircle } from "lucide-react";
import Link from "next/link";

interface Match {
  matchId: string;
  label: string;
  rating: number;
  reviewCount: number;
  city: string;
  specialties: string[];
  nameRevealed: boolean;
  contractor?: {
    name?: string;
  };
}

function MatchesContent() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const requestId = searchParams.get('requestId');

  useEffect(() => {
    if (!requestId) {
      setError('Request ID is missing');
      setLoading(false);
      return;
    }

    // In this implementation, we'll simulate fetching matches
    // In a real app, you'd have an API endpoint to get matches by requestId
    fetchMatches();
  }, [requestId]);

  const fetchMatches = async () => {
    try {
      // For demo purposes, we'll create mock matches
      // In a real app, you'd call: GET /api/matches?requestId=${requestId}
      const mockMatches: Match[] = [
        {
          matchId: "match-1",
          label: "A",
          rating: 4.8,
          reviewCount: 23,
          city: "Amsterdam",
          specialties: ["Badkamer", "Keuken", "Algemeen"],
          nameRevealed: false
        },
        {
          matchId: "match-2", 
          label: "B",
          rating: 4.6,
          reviewCount: 31,
          city: "Amsterdam",
          specialties: ["Keuken", "Woonkamer", "Afwerking"],
          nameRevealed: false
        },
        {
          matchId: "match-3",
          label: "C",
          rating: 4.9,
          reviewCount: 18,
          city: "Amsterdam",
          specialties: ["Algemeen", "Badkamer", "Tegel"],
          nameRevealed: false
        }
      ];
      
      setMatches(mockMatches);
      setLoading(false);
    } catch {
      setError('Failed to load matches');
      setLoading(false);
    }
  };

  const handleAcceptMatch = async (matchId: string) => {
    // Handle accepting the match - navigate to chat
    window.location.href = `/nl/chat/${matchId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
            <p className="mt-4 text-ink">Uw matches worden geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
            <Link href="/nl/projecten" className="mt-4 inline-block">
              <Button>Terug naar projecten</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink mb-2">
            Uw matches
          </h1>
          <p className="text-muted-foreground">
            We hebben 3 gekwalificeerde aannemers gevonden voor uw project
          </p>
        </div>

        {/* Status bar */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm text-ink">Alle aannemers zijn geverifieerd en verzekerd</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-terracotta" />
              <span className="text-sm text-ink">{matches.length} aannemers beschikbaar</span>
            </div>
          </div>
        </div>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {matches.map((match) => (
            <Card key={match.matchId} className="glass-card p-6">
              {/* Anonieme label */}
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {match.label}
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{match.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">({match.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{match.city}</span>
              </div>

              {/* Specialties */}
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Specialiteiten:</p>
                <div className="flex flex-wrap gap-1">
                  {match.specialties.map((specialty, idx) => (
                    <span 
                      key={idx}
                      className="px-2 py-1 bg-terracotta/10 text-terracotta text-xs rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action button */}
              <Button 
                onClick={() => handleAcceptMatch(match.matchId)}
                className="w-full"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start gesprek
              </Button>
            </Card>
          ))}
        </div>

        {/* Info section */}
        <div className="mt-12 bg-white p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Hoe het werkt</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-terracotta font-semibold text-sm">1</span>
              </div>
              <div>
                <p className="font-medium">Start een gesprek</p>
                <p className="text-sm text-muted-foreground">Chat anoniem met de aannemers om uw project te bespreken</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-terracotta font-semibold text-sm">2</span>
              </div>
              <div>
                <p className="font-medium">Ontvang offertes</p>
                <p className="text-sm text-muted-foreground">Krijg gedetailleerde prijsopgaven van geïnteresseerde aannemers</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-terracotta/10 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-terracotta font-semibold text-sm">3</span>
              </div>
              <div>
                <p className="font-medium">Kies uw aannemer</p>
                <p className="text-sm text-muted-foreground">Selecteer de beste optie en onthul contactgegevens wanneer u klaar bent</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg p-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-terracotta mx-auto"></div>
            <p className="mt-4 text-ink">Laden...</p>
          </div>
        </div>
      </div>
    }>
      <MatchesContent />
    </Suspense>
  );
}