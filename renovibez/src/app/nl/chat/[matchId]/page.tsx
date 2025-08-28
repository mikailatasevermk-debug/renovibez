"use client";

import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Send, 
  Calendar, 
  Shield, 
  Info, 
  User
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  content: string;
  authorUserId: string | null;
  authorContractorId: string | null;
  isFiltered: boolean;
  createdAt: string;
}

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

interface Visit {
  id: string;
  proposedSlots: string[];
  scheduledAt: string | null;
  status: 'PROPOSED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export default function ChatPage({ params }: { params: Promise<{ matchId: string }> }) {
  const [matchId, setMatchId] = useState<string>('');
  const [match, setMatch] = useState<Match | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [visit, setVisit] = useState<Visit | null>(null);
  const [showVisitScheduler, setShowVisitScheduler] = useState(false);
  const [proposedSlots, setProposedSlots] = useState<string[]>(['']);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    params.then(({ matchId }) => {
      setMatchId(matchId);
      fetchMatchDetails(matchId);
      fetchMessages(matchId);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMatchDetails = async (matchId: string) => {
    try {
      // Mock match details for demo
      const mockMatch: Match = {
        matchId: matchId,
        label: "A",
        rating: 4.8,
        reviewCount: 23,
        city: "Amsterdam",
        specialties: ["Badkamer", "Keuken", "Algemeen"],
        nameRevealed: false
      };
      setMatch(mockMatch);
    } catch (error) {
      console.error('Error fetching match details:', error);
    }
  };

  const fetchMessages = async (matchId: string) => {
    try {
      const response = await fetch(`/api/chat/${matchId}/messages`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      
      const data = await response.json();
      setMessages(data.messages || []);
      
      // Update match nameRevealed status from API response
      if (match) {
        setMatch({ ...match, nameRevealed: data.nameRevealed });
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const response = await fetch(`/api/chat/${matchId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newMessage,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
      setNewMessage('');
      
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const proposeVisit = async () => {
    const validSlots = proposedSlots.filter(slot => slot.trim() !== '');
    if (validSlots.length === 0) return;

    try {
      // Mock visit proposal
      const mockVisit: Visit = {
        id: 'visit-1',
        proposedSlots: validSlots,
        scheduledAt: null,
        status: 'PROPOSED'
      };
      
      setVisit(mockVisit);
      setShowVisitScheduler(false);
      
      // Add system message
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `Bezoek voorgesteld voor: ${validSlots.join(', ')}`,
        authorUserId: "system",
        authorContractorId: null,
        isFiltered: false,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, systemMessage]);
    } catch (error) {
      console.error('Error proposing visit:', error);
    }
  };

  const acceptVisit = async (slot: string) => {
    if (!visit) return;

    try {
      // Mock accepting visit and revealing name
      const updatedMatch = { ...match!, nameRevealed: true, contractor: { companyName: "Renovatie Pro Amsterdam" }};
      const updatedVisit = { ...visit, scheduledAt: slot, status: 'CONFIRMED' as const };
      
      setMatch(updatedMatch);
      setVisit(updatedVisit);
      
      // Add system message
      const systemMessage: Message = {
        id: Date.now().toString(),
        content: `Bezoek bevestigd voor ${new Date(slot).toLocaleDateString('nl-NL')}. Identiteit aannemer onthuld!`,
        authorUserId: "system",
        authorContractorId: null,
        isFiltered: false,
        createdAt: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, systemMessage]);
    } catch (error) {
      console.error('Error accepting visit:', error);
    }
  };

  const addProposedSlot = () => {
    setProposedSlots(prev => [...prev, '']);
  };

  const updateProposedSlot = (index: number, value: string) => {
    setProposedSlots(prev => prev.map((slot, i) => i === index ? value : slot));
  };

  const removeProposedSlot = (index: number) => {
    setProposedSlots(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-terracotta mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chat wordt geladen...</p>
        </div>
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Match niet gevonden</p>
          <Link href="/nl/matches">
            <Button className="bg-terracotta text-white hover:bg-terracotta/90">
              Terug naar Matches
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/nl/matches">
                <Button variant="ghost" size="sm" className="mr-3">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="font-semibold text-ink">
                  {match.nameRevealed && match.contractor 
                    ? match.contractor.companyName 
                    : `Aannemer ${match.label}`}
                </h1>
                <div className="flex items-center text-sm text-muted-foreground">
                  <span className="mr-2">{match.city}</span>
                  <span>★ {match.rating} ({match.reviewCount})</span>
                </div>
              </div>
            </div>
            
            {!match.nameRevealed && (
              <div className="flex items-center bg-terracotta/10 px-3 py-1 rounded-full">
                <Shield className="h-4 w-4 text-terracotta mr-2" />
                <span className="text-sm text-terracotta font-medium">Anoniem</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Anonymity Banner */}
      {!match.nameRevealed && (
        <div className="bg-terracotta/5 border-b border-terracotta/20 px-4 py-3">
          <div className="container mx-auto">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-terracotta flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="text-terracotta font-medium mb-1">Anonieme Chat Actief</p>
                <p className="text-muted-foreground">
                  Persoonlijke informatie wordt automatisch gecensureerd. De identiteit van de aannemer wordt onthuld nadat u een bezoek plant.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-4">
          {messages.map((message) => {
            const isUser = message.authorUserId !== null && message.authorUserId !== 'system';
            const isSystem = message.authorUserId === 'system';
            
            if (isSystem) {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-muted px-3 py-2 rounded-full text-sm text-muted-foreground">
                    {message.content}
                  </div>
                </div>
              );
            }
            
            return (
              <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-4 rounded-2xl ${
                  isUser 
                    ? 'bg-terracotta text-white' 
                    : 'glass-card border-0'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    <User className="h-3 w-3" />
                    <span className="text-xs opacity-75">
                      {isUser ? 'U' : `Aannemer ${match.label}`}
                    </span>
                    <span className="text-xs opacity-50">
                      {new Date(message.createdAt).toLocaleTimeString('nl-NL', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  {message.isFiltered && (
                    <div className="text-xs opacity-75 mt-1">
                      ••• Bericht automatisch gefilterd
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Visit Scheduler */}
      {visit && visit.status === 'PROPOSED' && (
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <Card className="glass-card border-0 p-6">
            <h3 className="font-semibold text-ink mb-4">Bezoek Gepland</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Kies een tijdslot om het bezoek te bevestigen:
            </p>
            <div className="grid gap-2">
              {visit.proposedSlots.map((slot, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => acceptVisit(slot)}
                  className="justify-start border-terracotta text-terracotta hover:bg-terracotta/10"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {new Date(slot).toLocaleDateString('nl-NL', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Visit Scheduler Modal */}
      {showVisitScheduler && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="glass-card border-0 p-6 w-full max-w-md">
            <h3 className="font-semibold text-ink mb-4">Bezoek Voorstellen</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Stel enkele tijdstippen voor wanneer de aannemer langs kan komen:
            </p>
            <div className="space-y-3 mb-6">
              {proposedSlots.map((slot, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    type="datetime-local"
                    value={slot}
                    onChange={(e) => updateProposedSlot(index, e.target.value)}
                    className="flex-1"
                    min={new Date().toISOString().slice(0, 16)}
                  />
                  {proposedSlots.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeProposedSlot(index)}
                    >
                      ×
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mb-4">
              <Button variant="outline" onClick={addProposedSlot}>
                + Tijdslot Toevoegen
              </Button>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowVisitScheduler(false)}
                className="flex-1"
              >
                Annuleren
              </Button>
              <Button 
                onClick={proposeVisit}
                className="flex-1 bg-terracotta text-white hover:bg-terracotta/90"
              >
                Voorstellen
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Message Input */}
      <div className="bg-white border-t border-border sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <div className="flex gap-2 items-end">
            <div className="flex-1">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={match.nameRevealed ? "Typ uw bericht..." : "Typ uw bericht... (persoonlijke info wordt gefilterd)"}
                className="w-full"
                maxLength={1000}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim() || sending}
              className="bg-terracotta text-white hover:bg-terracotta/90"
            >
              <Send className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowVisitScheduler(true)}
              className="border-terracotta text-terracotta hover:bg-terracotta/10"
            >
              <Calendar className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {newMessage.length}/1000 karakters
            {!match.nameRevealed && " • Contactgegevens worden automatisch gecensureerd"}
          </div>
        </div>
      </div>
    </div>
  );
}