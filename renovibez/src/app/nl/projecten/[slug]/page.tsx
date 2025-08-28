import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Clock, CheckCircle, ArrowLeft, Camera, Star } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data - in real app this would come from a database
const projectDetails = {
  "moderne-badkamer-renovatie": {
    id: 1,
    title: "Moderne Badkamer Renovatie",
    shortScope: "Complete badkamertransformatie met hedendaagse armaturen",
    category: "Badkamer",
    priceFrom: "12.500",
    priceTo: "18.500",
    duration: "2-3 weken",
    description: "Transformeer uw badkamer tot een moderne wellness oase. Ons pakket bevat alles wat u nodig hebt voor een complete badkamerrenovatie, van de eerste schets tot de finale oplevering.",
    gallery: [
      {
        type: "before",
        title: "Voor",
        image: "linear-gradient(135deg, #f3f4f6 0%, #9ca3af 100%)"
      },
      {
        type: "after", 
        title: "Na",
        image: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)"
      }
    ],
    scopeItems: [
      "Volledige ontwerp- en adviesfase",
      "Sloopwerkzaamheden en afvoer",
      "Loodgieterswerk en elektra",
      "Tegelwerk vloer en wanden",
      "Installatie sanitair en armaturen",
      "Vloerverwarming systeem",
      "LED verlichting en ventilatie",
      "Glazen douchewand op maat",
      "Zwevend badmeubel met spiegel",
      "Eindreiniging en oplevering"
    ],
    testimonial: {
      name: "Familie van der Berg",
      rating: 5,
      text: "Fantastisch resultaat! De aannemer was professioneel en hield zich aan de planning. Onze badkamer is nu echt een wellness ruimte."
    }
  },
  "volledige-keuken-verbouwing": {
    id: 2,
    title: "Volledige Keuken Verbouwing",
    shortScope: "Keukenrenovatie van ontwerp tot oplevering",
    category: "Keuken",
    priceFrom: "25.000",
    priceTo: "35.000", 
    duration: "4-5 weken",
    description: "Een volledig nieuwe keuken die perfect aansluit bij uw levensstijl. Van ontwerp tot installatie, wij zorgen voor een keuken waar u jaren plezier van heeft.",
    gallery: [
      {
        type: "before",
        title: "Voor",
        image: "linear-gradient(135deg, #f3f4f6 0%, #9ca3af 100%)"
      },
      {
        type: "after",
        title: "Na", 
        image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)"
      }
    ],
    scopeItems: [
      "3D ontwerp en visualisatie",
      "Sloopwerk bestaande keuken",
      "Elektra en leidingwerk aanpassingen",
      "Keukenkastinstallatie op maat",
      "Kwarts werkblad plaatsing",
      "Inbouwapparatuur installatie",
      "Tegelwerk achterwand",
      "Verlichting en stopcontacten",
      "Afwerking en styling",
      "Garantie en nazorg"
    ],
    testimonial: {
      name: "Familie Jansen",
      rating: 5,
      text: "Prachtige keuken gekregen! Het team werkte netjes en dacht goed mee. Zeker een aanrader."
    }
  }
  // Add more project details as needed...
};

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projectDetails[slug as keyof typeof projectDetails];

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Back Navigation */}
      <section className="py-6 px-4">
        <div className="container mx-auto">
          <Link href="/nl/projecten">
            <Button variant="ghost" className="text-terracotta hover:bg-terracotta/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar Projecten
            </Button>
          </Link>
        </div>
      </section>

      {/* Project Header */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Project Info */}
            <div>
              <div className="mb-4">
                <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-ink">
                {project.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-6">
                {project.description}
              </p>
              
              {/* Price & Duration */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                <Card className="glass-card border-0 p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Euro className="h-4 w-4 mr-2" />
                    <span>Prijsrange</span>
                  </div>
                  <div className="text-2xl font-bold text-terracotta">
                    €{project.priceFrom} - €{project.priceTo}
                  </div>
                </Card>
                <Card className="glass-card border-0 p-4">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>Doorlooptijd</span>
                  </div>
                  <div className="text-2xl font-bold text-ink">
                    {project.duration}
                  </div>
                </Card>
              </div>

              {/* CTA Button */}
              <Button className="bg-terracotta text-white hover:bg-terracotta/90 w-full sm:w-auto px-8 py-3 text-lg">
                Selecteer dit Project
              </Button>
            </div>

            {/* Gallery */}
            <div className="space-y-4">
              {project.gallery.map((image, index) => (
                <Card key={index} className="glass-card border-0 overflow-hidden">
                  <div 
                    className="aspect-video relative"
                    style={{ background: image.image }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Camera className="h-3 w-3 mr-2" />
                        {image.title}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Scope */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent to-secondary/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-ink">
            Wat is inbegrepen
          </h2>
          <Card className="glass-card border-0 p-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {project.scopeItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-terracotta flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-ink">
            Wat klanten zeggen
          </h2>
          <Card className="glass-card border-0 p-8 text-center">
            <div className="flex justify-center mb-4">
              {[...Array(project.testimonial.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-lg text-muted-foreground mb-4 italic">
              &quot;{project.testimonial.text}&quot;
            </blockquote>
            <p className="font-semibold text-ink">
              — {project.testimonial.name}
            </p>
          </Card>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-8 border-0">
            <h3 className="text-2xl font-bold mb-4 text-ink">
              Klaar om te beginnen?
            </h3>
            <p className="text-muted-foreground mb-6">
              Ontvang binnen 24 uur 3 persoonlijke offertes van geverifieerde aannemers
            </p>
            <Button className="bg-terracotta text-white hover:bg-terracotta/90 px-8 py-3 text-lg">
              Start uw {project.category.toLowerCase()}renovatie
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}