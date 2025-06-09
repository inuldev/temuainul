import { AlertCircleIcon, RefreshCwIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  description?: string;
  variant?: "default" | "minimal" | "page";
  showRetry?: boolean;
  showHome?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
}

export const ErrorState = ({
  title = "Something went wrong",
  description = "We encountered an error while loading this content",
  variant = "default",
  showRetry = false,
  showHome = false,
  onRetry,
  onHome,
  className,
}: Props) => {
  const containerClasses = {
    default: "py-4 px-8 flex flex-1 items-center justify-center",
    minimal: "flex items-center justify-center p-4",
    page: "min-h-[50vh] flex items-center justify-center p-8",
  };

  if (variant === "minimal") {
    return (
      <div className={cn(containerClasses.minimal, className)}>
        <div className="flex items-center gap-x-2 text-destructive">
          <AlertCircleIcon className="size-4" />
          <span className="text-sm">{title}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(containerClasses[variant], className)}>
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border max-w-md">
        <div className="p-3 bg-destructive/10 rounded-full">
          <AlertCircleIcon className="size-8 text-destructive" />
        </div>

        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-semibold">{title}</h6>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {(showRetry || showHome) && (
          <div className="flex gap-x-2">
            {showRetry && onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="gap-x-2"
              >
                <RefreshCwIcon className="size-4" />
                Try Again
              </Button>
            )}

            {showHome && onHome && (
              <Button
                variant="default"
                size="sm"
                onClick={onHome}
                className="gap-x-2"
              >
                <HomeIcon className="size-4" />
                Go Home
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
