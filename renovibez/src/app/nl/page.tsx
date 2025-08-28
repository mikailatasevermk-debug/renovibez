"use client";

import { Card } from "@/components/ui/card";
import { ButtonEnhanced } from "@/components/ui/button-enhanced";
import { Input } from "@/components/ui/input";
import { 
  ArrowRight, 
  CheckCircle, 
  Search, 
  Users, 
  MessageSquare, 
  Star,
  Shield,
  Clock,
  Home,
  Sparkles,
  TrendingUp,
  ChevronRight,
  Mail,
  User
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FadeIn, 
  StaggerContainer, 
  StaggerItem, 
  ScaleOnHover,
  SlideIn,
  Pulse
} from "@/components/animations";
import { useState, useRef } from "react";
import { animation } from "@/lib/design-system";

export default function NLHomeEnhanced() {
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const steps = [
    {
      icon: Search,
      title: "Selecteer uw project",
      description: "Kies uit onze renovatiepakketten en vul uw wensen in",
      color: "from-terracotta/80 to-terracotta"
    },
    {
      icon: Users,
      title: "Ontvang 3 offertes",
      description: "Wij koppelen u automatisch aan 3 geverifieerde aannemers",
      color: "from-terracotta/90 to-terracotta"
    },
    {
      icon: MessageSquare,
      title: "Chat & plan samen",
      description: "Communiceer direct en plan uw droomrenovatie",
      color: "from-terracotta to-terracotta/90"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Geverifieerde aannemers",
      description: "Alle professionals zijn gecontroleerd en verzekerd"
    },
    {
      icon: TrendingUp,
      title: "Altijd 3 offertes",
      description: "Vergelijk en kies de beste optie voor uw budget"
    },
    {
      icon: Star,
      title: "Anonieme matching",
      description: "Eerlijke prijzen zonder vooroordelen"
    },
    {
      icon: Clock,
      title: "Snelle respons",
      description: "Binnen 24 uur gekoppeld aan aannemers"
    },
    {
      icon: Home,
      title: "100% gratis",
      description: "Geen kosten voor huiseigenaren"
    },
    {
      icon: Sparkles,
      title: "Kwaliteitsgarantie",
      description: "Alleen de beste beoordeelde professionals"
    }
  ];

  const testimonials = [
    {
      name: "Anna de Vries",
      location: "Amsterdam",
      rating: 5,
      text: "Fantastische service! Binnen een dag had ik 3 offertes voor mijn badkamerrenovatie."
    },
    {
      name: "Mark Jansen",
      location: "Utrecht",
      rating: 5,
      text: "Het anonieme systeem werkt perfect. Geen opdringerige telefoontjes, alleen goede offertes."
    },
    {
      name: "Lisa Bakker",
      location: "Rotterdam",
      rating: 5,
      text: "Mijn keuken is prachtig geworden. De aannemer was professioneel en betrouwbaar."
    }
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-bg via-white/30 to-terracotta/5"
          style={{ y: backgroundY }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-terracotta/10 via-transparent to-transparent" />
        
        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-terracotta/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Hero Section with Search */}
      <section ref={heroRef} className="relative pt-32 pb-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center"
            style={{ y: textY }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-terracotta to-terracotta/80 bg-clip-text text-transparent leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animation.duration.slow }}
            >
              Transformeer uw huis met
              <br />
              vertrouwde professionals
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animation.duration.slow, delay: 0.1 }}
            >
              Selecteer uw renovatieproject, krijg gekoppeld aan geverifieerde aannemers,
              en transformeer uw ruimte met vertrouwen.
            </motion.p>

            {/* Airbnb-style Search Bar */}
            <motion.div
              className="max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: animation.duration.slow, delay: 0.2 }}
            >
              <div className="glass-card border-0 p-2 rounded-full shadow-2xl">
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <div className="flex-1 w-full">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Wat wilt u renoveren? (bijv. badkamer, keuken...)"
                        className="w-full pl-12 pr-4 py-4 bg-transparent border-0 text-lg focus:ring-0 placeholder:text-muted-foreground/60"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                  </div>
                  <Link href="/nl/projecten">
                    <ButtonEnhanced 
                      className="w-full md:w-auto px-8 py-4 text-lg font-semibold rounded-full"
                      size="lg"
                    >
                      Zoek projecten
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </ButtonEnhanced>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: animation.duration.slow, delay: 0.3 }}
            >
              <Link href="/nl/inspiratie">
                <ButtonEnhanced 
                  variant="outline" 
                  size="lg"
                  className="group"
                >
                  Bekijk inspiratie
                  <Sparkles className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </ButtonEnhanced>
              </Link>
              <Link href="/nl/gidsen">
                <ButtonEnhanced 
                  variant="ghost" 
                  size="lg"
                >
                  Lees onze gidsen
                </ButtonEnhanced>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="mt-16 flex flex-wrap justify-center items-center gap-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: animation.duration.slow, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="font-medium">10.000+ tevreden klanten</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="font-medium">4.8/5 gemiddelde score</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <span className="font-medium">100% verzekerd</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section with Animations */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent via-terracotta/5 to-transparent">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
                Hoe het werkt
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Van idee tot oplevering in 3 eenvoudige stappen
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 mb-16">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <StaggerItem key={index}>
                  <ScaleOnHover>
                    <Card className="relative glass-card border-0 p-8 h-full hover:shadow-2xl transition-all duration-300">
                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-terracotta to-transparent" />
                      )}
                      
                      {/* Step Number */}
                      <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-terracotta to-terracotta/80 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                        {index + 1}
                      </div>
                      
                      {/* Icon with Gradient Background */}
                      <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl mb-6 shadow-lg`}>
                        <IconComponent className="h-10 w-10 text-white" />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-ink">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </Card>
                  </ScaleOnHover>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          <FadeIn delay={0.3}>
            <div className="text-center">
              <Link href="/nl/projecten">
                <Pulse>
                  <ButtonEnhanced size="lg" className="px-10 py-4 text-lg">
                    Begin uw renovatie
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </ButtonEnhanced>
                </Pulse>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Enhanced Features Grid */}
      <section className="py-24 px-4 bg-gradient-to-b from-transparent to-bg/30">
        <div className="container mx-auto max-w-6xl">
          <SlideIn direction="left">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
                Waarom kiezen voor Renovibez?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Wij maken renoveren eenvoudig, transparant en betrouwbaar
              </p>
            </div>
          </SlideIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <StaggerItem key={index}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="glass-card border-0 p-6 h-full hover:shadow-xl transition-all duration-300">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-terracotta" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-2 text-ink">{feature.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-ink">
                Wat onze klanten zeggen
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Meer dan 10.000 tevreden huiseigenaren gingen u voor
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <StaggerItem key={index}>
                <Card className="glass-card border-0 p-8 h-full hover:shadow-xl transition-all duration-300">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-terracotta/10 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-terracotta" />
                    </div>
                    <div>
                      <p className="font-semibold text-ink">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-terracotta/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <FadeIn>
            <Card className="glass-card border-0 p-12 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-6">
                <Mail className="h-8 w-8 text-terracotta" />
              </div>
              <h3 className="text-3xl font-bold mb-4 text-ink">
                Blijf op de hoogte
              </h3>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Ontvang renovatie tips, trends en exclusieve aanbiedingen
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Uw e-mailadres"
                  className="flex-1"
                />
                <ButtonEnhanced>
                  Aanmelden
                  <ChevronRight className="ml-2 h-4 w-4" />
                </ButtonEnhanced>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Geen spam, afmelden wanneer u wilt
              </p>
            </Card>
          </FadeIn>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: animation.duration.slow }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-terracotta to-terracotta/80 bg-clip-text text-transparent">
              Klaar om te beginnen?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start vandaag nog met uw droomrenovatie
            </p>
            <Link href="/nl/projecten">
              <ButtonEnhanced size="lg" className="px-10 py-4 text-lg">
                Start nu
                <ArrowRight className="ml-3 h-6 w-6" />
              </ButtonEnhanced>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}