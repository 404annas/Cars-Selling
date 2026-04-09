import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/providers/QueryProvider";
import Script from "next/script";
import SiteChrome from "@/components/SiteChrome";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const orbitron = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bodyClassName = poppins.variable + " " + orbitron.variable + " " + geistSans.variable + " " + geistMono.variable + " antialiased";
const clarityScript = [
  "(function(c,l,a,r,i,t,y){",
  "c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};",
  "t=l.createElement(r);t.async=1;t.src=\"https://www.clarity.ms/tag/\"+i;",
  "y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);",
  "})(window, document, \"clarity\", \"script\", \"vne0fvwfbc\");",
].join("\n");
const googleAnalyticsScript = [
  "window.dataLayer = window.dataLayer || [];",
  "function gtag(){dataLayer.push(arguments);}",
  "gtag('js', new Date());",
  "gtag('config', 'G-WF0T8DDP07');",
].join("\n");

export const metadata: Metadata = {
  title: "Elite Motor Cars – Buy & Sell Used Cars in Australia | 10K+ Second-Hand Cars",
  description:
    "Explore over 10,000 fully inspected second-hand cars at Elite Motor Cars. Buy and sell used cars with confidence, book a test drive, and enjoy a 5-day money-back guarantee plus a free one-year comprehensive service warranty.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script type="text/javascript" id="microsoft-clarity" strategy="afterInteractive">
          {clarityScript}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WF0T8DDP07"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {googleAnalyticsScript}
        </Script>
      </head>
      <body className={bodyClassName}>
        <QueryProvider>
          <SiteChrome>{children}</SiteChrome>
          <Toaster
            position="bottom-right"
            richColors={true}
            closeButton={true}
            toastOptions={{
              style: {
                background: "#fff",
                border: "1px solid #f23410",
                borderRadius: "0.75rem",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
              },
              className: "font-medium",
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
