"use client";

import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AlertTriangleIcon, RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  useEffect(() => {
    // Log error ke console untuk development
    console.error("Application Error:", error);

    // Di production, bisa kirim ke service monitoring seperti Sentry
    if (process.env.NODE_ENV === "production") {
      // TODO: Integrate dengan error monitoring service
      // Sentry.captureException(error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Terjadi Kesalahan</AlertTitle>
          <AlertDescription className="mt-2">
            Aplikasi mengalami masalah tak terduga. Silakan coba lagi atau
            hubungi support jika masalah berlanjut.
          </AlertDescription>
        </Alert>

        <div className="mt-4 space-y-2">
          <Button onClick={resetErrorBoundary} className="w-full">
            <RefreshCwIcon className="h-4 w-4 mr-2" />
            Coba Lagi
          </Button>

          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Kembali ke Beranda
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-4 p-4 bg-muted rounded-lg">
            <summary className="cursor-pointer font-medium">
              Detail Error (Development)
            </summary>
            <pre className="mt-2 text-sm overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}

interface ErrorMonitorProps {
  children: React.ReactNode;
}

export function ErrorMonitor({ children }: ErrorMonitorProps) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("Error Boundary caught an error:", error, errorInfo);

        // Di production, log ke monitoring service
        if (process.env.NODE_ENV === "production") {
          // TODO: Send to monitoring service
          // Sentry.captureException(error, { extra: errorInfo });
        }
      }}
      onReset={() => {
        // Reset any state if needed
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
