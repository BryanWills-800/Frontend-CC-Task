import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthButtons from "@/app/components/AuthButtons";
import Imaging from "@/app/components/Imaging";
import { AuthProvider } from "@/app/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ISS Telemetry Dashboard",
  description: "Live ISS telemetry dashboard",
};

export function Navbar() {
  return (
    <div
      id="navbar"
      className="navbar relative z-20"
      style={{
        display: "flex",
        alignItems: "center",
        height: "3.5rem",
        maxHeight: "3.5rem",
      }}
    >

      <h1
        className="text-white text-2xl"
        style={{
          margin: 0,
          textAlign: "center",
          width: "100%",
          color: "white",
          textShadow: "0 0 3px white, 0 0 5px white",
          fontSize: "1.5rem",
          fontWeight: "bold",
          letterSpacing: "0.1rem",
        }}
      >
        INTERNATIONAL SPACE STATION
      </h1>

      <AuthButtons />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        <AuthProvider>
          <Imaging />

          <div className="relative z-10 min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
