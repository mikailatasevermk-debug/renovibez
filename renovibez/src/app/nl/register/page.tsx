import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8 glass-card border-0">
        <h1 className="text-2xl font-bold text-center mb-6 text-ink">
          Registreren
        </h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-ink">
              Volledige naam
            </Label>
            <Input 
              id="name" 
              placeholder="Jan van der Berg"
              className="renovibez-focus"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-ink">
              E-mail
            </Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="uw.email@voorbeeld.nl"
              className="renovibez-focus"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-ink">
              Wachtwoord
            </Label>
            <Input 
              id="password" 
              type="password"
              className="renovibez-focus"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-ink">
              Bevestig wachtwoord
            </Label>
            <Input 
              id="confirmPassword" 
              type="password"
              className="renovibez-focus"
            />
          </div>
          <Button className="w-full renovibez-focus motion-safe-hover bg-terracotta text-white hover:bg-terracotta/90">
            Account aanmaken
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          Al een account?{" "}
          <a 
            href="/nl/login" 
            className="renovibez-focus rounded underline motion-safe-hover text-terracotta"
          >
            Inloggen
          </a>
        </p>
      </Card>
    </div>
  );
}