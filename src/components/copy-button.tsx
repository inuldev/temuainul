"use client";

import { CopyIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
  tooltip?: string;
  children?: React.ReactNode;
}

export const CopyButton = ({
  text,
  variant = "outline",
  size = "icon",
  className,
  successMessage,
  errorMessage,
  showToast = true,
  tooltip = "Copy to clipboard",
  children,
}: CopyButtonProps) => {
  const { copy, isCopied, isLoading } = useCopyToClipboard({
    successMessage,
    errorMessage,
    showToast,
  });

  const handleCopy = () => {
    copy(text);
  };

  const buttonContent = children || (
    <>
      {isCopied ? (
        <CheckIcon className="size-4 text-green-600" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </>
  );

  if (tooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={variant}
              size={size}
              onClick={handleCopy}
              disabled={isLoading}
              className={cn(
                "transition-colors",
                isCopied && "text-green-600",
                className
              )}
            >
              {buttonContent}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isCopied ? "Copied!" : tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      disabled={isLoading}
      className={cn(
        "transition-colors",
        isCopied && "text-green-600",
        className
      )}
    >
      {buttonContent}
    </Button>
  );
};

// Specialized copy button for code blocks
export const CodeCopyButton = ({
  code,
  className,
}: {
  code: string;
  className?: string;
}) => {
  return (
    <CopyButton
      text={code}
      variant="ghost"
      size="sm"
      className={cn("absolute top-2 right-2", className)}
      tooltip="Copy code"
      successMessage="Code copied to clipboard"
    />
  );
};

// Copy button with text
export const CopyTextButton = ({
  text,
  label = "Copy",
  copiedLabel = "Copied!",
  className,
}: {
  text: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}) => {
  const { copy, isCopied, isLoading } = useCopyToClipboard();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      disabled={isLoading}
      className={cn("gap-x-2", className)}
    >
      {isCopied ? (
        <>
          <CheckIcon className="size-4 text-green-600" />
          {copiedLabel}
        </>
      ) : (
        <>
          <CopyIcon className="size-4" />
          {label}
        </>
      )}
    </Button>
  );
};
