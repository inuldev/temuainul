import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { useToast, useToastMessages } from "./use-toast-notifications";

interface UseCopyToClipboardOptions {
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const toastMessages = useToastMessages();

  const {
    successMessage = toastMessages.general.copied,
    errorMessage = toastMessages.general.copyError,
    showToast = true,
  } = options;

  const copy = async (text: string) => {
    if (!text) return false;

    setIsLoading(true);
    setIsCopied(false);

    try {
      const success = await copyToClipboard(text);

      if (success) {
        setIsCopied(true);

        if (showToast) {
          toast.success(successMessage);
        }

        // Reset copied state after 2 seconds
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);

        return true;
      } else {
        if (showToast) {
          toast.error(errorMessage);
        }
        return false;
      }
    } catch (error) {
      console.error("Copy failed:", error);

      if (showToast) {
        toast.error(errorMessage);
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    copy,
    isCopied,
    isLoading,
  };
};
