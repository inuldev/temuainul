import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface ToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useToast = () => {
  const success = (message: string, options?: ToastOptions) => {
    return toast.success(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  };

  const error = (message: string, options?: ToastOptions) => {
    return toast.error(message, {
      description: options?.description,
      duration: options?.duration || 5000,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  };

  const warning = (message: string, options?: ToastOptions) => {
    return toast.warning(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  };

  const info = (message: string, options?: ToastOptions) => {
    return toast.info(message, {
      description: options?.description,
      duration: options?.duration || 4000,
      action: options?.action
        ? {
            label: options.action.label,
            onClick: options.action.onClick,
          }
        : undefined,
    });
  };

  const loading = (message: string, options?: Omit<ToastOptions, "action">) => {
    return toast.loading(message, {
      description: options?.description,
      duration: options?.duration || Infinity,
    });
  };

  const promise = <T>(
    promise: Promise<T>,
    {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: Error | unknown) => string);
    }
  ) => {
    return toast.promise(promise, {
      loading: loadingMessage,
      success: successMessage,
      error: errorMessage,
    });
  };

  const dismiss = (toastId?: string | number) => {
    return toast.dismiss(toastId);
  };

  return {
    success,
    error,
    warning,
    info,
    loading,
    promise,
    dismiss,
  };
};

// Hook for internationalized toast messages
export const useToastMessages = () => {
  const t = useTranslations("toast");

  return {
    agent: {
      created: t("agent.created"),
      updated: t("agent.updated"),
      deleted: t("agent.deleted"),
      createError: t("agent.createError"),
      updateError: t("agent.updateError"),
      deleteError: t("agent.deleteError"),
    },
    meeting: {
      created: t("meeting.created"),
      updated: t("meeting.updated"),
      deleted: t("meeting.deleted"),
      joined: t("meeting.joined"),
      left: t("meeting.left"),
      createError: t("meeting.createError"),
      updateError: t("meeting.updateError"),
      deleteError: t("meeting.deleteError"),
      joinError: t("meeting.joinError"),
    },
    auth: {
      signInSuccess: t("auth.signInSuccess"),
      signOutSuccess: t("auth.signOutSuccess"),
      signInError: t("auth.signInError"),
      signOutError: t("auth.signOutError"),
    },
    general: {
      saved: t("general.saved"),
      copied: t("general.copied"),
      saveError: t("general.saveError"),
      copyError: t("general.copyError"),
    },
  };
};

// Predefined toast messages for common actions (deprecated - use useToastMessages instead)
export const toastMessages = {
  // Agent actions
  agent: {
    created: "Agent berhasil dibuat",
    updated: "Agent berhasil diperbarui",
    deleted: "Agent berhasil dihapus",
    createError: "Gagal membuat agent",
    updateError: "Gagal memperbarui agent",
    deleteError: "Gagal menghapus agent",
  },

  // Meeting actions
  meeting: {
    created: "Meeting berhasil dibuat",
    updated: "Meeting berhasil diperbarui",
    deleted: "Meeting berhasil dihapus",
    joined: "Berhasil bergabung ke meeting",
    left: "Anda telah keluar dari meeting",
    createError: "Gagal membuat meeting",
    updateError: "Gagal memperbarui meeting",
    deleteError: "Gagal menghapus meeting",
    joinError: "Gagal bergabung ke meeting",
  },

  // Auth actions
  auth: {
    signInSuccess: "Berhasil masuk",
    signOutSuccess: "Berhasil keluar",
    signInError: "Gagal masuk",
    signOutError: "Gagal keluar",
    sessionExpired: "Sesi Anda telah berakhir",
  },

  // General actions
  general: {
    saved: "Data berhasil disimpan",
    copied: "Berhasil disalin ke clipboard",
    saveError: "Gagal menyimpan data",
    copyError: "Gagal menyalin ke clipboard",
    networkError: "Koneksi bermasalah, silakan coba lagi",
    unexpectedError: "Terjadi kesalahan yang tidak terduga",
  },
} as const;
