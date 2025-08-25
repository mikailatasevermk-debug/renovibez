import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Eye } from "lucide-react";
import Link from "next/link";

const inspirationBoards = [
  {
    id: 1,
    title: "Moderne Keuken Trends",
    description: "Minimalistische designs met warme accenten",
    category: "Keuken",
    image: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
    projectFilter: "keuken",
    likes: 284,
    views: 1200
  },
  {
    id: 2,
    title: "Luxe Badkamer Ontwerpen",
    description: "Spa-gevoel in uw eigen badkamer",
    category: "Badkamer", 
    image: "linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)",
    projectFilter: "badkamer",
    likes: 156,
    views: 890
  },
  {
    id: 3,
    title: "Sfeervolle Woonkamers",
    description: "Warme tinten en natuurlijke materialen",
    category: "Woonkamer",
    image: "linear-gradient(135deg, #fed7d7 0%, #f56565 100%)",
    projectFilter: "woonkamer",
    likes: 203,
    views: 950
  },
  {
    id: 4,
    title: "Slaapkamer Sereniteit",
    description: "Rustgevende kleuren en zachte texturen",
    category: "Slaapkamer",
    image: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    projectFilter: "slaapkamer",
    likes: 167,
    views: 720
  },
  {
    id: 5,
    title: "Buitenruimte Paradise",
    description: "Terrasoverkappingen en tuinkamers",
    category: "Buitenruimte",
    image: "linear-gradient(135deg, #d1fae5 0%, #10b981 100%)",
    projectFilter: "buitenruimte",
    likes: 89,
    views: 445
  },
  {
    id: 6,
    title: "Home Office Inspiratie",
    description: "Productieve en stijlvolle werkruimtes",
    category: "Thuiskantoor",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    projectFilter: "thuiskantoor",
    likes: 134,
    views: 678
  }
];

export default function Inspiratie() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
            Inspiratie voor uw droomhuis
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Ontdek creatieve ideeën en moodboards om uw renovatieproject vorm te geven.
            Geen prijzen, geen druk - alleen pure inspiratie.
          </p>
        </div>
      </section>

      {/* Inspiration Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {inspirationBoards.map((board) => (
              <Card 
                key={board.id}
                className="glass-card border-0 overflow-hidden motion-safe-hover hover:shadow-xl hover:-translate-y-2"
              >
                {/* Image/Moodboard */}
                <div 
                  className="aspect-[4/3] relative"
                  style={{ background: board.image }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Stats Overlay */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="glass px-2 py-1 rounded-full flex items-center gap-1 text-xs text-white">
                      <Heart className="h-3 w-3" />
                      {board.likes}
                    </div>
                    <div className="glass px-2 py-1 rounded-full flex items-center gap-1 text-xs text-white">
                      <Eye className="h-3 w-3" />
                      {board.views}
                    </div>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                      {board.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-ink">{board.title}</h3>
                  <p className="text-muted-foreground mb-6">{board.description}</p>
                  
                  <Link href={`/nl/projecten?filter=${board.projectFilter}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-terracotta text-terracotta hover:bg-terracotta/10"
                    >
                      Bekijk Gerelateerde Projecten
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-8 border-0">
            <h3 className="text-2xl font-bold mb-4 text-ink">
              Klaar om uw ideeën werkelijkheid te maken?
            </h3>
            <p className="text-muted-foreground mb-6">
              Bekijk onze renovatiepakketten en ontvang binnen 24 uur 3 persoonlijke offertes.
            </p>
            <Link href="/nl/projecten">
              <Button className="bg-terracotta text-white hover:bg-terracotta/90 px-8 py-3">
                Start uw renovatie
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}