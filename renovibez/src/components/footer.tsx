import Link from "next/link";
import { Home, Mail, Shield, FileText } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    {
      title: "Juridisch",
      links: [
        { name: "Privacy", href: "/nl/privacy", icon: Shield },
        { name: "Voorwaarden", href: "/nl/voorwaarden", icon: FileText },
      ]
    },
    {
      title: "Contact",
      links: [
        { name: "Contact", href: "/nl/contact", icon: Mail },
      ]
    }
  ];

  return (
    <footer className="glass-card mt-24 border-t-0 border-x-0 border-b-0 border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-terracotta" />
            <span className="text-lg font-bold text-ink">
              Renovibez
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-8">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-3">
                <h4 className="text-sm font-semibold text-ink">
                  {section.title}
                </h4>
                <div className="flex flex-col space-y-2">
                  {section.links.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="renovibez-focus flex items-center space-x-2 text-sm rounded-lg px-2 py-1 motion-safe-hover hover:bg-secondary/30 text-muted-foreground"
                      >
                        <IconComponent className="h-3 w-3" />
                        <span>{link.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs text-muted-foreground">
            © 2024 Renovibez. Alle rechten voorbehouden.
          </div>
        </div>
      </div>
    </footer>
  );
}