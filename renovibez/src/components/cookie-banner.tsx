"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("renovibez-cookie-consent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("renovibez-cookie-consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("renovibez-cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <Card className="glass-card border-0 max-w-4xl mx-auto">
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0">
            <Cookie className="h-6 w-6 text-terracotta" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-ink mb-2">
              Cookie Voorkeuren
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Wij gebruiken cookies om uw ervaring te verbeteren en onze diensten te optimaliseren. 
              Noodzakelijke cookies worden gebruikt voor het functioneren van de website. 
              Analytics cookies helpen ons de website te verbeteren.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                onClick={acceptCookies}
                className="bg-terracotta text-white hover:bg-terracotta/90"
              >
                Alle cookies accepteren
              </Button>
              <Button 
                onClick={declineCookies}
                variant="outline"
                className="border-terracotta text-terracotta hover:bg-terracotta/10"
              >
                Alleen noodzakelijke
              </Button>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={declineCookies}
            className="flex-shrink-0 text-muted-foreground hover:text-terracotta"
            aria-label="Cookie banner sluiten"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}