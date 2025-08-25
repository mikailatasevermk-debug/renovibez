"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Euro, Clock, CheckCircle, ArrowRight, X, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const renovationPackages = [
  {
    id: 1,
    slug: "moderne-badkamer-renovatie",
    title: "Moderne Badkamer Renovatie",
    shortScope: "Complete badkamertransformatie met hedendaagse armaturen",
    priceFrom: "12.500",
    duration: "2-3 weken",
    category: "Badkamer",
    image: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)",
    highlights: [
      "Inloopdouche met glazen deuren",
      "Zwevend badmeubel met LED-spiegel",
      "Vloerverwarming inbegrepen"
    ]
  },
  {
    id: 2,
    slug: "volledige-keuken-verbouwing",
    title: "Volledige Keuken Verbouwing", 
    shortScope: "Keukenrenovatie van ontwerp tot oplevering",
    priceFrom: "25.000",
    duration: "4-5 weken",
    category: "Keuken",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    highlights: [
      "Aangepaste keukenkasten",
      "Kwarts werkbladen", 
      "Volledig apparatenpakket"
    ]
  },
  {
    id: 3,
    slug: "luxe-woonkamer-makeover",
    title: "Luxe Woonkamer Makeover",
    shortScope: "Sfeervolle woonruimte met warme materialen",
    priceFrom: "18.500",
    duration: "3-4 weken", 
    category: "Woonkamer",
    image: "linear-gradient(135deg, #fed7d7 0%, #f56565 100%)",
    highlights: [
      "Hardhouten vloeren",
      "Ingebouwde kasten op maat",
      "Sfeerverlichting systeem"
    ]
  },
  {
    id: 4,
    slug: "slaapkamer-suite-renovatie",
    title: "Slaapkamer Suite Renovatie",
    shortScope: "Rustgevende slaapruimte met inloopkast",
    priceFrom: "15.000",
    duration: "2-3 weken",
    category: "Slaapkamer", 
    image: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)",
    highlights: [
      "Inloopkast op maat",
      "Luxe vloerbedekking",
      "Geïntegreerde verlichting"
    ]
  },
  {
    id: 5,
    slug: "tuinkamer-overkapping",
    title: "Tuinkamer & Overkapping",
    shortScope: "Uitbreiding van uw leefruimte naar buiten",
    priceFrom: "22.000",
    duration: "3-5 weken",
    category: "Buitenruimte",
    image: "linear-gradient(135deg, #d1fae5 0%, #10b981 100%)",
    highlights: [
      "Glazen overkapping",
      "Terras aanleg",
      "Buitenkeuken installatie"
    ]
  },
  {
    id: 6,
    slug: "thuiskantoor-verbouwing",
    title: "Thuiskantoor Verbouwing",
    shortScope: "Productieve werkruimte in uw eigen huis",
    priceFrom: "8.500",
    duration: "1-2 weken",
    category: "Thuiskantoor",
    image: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)",
    highlights: [
      "Ingebouwd bureau systeem",
      "Geluidsdemping wanden",
      "Professionele verlichting"
    ]
  }
];

export default function Projecten() {
  const [selectedProjects, setSelectedProjects] = useState<typeof renovationPackages>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleProjectSelect = (project: typeof renovationPackages[0]) => {
    if (selectedProjects.find(p => p.id === project.id)) {
      // Remove if already selected
      setSelectedProjects(prev => prev.filter(p => p.id !== project.id));
    } else if (selectedProjects.length < 3) {
      // Add if less than 3 selected
      setSelectedProjects(prev => [...prev, project]);
    }
  };

  const handleRemoveProject = (projectId: number) => {
    setSelectedProjects(prev => prev.filter(p => p.id !== projectId));
  };

  const handleStartMatch = async () => {
    if (selectedProjects.length !== 3) return;

    setIsSubmitting(true);
    
    try {
      // Create renovation request
      const requestResponse = await fetch('/api/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateIds: selectedProjects.map(p => p.id),
          scope: selectedProjects.map(p => p.title)
        }),
      });

      if (!requestResponse.ok) {
        throw new Error('Failed to create request');
      }

      const { requestId } = await requestResponse.json();

      // Create matches
      const matchResponse = await fetch('/api/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          requestId
        }),
      });

      if (!matchResponse.ok) {
        throw new Error('Failed to create matches');
      }

      // Redirect to matches page
      router.push(`/nl/matches?requestId=${requestId}`);
    } catch (error) {
      console.error('Error starting match:', error);
      alert('Er is een fout opgetreden. Probeer het opnieuw.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isProjectSelected = (projectId: number) => {
    return selectedProjects.some(p => p.id === projectId);
  };

  return (
    <div className="min-h-screen pb-32 lg:pb-8">
      <div className="lg:flex lg:gap-8">
        {/* Main Content */}
        <div className="lg:flex-1">
          {/* Header */}
          <section className="py-16 px-4 text-center">
            <div className="container mx-auto max-w-4xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
                Renovatie Pakketten
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                <strong>Selecteer exact 3 projecten</strong> en ontvang binnen 24 uur 3 persoonlijke offertes van geverifieerde aannemers.
              </p>
              <div className="bg-terracotta/10 border border-terracotta/20 rounded-lg p-4 max-w-md mx-auto">
                <p className="text-sm text-terracotta font-medium">
                  {selectedProjects.length}/3 projecten geselecteerd
                </p>
              </div>
            </div>
          </section>

          {/* Projects Grid */}
          <section className="py-8 px-4">
            <div className="container mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
                {renovationPackages.map((project) => {
                  const selected = isProjectSelected(project.id);
                  const canSelect = selectedProjects.length < 3 || selected;
                  
                  return (
                    <Card 
                      key={project.id}
                      className={`glass-card border-0 overflow-hidden motion-safe-hover hover:shadow-xl hover:-translate-y-2 transition-all ${
                        selected ? 'ring-2 ring-terracotta' : ''
                      } ${!canSelect ? 'opacity-50' : ''}`}
                    >
                      {/* Project Image */}
                      <div 
                        className="aspect-video relative"
                        style={{ background: project.image }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        
                        {/* Selection Badge */}
                        {selected && (
                          <div className="absolute top-4 right-4">
                            <div className="bg-terracotta text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                              ✓
                            </div>
                          </div>
                        )}
                        
                        {/* Category Badge */}
                        <div className="absolute top-4 left-4">
                          <span className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
                            {project.category}
                          </span>
                        </div>
                        
                        {/* Title Overlay */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <p className="text-muted-foreground mb-4">{project.shortScope}</p>
                        
                        {/* Price & Duration */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Euro className="h-4 w-4 mr-1" />
                            <span className="font-semibold">Vanaf</span>
                          </div>
                          <span className="text-2xl font-bold text-terracotta">
                            €{project.priceFrom}
                          </span>
                        </div>
                        
                        <div className="flex items-center mb-6 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>Doorlooptijd: {project.duration}</span>
                        </div>

                        {/* Highlights */}
                        <div className="space-y-2 mb-6">
                          {project.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-center text-sm text-muted-foreground">
                              <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0 text-terracotta" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        {/* Actions */}
                        <div className="space-y-3">
                          <Link href={`/nl/projecten/${project.slug}`}>
                            <Button 
                              variant="outline" 
                              className="w-full border-terracotta text-terracotta hover:bg-terracotta/10"
                            >
                              Meer Details
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            onClick={() => handleProjectSelect(project)}
                            disabled={!canSelect}
                            className={`w-full ${
                              selected 
                                ? 'bg-terracotta text-white hover:bg-terracotta/90' 
                                : 'bg-terracotta text-white hover:bg-terracotta/90'
                            }`}
                          >
                            {selected ? 'Geselecteerd ✓' : 'Selecteer Project'}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="glass-card p-8 border-0">
                <h3 className="text-2xl font-bold mb-4 text-ink">
                  Niet het juiste project ertussen?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Neem contact met ons op voor een maatwerkofferte of bekijk onze inspiratie voor meer ideeën.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                    Contact Opnemen
                  </Button>
                  <Link href="/nl/inspiratie">
                    <Button className="bg-terracotta text-white hover:bg-terracotta/90">
                      Bekijk Inspiratie
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Selection Tray - Desktop Sticky Aside */}
        <div className="hidden lg:block lg:w-80 lg:sticky lg:top-8 lg:h-fit lg:mt-16">
          <div className="px-4">
            <Card className="glass-card border-0 p-6">
              <div className="flex items-center mb-4">
                <ShoppingBag className="h-5 w-5 text-terracotta mr-2" />
                <h3 className="font-semibold text-ink">Geselecteerde Projecten</h3>
              </div>
              
              <div className="space-y-3 mb-6">
                {selectedProjects.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Selecteer 3 projecten om te starten met matching
                  </p>
                ) : (
                  selectedProjects.map((project, index) => (
                    <div key={project.id} className="flex items-center justify-between bg-terracotta/5 p-3 rounded-lg">
                      <div>
                        <div className="text-sm font-medium text-ink line-clamp-1">
                          {index + 1}. {project.title}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          €{project.priceFrom}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveProject(project.id)}
                        className="text-muted-foreground hover:text-terracotta"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>

              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">
                  {selectedProjects.length}/3 projecten
                </div>
                <div className="w-full bg-secondary/50 rounded-full h-2">
                  <div 
                    className="bg-terracotta h-2 rounded-full transition-all"
                    style={{ width: `${(selectedProjects.length / 3) * 100}%` }}
                  />
                </div>
              </div>

              <Button 
                onClick={handleStartMatch}
                disabled={selectedProjects.length !== 3 || isSubmitting}
                className="w-full bg-terracotta text-white hover:bg-terracotta/90 disabled:bg-muted"
              >
                {isSubmitting ? 'Bezig met matchen...' : 'Start Match'}
              </Button>
              
              {selectedProjects.length !== 3 && (
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Selecteer precies 3 projecten om te kunnen starten
                </p>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Selection Tray - Mobile Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-bg/95 backdrop-blur-sm border-t border-border z-50">
        <div className="p-4">
          <Card className="glass-card border-0 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <ShoppingBag className="h-4 w-4 text-terracotta mr-2" />
                <span className="font-semibold text-ink">Projecten ({selectedProjects.length}/3)</span>
              </div>
              {selectedProjects.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  €{selectedProjects.reduce((sum, p) => sum + parseInt(p.priceFrom.replace('.', '')), 0).toLocaleString()}+
                </div>
              )}
            </div>

            {selectedProjects.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {selectedProjects.map((project, index) => (
                  <div key={project.id} className="bg-terracotta/10 text-terracotta px-2 py-1 rounded text-xs flex items-center">
                    {index + 1}. {project.category}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveProject(project.id)}
                      className="ml-1 h-4 w-4 p-0 text-terracotta hover:text-terracotta/80"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Button 
              onClick={handleStartMatch}
              disabled={selectedProjects.length !== 3 || isSubmitting}
              className="w-full bg-terracotta text-white hover:bg-terracotta/90 disabled:bg-muted"
            >
              {isSubmitting ? 'Bezig met matchen...' : `Start Match (${selectedProjects.length}/3)`}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}