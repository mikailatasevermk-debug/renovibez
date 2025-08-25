"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Home, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight
} from "lucide-react";
import { animation } from "@/lib/design-system";
import { ButtonEnhanced } from "@/components/ui/button-enhanced";

export default function FooterEnhanced() {
  const footerLinks = {
    services: [
      { name: "Badkamer Renovatie", href: "/nl/projecten#badkamer" },
      { name: "Keuken Verbouwing", href: "/nl/projecten#keuken" },
      { name: "Woonkamer Makeover", href: "/nl/projecten#woonkamer" },
      { name: "Slaapkamer Suite", href: "/nl/projecten#slaapkamer" },
    ],
    company: [
      { name: "Over Ons", href: "/nl/over" },
      { name: "Hoe Het Werkt", href: "/nl/hoe-het-werkt" },
      { name: "Voor Aannemers", href: "/nl/contractor/login" },
      { name: "Contact", href: "/nl/contact" },
    ],
    resources: [
      { name: "Inspiratie", href: "/nl/inspiratie" },
      { name: "Renovatie Gidsen", href: "/nl/gidsen" },
      { name: "Prijscalculator", href: "/nl/calculator" },
      { name: "Veelgestelde Vragen", href: "/nl/faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/nl/privacy" },
      { name: "Algemene Voorwaarden", href: "/nl/terms" },
      { name: "Cookie Beleid", href: "/nl/cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gradient-to-b from-beige/30 to-beige/50 border-t border-border/50 mt-24">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: animation.duration.normal }}
            >
              <Link href="/nl" className="flex items-center space-x-2 mb-6 group">
                <Home className="h-8 w-8 text-terracotta transition-transform group-hover:rotate-12" />
                <span className="text-2xl font-bold text-ink">Renovibez</span>
              </Link>
              
              <p className="text-muted-foreground mb-6 max-w-sm leading-relaxed">
                Transformeer uw huis met vertrouwde professionals. 
                Wij verbinden u met de beste aannemers in Nederland.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:info@renovibez.nl" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-terracotta transition-colors group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>info@renovibez.nl</span>
                </a>
                <a 
                  href="tel:+31201234567" 
                  className="flex items-center gap-3 text-muted-foreground hover:text-terracotta transition-colors group"
                >
                  <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>+31 20 123 4567</span>
                </a>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Amsterdam, Nederland</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3 mt-6">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      className="w-10 h-10 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center text-muted-foreground hover:text-terracotta hover:bg-terracotta/10 transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={social.label}
                    >
                      <Icon className="h-5 w-5" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animation.duration.normal, delay: 0.1 }}
          >
            <h3 className="font-bold text-ink mb-4">Diensten</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-terracotta transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animation.duration.normal, delay: 0.2 }}
          >
            <h3 className="font-bold text-ink mb-4">Bedrijf</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-terracotta transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: animation.duration.normal, delay: 0.3 }}
          >
            <h3 className="font-bold text-ink mb-4">Hulpmiddelen</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-terracotta transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter CTA */}
        <motion.div 
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: animation.duration.normal }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-ink mb-2">
                Blijf op de hoogte van renovatie trends
              </h3>
              <p className="text-muted-foreground">
                Ontvang maandelijks tips, inspiratie en exclusieve aanbiedingen
              </p>
            </div>
            <Link href="/nl/newsletter">
              <ButtonEnhanced size="lg">
                Aanmelden voor nieuwsbrief
                <Mail className="ml-2 h-4 w-4" />
              </ButtonEnhanced>
            </Link>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Renovibez. Alle rechten voorbehouden.
            </p>
            
            <div className="flex gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-terracotta transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}