import { Inter } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { NuqsAdapter } from "nuqs/adapters/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { Toaster } from "@/components/ui/sonner";
import { TRPCReactProvider } from "@/trpc/client";
import { ErrorBoundary } from "@/components/error-boundary";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
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
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
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
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
