"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { RefreshCwIcon, BugIcon } from "lucide-react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

import { Button } from "./ui/button";
import { ErrorState } from "./error-state";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  const isDevelopment = process.env.NODE_ENV === "development";
  const t = useTranslations("errors");

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-8">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border max-w-lg">
        <div className="p-3 bg-destructive/10 rounded-full">
          <BugIcon className="size-8 text-destructive" />
        </div>

        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-semibold">{t("somethingWentWrong")}</h6>
          <p className="text-sm text-muted-foreground">
            {t("unexpectedError")}
          </p>

          {isDevelopment && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer text-sm font-medium text-destructive">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs bg-muted p-3 rounded overflow-auto max-h-32">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>

        <div className="flex gap-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={resetErrorBoundary}
            className="gap-x-2"
          >
            <RefreshCwIcon className="size-4" />
            {t("tryAgain")}
          </Button>

          <Button
            variant="default"
            size="sm"
            onClick={() => (window.location.href = "/")}
            className="gap-x-2"
          >
            {t("goHome")}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

export const ErrorBoundary = ({
  children,
  fallback: Fallback = ErrorFallback,
  onError,
}: ErrorBoundaryProps) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }

    // Call custom error handler if provided
    onError?.(error, errorInfo);

    // Here you could also send error to monitoring service like Sentry
    // Example: Sentry.captureException(error, { contexts: { react: errorInfo } });
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={Fallback}
      onError={handleError}
      onReset={() => {
        // Optionally clear any error state here
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

// Specialized error boundaries for different parts of the app
export const PageErrorBoundary = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error("Page Error:", error, errorInfo);
        // Could send to analytics/monitoring here
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export const ComponentErrorBoundary = ({
  children,
  componentName,
}: {
  children: React.ReactNode;
  componentName?: string;
}) => {
  return (
    <ErrorBoundary
      fallback={({ resetErrorBoundary }) => (
        <ErrorState
          title={`Error in ${componentName || "Component"}`}
          description="This component failed to load properly."
          variant="minimal"
          showRetry
          onRetry={resetErrorBoundary}
        />
      )}
      onError={(error, errorInfo) => {
        console.error(`Component Error (${componentName}):`, error, errorInfo);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};
