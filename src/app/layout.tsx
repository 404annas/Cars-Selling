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
  title: "Car Detailing",
  description: "Get Your Car Details Now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
              border: '1px solid #050c4e',
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
