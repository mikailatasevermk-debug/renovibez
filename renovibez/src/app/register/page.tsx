import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
      <Card className="w-full max-w-md p-8 bg-white/70 backdrop-blur-lg border border-white/20 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">Registreren</h1>
        <form className="space-y-4">
          <div>
            <Label htmlFor="name">Volledige naam</Label>
            <Input id="name" placeholder="Jan van der Berg" />
          </div>
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" placeholder="uw.email@voorbeeld.nl" />
          </div>
          <div>
            <Label htmlFor="password">Wachtwoord</Label>
            <Input id="password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
            <Input id="confirmPassword" type="password" />
          </div>
          <Button className="w-full bg-terracotta hover:bg-terracotta/90">
            Account aanmaken
          </Button>
        </form>
        <p className="text-center mt-4 text-sm text-neutral-600">
          Al een account?{" "}
          <a href="/login" className="text-terracotta hover:underline">
            Inloggen
          </a>
        </p>
      </Card>
    </div>
  );
}