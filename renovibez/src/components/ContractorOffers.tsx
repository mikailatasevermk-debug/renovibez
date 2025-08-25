"use client";

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Euro, Shield, MessageCircle, Calendar } from 'lucide-react';

interface Match {
  id: string;
  status: string;
  offerPrice: number;
  offerDetails: string;
  contractor: {
    id: string;
    businessName: string;
    rating: number;
    reviewCount: number;
    yearsExperience: number;
    verified: boolean;
    user: {
      name: string;
      image?: string;
    };
  };
}

interface ContractorOffersProps {
  matches: Match[];
  onAcceptOffer: (matchId: string) => Promise<void>;
  onScheduleVisit: (matchId: string) => Promise<void>;
}

export default function ContractorOffers({ matches, onAcceptOffer, onScheduleVisit }: ContractorOffersProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleAcceptOffer = async (matchId: string) => {
    setLoading(matchId);
    try {
      await onAcceptOffer(matchId);
    } finally {
      setLoading(null);
    }
  };

  const handleScheduleVisit = async (matchId: string) => {
    setLoading(matchId);
    try {
      await onScheduleVisit(matchId);
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-neutral-800 mb-4">
          Your Contractor Offers
        </h1>
        <p className="text-xl text-neutral-600">
          We&apos;ve found 3 qualified contractors for your project. All contractor names remain hidden until you schedule a site visit.
        </p>
      </div>

      <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
        {matches.map((match, index) => (
          <Card key={match.id} className="glass-card hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="p-6">
              {/* Contractor Header - Names Hidden */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-terracotta/80 to-terracotta rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {String.fromCharCode(65 + index)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-neutral-800">
                      Contractor {String.fromCharCode(65 + index)}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {match.contractor.yearsExperience} years experience
                    </p>
                  </div>
                </div>
                {match.contractor.verified && (
                  <Shield className="h-5 w-5 text-green-600" />
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(match.contractor.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-neutral-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-neutral-600">
                  {match.contractor.rating.toFixed(1)} ({match.contractor.reviewCount} reviews)
                </span>
              </div>

              {/* Offer Price */}
              <div className="bg-terracotta/5 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 text-terracotta mr-2" />
                    <span className="text-sm font-medium text-terracotta">Offer Price</span>
                  </div>
                  <span className="text-2xl font-bold text-terracotta">
                    €{match.offerPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Offer Details */}
              <p className="text-sm text-neutral-700 mb-6">
                {match.offerDetails}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                {match.status === 'OFFERED' && (
                  <>
                    <Button
                      onClick={() => handleScheduleVisit(match.id)}
                      disabled={loading === match.id}
                      className="w-full bg-terracotta hover:bg-terracotta/90 text-white"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      {loading === match.id ? 'Scheduling...' : 'Schedule Site Visit'}
                    </Button>
                    <Button
                      onClick={() => handleAcceptOffer(match.id)}
                      disabled={loading === match.id}
                      variant="outline"
                      className="w-full border-terracotta text-terracotta hover:bg-terracotta/5"
                    >
                      {loading === match.id ? 'Accepting...' : 'Accept Offer'}
                    </Button>
                  </>
                )}
                
                {match.status === 'ACCEPTED' && (
                  <div className="text-center">
                    <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-3">
                      ✅ Offer Accepted
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Contact {match.contractor.user.name}
                    </Button>
                  </div>
                )}

                {match.status === 'SITE_VISIT_SCHEDULED' && (
                  <div className="text-center">
                    <div className="bg-blue-50 text-blue-700 p-3 rounded-lg mb-3">
                      📅 Site Visit Scheduled
                    </div>
                    <p className="text-sm text-neutral-600 mb-3">
                      Contractor name revealed after site visit confirmation
                    </p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Contractor
                    </Button>
                  </div>
                )}

                {match.status === 'DECLINED' && (
                  <div className="bg-neutral-100 text-neutral-600 p-3 rounded-lg text-center">
                    Offer Declined
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto">
          <h3 className="font-semibold text-blue-900 mb-2">How it works:</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• All contractors are pre-vetted and verified</li>
            <li>• Contractor names stay hidden until you schedule a site visit</li>
            <li>• Chat is unlocked only after you accept an offer or schedule a visit</li>
            <li>• You can compare all offers before making a decision</li>
          </ul>
        </div>
      </div>
    </div>
  );
}