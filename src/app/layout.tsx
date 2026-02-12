import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { PhotographerSchema, Navbar, Footer } from "@/components/layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
        className={`${inter.variable} ${playfair.variable} font-sans antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pt-[4.5rem]">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
