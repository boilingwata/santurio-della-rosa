import type { Metadata } from "next";
import localFont from "next/font/local";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";
import "./globals.css";

const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "../assets/fonts/CormorantGaramond-Light.ttf", weight: "300", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../assets/fonts/CormorantGaramond-Regular.ttf", weight: "400", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-Italic.ttf", weight: "400", style: "italic" },
    { path: "../assets/fonts/CormorantGaramond-Medium.ttf", weight: "500", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../assets/fonts/CormorantGaramond-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../assets/fonts/CormorantGaramond-Bold.ttf", weight: "700", style: "normal" },
    { path: "../assets/fonts/CormorantGaramond-BoldItalic.ttf", weight: "700", style: "italic" },
  ],
});

const isabella = localFont({
  src: "../assets/fonts/Isabella.ttf",
  variable: "--font-isabella",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Santuario della Rosa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${isabella.variable}`}
    >
      <body className="font-cormorant antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
