import type { Metadata } from "next";
import {
  Cinzel_Decorative,
  Cormorant_Garamond,
  Courier_Prime,
} from "next/font/google";
import "./globals.css";
import {
  PhotographerSchema,
  Navbar,
  Footer,
  LenisProvider,
} from "@/components/layout";
import { ParticleBackground } from "@/components/ui";

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "700", "900"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  variable: "--font-courier-prime",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jeffrey Epstein Photography | Commercial & Portrait Photographer Sydney",
  description:
    "Commercial and portrait photographer in Sydney, Australia. Corporate headshots, editorial photography, and portrait sessions.",
  openGraph: {
    title: "Jeffrey Epstein Photography | Commercial & Portrait Photographer Sydney",
    description:
      "Commercial and portrait photographer in Sydney, Australia. Corporate headshots, editorial photography, and portrait sessions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jeffrey Epstein Photography | Commercial & Portrait Photographer Sydney",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <PhotographerSchema />
      </head>
      <body
        className={`${cinzelDecorative.variable} ${cormorant.variable} ${courierPrime.variable} font-body antialiased`}
      >
        <LenisProvider>
          <ParticleBackground />
          <div className="relative z-10 flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 pt-[4.5rem]">{children}</main>
            <Footer />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
