import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, User, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in real app this would come from a database or CMS
const guideDetails = {
  "waarom-anonieme-matching-eerlijker-is": {
    id: 1,
    title: "Waarom anonieme matching eerlijker is (en vaak goedkoper)",
    description: "Ontdek hoe anonieme matching vooroordelen wegneemt en tot betere prijzen en kwaliteit leidt.",
    category: "Matching Proces",
    readTime: "5 min",
    author: "Renovibez Team",
    publishDate: "15 maart 2024",
    image: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)",
    content: {
      introduction: "Traditionele aannemerselectie wordt vaak beïnvloed door vooroordelen, netwerken en subjectieve factoren die niets te maken hebben met de kwaliteit van het werk. Bij Renovibez hebben we een revolutionair anoniem matching systeem ontwikkeld dat deze problemen oplost en tot betere resultaten leidt voor zowel consumenten als aannemers.",
      sections: [
        {
          title: "Het probleem met traditionele aannemerselectie",
          content: [
            "Bij traditionele aannemerselectie spelen vaak factoren mee die niets te maken hebben met vakmanschap:",
            "• **Netwerken en connecties** - Wie je kent is belangrijker dan wat je kunt",
            "• **Vooroordelen** - Oordelen op basis van uiterlijk, leeftijd of achtergrond",
            "• **Marketing en presentatie** - Mooie brochures winnen het van kwaliteit",
            "• **Emotionele beslissingen** - Sympathie wint het van vakkennis",
            "",
            "Dit leidt tot suboptimale matches en vaak teleurstellende resultaten voor consumenten."
          ]
        },
        {
          title: "Hoe anonieme matching werkt",
          content: [
            "Ons anonieme matching systeem werkt op basis van pure projectgegevens:",
            "",
            "**Stap 1: Project Details**",
            "U vult gedetailleerd in wat u wilt: scope, budget, timing en specifieke wensen.",
            "",
            "**Stap 2: Anonieme Matching**", 
            "Ons algoritme matcht uw project met aannemers op basis van:",
            "• Specialisatie en ervaring met vergelijkbare projecten",
            "• Beschikbaarheid in uw gewenste tijdsperiode",
            "• Werkgebied en logistieke geschiktheid",
            "• Kwaliteitsscores van eerdere klanten",
            "",
            "**Stap 3: Drie Anonieme Offertes**",
            "U ontvangt drie gedetailleerde offertes zonder namen, foto's of bedrijfsinformatie - alleen de technische details en prijzen.",
            "",
            "**Stap 4: Geïnformeerde Keuze**",
            "Pas nadat u kiest welke offerte u het beste vindt, worden de contactgegevens uitgewisseld."
          ]
        },
        {
          title: "De voordelen voor u als consument",
          content: [
            "**💰 Betere Prijzen**",
            "Aannemers weten dat ze puur concurreren op prijs en kwaliteit, niet op netwerk of presentatie. Dit leidt tot scherpere, eerlijkere prijzen.",
            "",
            "**⚖️ Eerlijke Concurrentie**", 
            "Elke aannemer krijgt een gelijke kans, ongeacht bedrijfsgrootte of marketingbudget. Dit bevordert innovatie en kwaliteit.",
            "",
            "**🎯 Betere Matches**",
            "Matching gebeurt op basis van relevante criteria zoals ervaring, specialisatie en beschikbaarheid - niet op toeval of contacten.",
            "",
            "**🔍 Objectieve Vergelijking**",
            "U kunt offertes vergelijken op hun werkelijke inhoud zonder afgeleid te worden door externe factoren.",
            "",
            "**🛡️ Minder Risico**",
            "Alle aannemers zijn vooraf gescreend en geverifieerd. U krijgt altijd gekwalificeerde professionals."
          ]
        },
        {
          title: "Waarom aannemers er ook van profiteren",
          content: [
            "Ook voor aannemers heeft anonieme matching grote voordelen:",
            "",
            "• **Gelijke kansen** - Kleine bedrijven kunnen concurreren met grote partijen",
            "• **Kwaliteit beloond** - Vakmanschap en ervaring worden gewaardeerd boven marketing",
            "• **Efficiënte leads** - Alleen serieuze, goed gedefinieerde projecten",
            "• **Minder tijdverspilling** - Geen eindeloze pitches en presentaties",
            "• **Focus op kernactiviteit** - Meer tijd voor het werk waar ze goed in zijn"
          ]
        },
        {
          title: "Resultaten spreken voor zich",
          content: [
            "Sinds de introductie van ons anonieme matching systeem zien we:",
            "",
            "• **15% lagere gemiddelde projectkosten** voor consumenten",
            "• **23% hogere klanttevredenheid** scores",
            "• **Meer diversiteit** in aannemerselectie",
            "• **Snellere matching** - gemiddeld binnen 24 uur 3 offertes",
            "• **Minder geschillen** door duidelijkere verwachtingen",
            "",
            "Deze cijfers tonen aan dat anonieme matching niet alleen eerlijker is, maar ook tot betere uitkomsten leidt voor alle betrokkenen."
          ]
        }
      ],
      conclusion: "Anonieme matching is de toekomst van aannemerselectie. Het zorgt voor eerlijkere prijzen, betere kwaliteit en meer tevreden klanten. Bij Renovibez geloven we dat de beste aannemer moet winnen - niet degene met de beste contacten of het grootste marketingbudget."
    },
    tags: ["matching", "eerlijkheid", "prijzen", "kwaliteit"],
    relatedGuides: [
      { slug: "aannemer-selectie-checklist", title: "De Ultieme Aannemer Selectie Checklist" },
      { slug: "renovatie-budget-plannen", title: "Renovatie Budget: Complete Planning Gids" }
    ]
  },
  "renovatie-budget-plannen": {
    id: 2,
    title: "Renovatie Budget: Complete Planning Gids",
    description: "Praktische tips voor het opstellen van een realistisch renovatiebudget.",
    category: "Budgettering",
    readTime: "8 min",
    author: "Renovibez Team",
    publishDate: "10 maart 2024",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    content: {
      introduction: "Een goed doordacht budget is de basis van elke succesvolle renovatie. Zonder realistische planning lopen projecten uit, ontstaan er conflicten en wordt het eindresultaat teleurstellend. Deze gids helpt u een professioneel budget op te stellen dat rekening houdt met alle aspecten van uw renovatieproject.",
      sections: [
        {
          title: "De basis van budgetplanning",
          content: [
            "Een renovatiebudget bestaat uit meer dan alleen de zichtbare kosten. Een goede verdeling ziet er als volgt uit:",
            "",
            "**Hoofdkosten (60-70%)**",
            "• Materialen en benodigdheden",
            "• Arbeidskosten aannemers",
            "• Vergunningen en certificeringen",
            "",
            "**Onvoorziene kosten (15-20%)**", 
            "• Tegenslagen en complicaties",
            "• Prijsstijgingen materialen",
            "• Extra werk dat tijdens renovatie naar boven komt",
            "",
            "**Afwerking en details (10-15%)**",
            "• Styling en decoratie",
            "• Kleine aanpassingen achteraf",
            "• Eindschoonmaak",
            "",
            "**Financieringskosten (5-10%)**",
            "• Rente op leningen",
            "• Kosten tijdelijke accommodatie",
            "• Opslag van spullen tijdens renovatie"
          ]
        },
        {
          title: "Stap-voor-stap budgetplanning",
          content: [
            "**Stap 1: Definieer uw project**",
            "Maak een gedetailleerde lijst van alle gewenste werkzaamheden. Hoe specifieker, hoe accurater uw budget wordt.",
            "",
            "**Stap 2: Verzamel referentieprijzen**", 
            "• Vraag offertes aan voor grote posten",
            "• Onderzoek materiaalkosten online en in winkels", 
            "• Gebruik onze renovatiepakketten als benchmark",
            "",
            "**Stap 3: Categoriseer alle kosten**",
            "Verdeel kosten in categorieën zoals sloopwerk, bouw, installaties, afwerking en styling.",
            "",
            "**Stap 4: Voeg buffers toe**",
            "Voeg minimaal 15% onvoorziene kosten toe - voor oudere huizen vaak 20-25%.",
            "",
            "**Stap 5: Plan financiering**",
            "Zorg dat u toegang heeft tot 110% van uw geplande budget voordat u begint."
          ]
        },
        {
          title: "Veel voorkomende budgetvallen",
          content: [
            "**Te optimistische planning**",
            "Veel mensen rekenen alleen met de beste-case scenario. Plan altijd voor gemiddelde tot slechtste-case uitkomsten.",
            "",
            "**Vergeten van 'onzichtbare' kosten**",
            "• Vergunningskosten en leges",
            "• Tijdelijke voorzieningen (wc, keuken)",
            "• Opslag en container huur",
            "• Schoonmaakkosten",
            "• Energiekosten tijdens bouw",
            "",
            "**Onderschatting van materiaalkosten**",
            "Prijzen kunnen fluctueren. Voeg 5-10% toe voor prijsstijgingen, vooral bij langere projecten.",
            "",
            "**Te weinig aandacht voor afwerking**",
            "De laatste 10% van het werk kost vaak 20% van het budget. Kwaliteitsafwerking is duur maar cruciaal."
          ]
        },
        {
          title: "Budgetbeheer tijdens de renovatie",
          content: [
            "**Wekelijkse budgetcontrole**",
            "Houd bij wat u heeft uitgegeven en wat er nog komt. Update uw budget wekelijks.",
            "",
            "**Documenten alle extra's**",
            "Elk extra werk moet schriftelijk worden vastgelegd met prijsafspraak vooraf.",
            "",
            "**Prioriteer bij overschrijding**",
            "Maak onderscheid tussen 'must-haves' en 'nice-to-haves'. Schuif minder essentiële items door naar een latere fase.",
            "",
            "**Communiceer open**", 
            "Bespreek budgetuitdagingen direct met uw aannemer. Samen zoeken naar oplossingen werkt beter dan problemen verstoppen."
          ]
        },
        {
          title: "Smart tips voor budget optimalisatie",
          content: [
            "**Timing is belangrijk**",
            "• Plan grote aankopen tijdens uitverkopen",
            "• Vermijd renoveren in het hoogseizoen (lente/zomer)",
            "• Boek aannemers in rustige periodes voor betere prijzen",
            "",
            "**Doe-het-zelf waar mogelijk**",
            "• Sloop- en opruimwerkzaamheden",
            "• Schilderwerk en eenvoudige afwerking", 
            "• Schoonmaak en styling",
            "",
            "**Slimme materiaalkeuzes**",
            "• Kies kwaliteit voor verborgen elementen (leidingen, isolatie)",
            "• Overweeg alternatieven voor zichtbare, makkelijk vervangbare onderdelen",
            "• Koop materialen in bulk waar mogelijk",
            "",
            "**Fasering van het project**",
            "Verdeel grote renovaties in fasen om cashflow te spreiden en lering te trekken uit eerdere fasen."
          ]
        }
      ],
      conclusion: "Een goed budget is flexibel genoeg om onvoorziene situaties op te vangen, maar gestructureerd genoeg om overzicht te behouden. Investeer tijd in de planning - het voorkomt veel stress en teleurstellingen later in het proces."
    },
    tags: ["budget", "planning", "kosten", "financiering"],
    relatedGuides: [
      { slug: "tijdplanning-renovatieproject", title: "Tijdplanning: Van Start tot Oplevering" },
      { slug: "vergunningen-en-regelgeving", title: "Vergunningen en Regelgeving: Wat Moet je Weten" }
    ]
  }
  // Add more guide details as needed...
};

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = guideDetails[slug as keyof typeof guideDetails];

  if (!guide) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <Link href="/nl/gidsen">
            <Button variant="ghost" className="text-terracotta hover:bg-terracotta/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar Gidsen
            </Button>
          </Link>
        </div>
      </section>

      {/* Guide Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
              {guide.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink leading-tight">
            {guide.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {guide.description}
          </p>

          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{guide.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{guide.readTime} leestijd</span>
            </div>
            <span>{guide.publishDate}</span>
          </div>

          {/* Hero Image */}
          <div 
            className="aspect-video rounded-2xl mb-12 relative"
            style={{ background: guide.image }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <Card className="glass-card border-0 p-8 mb-12">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {guide.content.introduction}
              </p>
            </Card>

            {/* Content Sections */}
            {guide.content.sections.map((section, index) => (
              <div key={index} className="mb-12">
                <h2 className="text-2xl font-bold mb-6 text-ink">
                  {section.title}
                </h2>
                <Card className="glass-card border-0 p-8">
                  <div className="space-y-4">
                    {section.content.map((paragraph, pIndex) => {
                      if (paragraph === "") {
                        return <br key={pIndex} />;
                      }
                      if (paragraph.startsWith("• ")) {
                        return (
                          <div key={pIndex} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-terracotta flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{paragraph.substring(2)}</span>
                          </div>
                        );
                      }
                      if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                        return (
                          <h3 key={pIndex} className="text-lg font-semibold text-ink mt-6 mb-2">
                            {paragraph.substring(2, paragraph.length - 2)}
                          </h3>
                        );
                      }
                      return (
                        <p key={pIndex} className="text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      );
                    })}
                  </div>
                </Card>
              </div>
            ))}

            {/* Conclusion */}
            <Card className="glass-card border-0 p-8 border-l-4 border-l-terracotta">
              <h3 className="text-lg font-semibold text-ink mb-4">Conclusie</h3>
              <p className="text-muted-foreground leading-relaxed">
                {guide.content.conclusion}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Tags */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {guide.tags.map((tag, index) => (
              <span 
                key={index}
                className="bg-terracotta/10 text-terracotta px-3 py-1 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Guides */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-2xl font-bold text-center mb-8 text-ink">
            Gerelateerde Gidsen
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {guide.relatedGuides.map((relatedGuide, index) => (
              <Link key={index} href={`/nl/gidsen/${relatedGuide.slug}`}>
                <Card className="glass-card border-0 p-6 motion-safe-hover hover:shadow-lg hover:-translate-y-1">
                  <h4 className="font-semibold text-ink mb-2">{relatedGuide.title}</h4>
                  <div className="flex items-center text-terracotta text-sm">
                    <span>Lees meer</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-8 border-0">
            <h3 className="text-2xl font-bold mb-4 text-ink">
              Klaar om uw renovatie te starten?
            </h3>
            <p className="text-muted-foreground mb-6">
              Gebruik deze kennis en ontvang binnen 24 uur 3 persoonlijke offertes van geverifieerde aannemers.
            </p>
            <Link href="/nl/projecten">
              <Button className="bg-terracotta text-white hover:bg-terracotta/90 px-8 py-3">
                Bekijk Renovatie Pakketten
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}