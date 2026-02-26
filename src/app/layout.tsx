import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins, Orbitron, Inter_Tight } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner';
import Navbar2 from '@/components/Navbar2';
import Process from "@/components/Process";
import Assistance from "@/components/Assistance";
import Footer from "@/components/Footer";
import Bot from "@/components/Bot";
import Footer2 from "@/components/Footer2";

import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

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

export const metadata: Metadata = {
  title: "Elite Motor Cars - Your Import Partner",
  description: "Your trusted partner for importing high-grade vehicles directly from Japan and Europe. We specialize in luxury sedans, hybrid efficiency, and performance icons with end-to-end service and zero stress.",
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
          {`
            (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "vne0fvwfbc");
          `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WF0T8DDP07"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WF0T8DDP07');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${orbitron.variable} antialiased`}
      >
        <Navbar2 />
        {children}
        <Process />
        <Assistance />
        <Footer2 />

        <Bot />

        <Toaster
          position="bottom-right"
          richColors={true}
          closeButton={true}
          toastOptions={{
            style: {
              background: '#fff',
              border: '1px solid #f23410',
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            },
            className: 'font-medium',
          }}
        />
      </body>
    </html>
  );
}
