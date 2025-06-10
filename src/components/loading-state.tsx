import { Loader2Icon } from "lucide-react";
<<<<<<< HEAD
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "minimal" | "card";
  className?: string;
}

export const LoadingState = ({
  title,
  description,
  size = "md",
  variant = "default",
  className,
}: Props) => {
  const t = useTranslations("loading");

  const defaultTitle = title || t("default");
  const defaultDescription = description || t("pleaseWait");
  const sizeClasses = {
    sm: "size-4",
    md: "size-6",
    lg: "size-8",
  };

  const containerClasses = {
    default: "py-4 px-8 flex flex-1 items-center justify-center",
    minimal: "flex items-center justify-center p-4",
    card: "py-8 px-8 flex flex-1 items-center justify-center",
  };

  if (variant === "minimal") {
    return (
      <div className={cn(containerClasses.minimal, className)}>
        <div className="flex items-center gap-x-2">
          <Loader2Icon
            className={cn(sizeClasses[size], "animate-spin text-primary")}
          />
          <span className="text-sm text-muted-foreground">{defaultTitle}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(containerClasses[variant], className)}>
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm border">
        <Loader2Icon
          className={cn(sizeClasses[size], "animate-spin text-primary")}
        />
        <div className="flex flex-col gap-y-2 text-center max-w-sm">
          <h6 className="text-lg font-medium">{defaultTitle}</h6>
          <p className="text-sm text-muted-foreground">{defaultDescription}</p>
=======

interface Props {
  title: string;
  description: string;
}

export const LoadingState = ({ title, description }: Props) => {
  return (
    <div className="py-4 px-8 flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
        <Loader2Icon className="size-6 animate-spin text-primary" />
        <div className="flex flex-col gap-y-2 text-center">
          <h6 className="text-lg font-medium">{title}</h6>
          <p className="text-sm">{description}</p>
>>>>>>> 78fdcc1 (prepare for part 2)
        </div>
      </div>
    </div>
  );
};
<<<<<<< HEAD

// Skeleton components untuk loading states yang lebih specific
export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="h-4 w-4 bg-muted rounded animate-pulse" />
          <div className="h-4 flex-1 bg-muted rounded animate-pulse" />
          <div className="h-4 w-20 bg-muted rounded animate-pulse" />
          <div className="h-4 w-16 bg-muted rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="p-6 border rounded-lg space-y-4">
      <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
      <div className="h-4 w-1/2 bg-muted rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-muted rounded animate-pulse" />
        <div className="h-3 w-5/6 bg-muted rounded animate-pulse" />
      </div>
    </div>
  );
};

export const ButtonSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-9 w-20 bg-muted rounded animate-pulse", className)} />
  );
};
=======
>>>>>>> 78fdcc1 (prepare for part 2)
