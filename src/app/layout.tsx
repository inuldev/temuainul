<<<<<<< HEAD
import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
>>>>>>> 78fdcc1 (prepare for part 2)
import { NuqsAdapter } from "nuqs/adapters/next";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
<<<<<<< HEAD
import { ErrorBoundary } from "@/components/error-boundary";
=======
>>>>>>> 78fdcc1 (prepare for part 2)

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "Temu.AI - AI Meeting Assistant",
  description:
    "Temu.AI adalah aplikasi AI Meeting Assistant untuk membantu bisnis Anda dengan meeting yang lebih produktif",
  keywords: [
    "AI",
    "meeting",
    "assistant",
    "video call",
    "transcription",
    "summary",
  ],
  authors: [{ name: "Temu.AI Team" }],
  creator: "Temu.AI",
  publisher: "Temu.AI",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
=======
  title: "Temu.AI",
  description: "Temu.AI adalah aplikasi Agen AI untuk membantu bisnis Anda",
  icons: {
    icon: "/logo.svg",
  },
>>>>>>> 78fdcc1 (prepare for part 2)
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD
    <html suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            <ErrorBoundary>
              <Toaster
                position="top-right"
                expand={false}
                richColors
                closeButton
              />
              {children}
            </ErrorBoundary>
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
=======
    <NuqsAdapter>
      <TRPCReactProvider>
        <html lang="id" suppressHydrationWarning>
          <body className={`${inter.className} antialiased`}>
            <Toaster />
            {children}
          </body>
        </html>
      </TRPCReactProvider>
    </NuqsAdapter>
>>>>>>> 78fdcc1 (prepare for part 2)
  );
}
