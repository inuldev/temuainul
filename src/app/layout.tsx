import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/client";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Temu.AI",
  description: "Temu.AI adalah aplikasi Agen AI untuk membantu bisnis Anda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="id" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </html>
    </TRPCReactProvider>
  );
}
