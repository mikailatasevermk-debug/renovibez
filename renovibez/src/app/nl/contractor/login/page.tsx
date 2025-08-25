"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ArrowLeft, HardHat } from "lucide-react";
import Link from "next/link";

export default function ContractorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        role: "CONTRACTOR", // Only allow contractor accounts
        redirect: false,
      });

      if (result?.error) {
        setError("Ongeldige inloggegevens of geen aannemersaccount gevonden");
      } else {
        // Redirect to contractor dashboard after successful login
        router.push("/nl/contractor/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("Er is een fout opgetreden. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-md">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/nl">
            <Button variant="ghost" className="text-terracotta hover:bg-terracotta/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar Home
            </Button>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="glass-card border-0 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-terracotta/10 rounded-full mb-4">
              <HardHat className="h-8 w-8 text-terracotta" />
            </div>
            <h1 className="text-3xl font-bold text-ink mb-2">
              Aannemer Portal
            </h1>
            <p className="text-muted-foreground">
              Log in om uw projecten en offertes te beheren
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-ink font-medium">
                E-mailadres
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="uw@bedrijf.nl"
                required
                className="w-full"
                aria-describedby="email-error"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-ink font-medium">
                Wachtwoord
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pr-12"
                  aria-describedby="password-error"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm" role="alert">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-terracotta text-white hover:bg-terracotta/90 disabled:bg-muted disabled:text-muted-foreground"
            >
              {loading ? "Inloggen..." : "Inloggen"}
            </Button>
          </form>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-terracotta/5 border border-terracotta/20 rounded-lg">
            <h3 className="font-medium text-ink mb-2">Demo Aannemer Accounts:</h3>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>
                <strong>Renovatie Pro:</strong><br />
                Email: piet@renovatiepro.nl<br />
                Wachtwoord: demo123
              </div>
              <div className="mt-2">
                <strong>Bouwbedrijf De Vakman:</strong><br />
                Email: kees@devakman.nl<br />
                Wachtwoord: demo123
              </div>
            </div>
          </div>

          {/* Consumer Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              Ben je een particulier?
            </p>
            <Link href="/nl/login">
              <Button variant="outline" className="border-terracotta text-terracotta hover:bg-terracotta/10">
                Particulier Inloggen
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}