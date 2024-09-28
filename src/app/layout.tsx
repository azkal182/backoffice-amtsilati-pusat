import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";

import { ThemeProvider } from "@/providers/theme-provider";
import { EdgeStoreProvider } from "@/providers/edge-store-provider";
import React from "react";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "Amtsilati Pusat",
  description: "Backoffice from amtsilati pusat app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={GeistSans.className}>
          <EdgeStoreProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </EdgeStoreProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
