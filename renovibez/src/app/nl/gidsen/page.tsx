import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Clock, User } from "lucide-react";
import Link from "next/link";

const guides = [
  {
    id: 1,
    slug: "waarom-anonieme-matching-eerlijker-is",
    title: "Waarom anonieme matching eerlijker is (en vaak goedkoper)",
    description: "Ontdek hoe anonieme matching vooroordelen wegneemt en tot betere prijzen en kwaliteit leidt.",
    category: "Matching Proces",
    readTime: "5 min",
    author: "Renovibez Team",
    image: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)",
    excerpt: "Traditionele aannemerselectie wordt vaak beïnvloed door vooroordelen en netwerken. Ons anonieme matching systeem zorgt voor eerlijke concurrentie en betere resultaten voor consumenten."
  },
  {
    id: 2,
    slug: "renovatie-budget-plannen",
    title: "Renovatie Budget: Complete Planning Gids",
    description: "Praktische tips voor het opstellen van een realistisch renovatiebudget.",
    category: "Budgettering",
    readTime: "8 min", 
    author: "Renovibez Team",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    excerpt: "Een goed budget is de basis van elke succesvolle renovatie. Leer hoe je onverwachte kosten vermijdt en slim plant voor je droomproject."
  },
  {
    id: 3,
    slug: "aannemer-selectie-checklist",
    title: "De Ultieme Aannemer Selectie Checklist",
    description: "Alle vragen die je moet stellen voordat je een aannemer kiest.",
    category: "Aannemer Selectie",
    readTime: "6 min",
    author: "Renovibez Team", 
    image: "linear-gradient(135deg, #fed7d7 0%, #f56565 100%)",
    excerpt: "De juiste aannemer kiezen bepaalt het succes van je renovatie. Deze checklist helpt je de beste professionals te herkennen en valkuilen te vermijden."
  },
  {
    id: 4,
    slug: "vergunningen-en-regelgeving",
    title: "Vergunningen en Regelgeving: Wat Moet je Weten",
    description: "Overzicht van bouwvergunningen en regelgeving voor verschillende projecten.",
    category: "Wet & Regelgeving",
    readTime: "10 min",
    author: "Renovibez Team",
    image: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    excerpt: "Navigeer door de complexe wereld van bouwvergunningen. Wij leggen uit wanneer je welke vergunningen nodig hebt en hoe je deze aanvraagt."
  },
  {
    id: 5,
    slug: "duurzaamheid-in-renovaties",
    title: "Duurzaam Renoveren: Gids voor Eco-vriendelijke Keuzes",
    description: "Hoe je je renovatie milieuvriendelijk en energiezuinig maakt.",
    category: "Duurzaamheid",
    readTime: "7 min",
    author: "Renovibez Team",
    image: "linear-gradient(135deg, #d1fae5 0%, #10b981 100%)",
    excerpt: "Maak je renovatie toekomstbestendig met duurzame materialen en energiezuinige oplossingen. Goed voor het milieu én je portemonnee."
  },
  {
    id: 6,
    slug: "tijdplanning-renovatieproject",
    title: "Tijdplanning: Van Start tot Oplevering",
    description: "Realistische planning voor verschillende soorten renovatieprojecten.",
    category: "Projectbeheer",
    readTime: "9 min",
    author: "Renovibez Team",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    excerpt: "Een goede tijdplanning voorkomt stress en teleurstellingen. Leer hoe je realistische verwachtingen stelt en je project op schema houdt."
  }
];

export default function Gidsen() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-16 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
            Renovatie Gidsen
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Praktische gidsen en tips om uw renovatieproject succesvol te maken. 
            Van budgetplanning tot aannemersselectie - alles wat u moet weten.
          </p>
        </div>
      </section>

      {/* Featured Guide */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-2">Uitgelicht</h2>
            <p className="text-muted-foreground">Onze meest waardevolle gids voor elke renovatie</p>
          </div>
          
          <Card className="glass-card border-0 overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div 
                className="aspect-video lg:aspect-auto"
                style={{ background: guides[0].image }}
              >
                <div className="h-full bg-gradient-to-r from-black/40 to-transparent flex items-end p-8">
                  <div>
                    <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      {guides[0].category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-2">{guides[0].title}</h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {guides[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {guides[0].readTime}
                  </div>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {guides[0].excerpt}
                </p>
                <Link href={`/nl/gidsen/${guides[0].slug}`}>
                  <Button className="bg-terracotta text-white hover:bg-terracotta/90">
                    Lees de Gids
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* All Guides Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-ink mb-2">Alle Gidsen</h2>
            <p className="text-muted-foreground">Praktische informatie voor elk aspect van uw renovatie</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {guides.map((guide) => (
              <Card 
                key={guide.id}
                className="glass-card border-0 overflow-hidden motion-safe-hover hover:shadow-xl hover:-translate-y-2"
              >
                {/* Guide Image */}
                <div 
                  className="aspect-video relative"
                  style={{ background: guide.image }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                      {guide.category}
                    </span>
                  </div>
                  
                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <div className="glass px-2 py-1 rounded-full flex items-center gap-1 text-xs text-white">
                      <Clock className="h-3 w-3" />
                      {guide.readTime}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-ink line-clamp-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{guide.description}</p>
                  
                  {/* Author */}
                  <div className="flex items-center text-xs text-muted-foreground mb-4">
                    <User className="h-3 w-3 mr-1" />
                    {guide.author}
                  </div>

                  {/* Action */}
                  <Link href={`/nl/gidsen/${guide.slug}`}>
                    <Button 
                      variant="outline" 
                      className="w-full border-terracotta text-terracotta hover:bg-terracotta/10"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Lees Meer
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-8 border-0">
            <h3 className="text-2xl font-bold mb-4 text-ink">
              Klaar om uw renovatie te starten?
            </h3>
            <p className="text-muted-foreground mb-6">
              Met deze kennis bent u goed voorbereid. Bekijk onze projecten en ontvang binnen 24 uur 3 offertes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/nl/projecten">
                <Button className="bg-terracotta text-white hover:bg-terracotta/90">
                  Bekijk Projecten
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/nl/inspiratie">
                <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                  Inspiratie Opdoen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}