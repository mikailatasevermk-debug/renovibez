import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Renovibez - Transformeer uw huis met vertrouwde professionals",
  description: "Selecteer uw renovatieproject, krijg gekoppeld aan geverifieerde aannemers, en transformeer uw ruimte met vertrouwen.",
};

export default function NLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is now handled by the root layout
  return <>{children}</>;
}