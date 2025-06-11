import { serve } from "inngest/next";

import { inngest } from "@/inngest/client";
import { meetingsProcessing } from "@/inngest/functions";

// Create an API that serves functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [meetingsProcessing],
  signingKey:
    process.env.INNGEST_SIGNING_KEY ||
    "signkey-test-12345678901234567890123456789012",
});
