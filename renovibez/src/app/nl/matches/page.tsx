"use client";

import { useEffect, useState } from "react";
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
    companyName: string;
  };
}

export default function MatchesPage() {
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
          city: "Haarlem",
          specialties: ["Badkamer", "Slaapkamer", "Loodgieterwerk"],
          nameRevealed: false
        }
      ];

      setMatches(mockMatches);
    } catch (err) {
      setError('Failed to load matches');
      console.error('Error fetching matches:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta mx-auto mb-4"></div>
          <p className="text-muted-foreground">Matches worden geladen...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/nl/projecten">
            <Button className="bg-terracotta text-white hover:bg-terracotta/90">
              Terug naar Projecten
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="h-12 w-12 text-terracotta mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-ink">
              Perfect gematcht!
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Wij hebben 3 geverifieerde aannemers voor u geselecteerd. 
            Start een chat om uw project te bespreken en plan een bezoek in.
          </p>
        </div>
      </section>

      {/* Anonymous Matching Info */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card border-0 p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="bg-terracotta/10 p-3 rounded-full">
                <Users className="h-6 w-6 text-terracotta" />
              </div>
              <div>
                <h3 className="font-semibold text-ink mb-2">Anonieme Matching Actief</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  De aannemers zijn gelabeld als A, B en C om eerlijke vergelijking te garanderen. 
                  Hun identiteit wordt pas onthuld nadat u een bezoek plant.
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Alle aannemers zijn geverifieerd</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Beoordeeld op vakmanschap</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Matches Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {matches.map((match) => (
              <Card key={match.matchId} className="glass-card border-0 overflow-hidden">
                {/* Header with Label */}
                <div className="bg-terracotta text-white p-6 text-center">
                  <div className="text-3xl font-bold mb-2">Aannemer {match.label}</div>
                  {match.nameRevealed && match.contractor ? (
                    <div className="text-sm opacity-90">{match.contractor.companyName}</div>
                  ) : (
                    <div className="text-sm opacity-75">Identiteit verborgen</div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${
                              i < Math.floor(match.rating) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-ink">{match.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({match.reviewCount} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center justify-center mb-4 text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{match.city}</span>
                  </div>

                  {/* Specialties */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-ink mb-2">Specialisaties:</div>
                    <div className="flex flex-wrap gap-1">
                      {match.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-terracotta/10 text-terracotta px-2 py-1 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <Link href={`/nl/chat/${match.matchId}`}>
                      <Button className="w-full bg-terracotta text-white hover:bg-terracotta/90">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Start Chat
                      </Button>
                    </Link>
                    {match.nameRevealed && (
                      <div className="text-center">
                        <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Identiteit onthuld
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="glass-card border-0 p-8">
            <h3 className="text-2xl font-bold text-center mb-6 text-ink">
              Volgende Stappen
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-terracotta/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-terracotta font-bold">1</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Chat & Vergelijk</h4>
                <p className="text-sm text-muted-foreground">
                  Start gesprekken met de aannemers. Bespreek uw wensen en stel vragen.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-terracotta/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-terracotta font-bold">2</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Plan Bezoek</h4>
                <p className="text-sm text-muted-foreground">
                  Plan een bezoek in voor een persoonlijke offerte en kennismaking.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-terracotta/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-terracotta font-bold">3</span>
                </div>
                <h4 className="font-semibold text-ink mb-2">Kies & Start</h4>
                <p className="text-sm text-muted-foreground">
                  Kies de beste aannemer en start uw droomrenovatie!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}