import { serve } from "inngest/next";
import { NextRequest, NextResponse } from "next/server";

import { inngest } from "@/inngest/client";
import { meetingsProcessing } from "@/inngest/functions";

// Create the serve handler and set log level to warn in development
const handler = serve({
  client: inngest,
  functions: [meetingsProcessing],
  signingKey:
    process.env.INNGEST_SIGNING_KEY ||
    "signkey-test-12345678901234567890123456789012",
  logLevel: process.env.NODE_ENV === "development" ? "warn" : "info",
});

// Custom PUT handler to suppress empty body errors in development
export const PUT = async (
  req: NextRequest,
  context?: { params?: Record<string, string> }
) => {
  try {
    return await handler.PUT(req, context);
  } catch (error: unknown) {
    // Suppress JSON parsing errors in development for health checks
    if (
      process.env.NODE_ENV === "development" &&
      error instanceof Error &&
      error.message.includes("Unexpected end of JSON input")
    ) {
      console.warn("[Inngest] Suppressed empty body error in development");
      return NextResponse.json({ status: "ok" }, { status: 200 });
    }
    throw error;
  }
};

export const GET = handler.GET;
export const POST = handler.POST;
