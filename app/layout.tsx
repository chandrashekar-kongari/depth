import type { Metadata } from "next";
import { Inter, Manrope, Source_Code_Pro } from "next/font/google";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const mono = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Depth — Engineering drawing reviews, brought into focus.",
  description:
    "Depth is building a dedicated workspace for mechanical drawing reviews, helping teams organize drawings, revisions, and review work while keeping control of their engineering data.",
  openGraph: {
    title: "Depth — Engineering drawing reviews, brought into focus.",
    description:
      "Depth is building a dedicated workspace for mechanical drawing reviews, helping teams organize drawings, revisions, and review work while keeping control of their engineering data.",
    images: [
      {
        url: "/brand/link-preview.png",
        width: 1200,
        height: 630,
        alt: "Depth, a private platform for mechanical drawing reviews",
      },
    ],
  },
};

const themeScript = `
try {
  var stored = localStorage.getItem("depth-theme") || "light";
  var dark = stored === "dark" || (stored === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = stored;
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
