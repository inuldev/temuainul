import { renderHook } from "@testing-library/react";
import { useToast, toastMessages } from "../use-toast-notifications";

// Import mocked toast (already mocked in jest.setup.js)
import { toast } from "sonner";

describe("useToast", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call toast.success with correct parameters", () => {
    const { result } = renderHook(() => useToast());

    result.current.success("Success message");

    expect(toast.success).toHaveBeenCalledWith("Success message", {
      description: undefined,
      duration: 4000,
      action: undefined,
    });
  });

  it("should call toast.error with custom options", () => {
    const { result } = renderHook(() => useToast());

    const options = {
      description: "Error description",
      duration: 5000,
      action: {
        label: "Retry",
        onClick: jest.fn(),
      },
    };

    result.current.error("Error message", options);

    expect(toast.error).toHaveBeenCalledWith("Error message", {
      description: "Error description",
      duration: 5000,
      action: {
        label: "Retry",
        onClick: options.action.onClick,
      },
    });
  });

  it("should call toast.warning with default duration", () => {
    const { result } = renderHook(() => useToast());

    result.current.warning("Warning message");

    expect(toast.warning).toHaveBeenCalledWith("Warning message", {
      description: undefined,
      duration: 4000,
      action: undefined,
    });
  });

  it("should call toast.info", () => {
    const { result } = renderHook(() => useToast());

    result.current.info("Info message");

    expect(toast.info).toHaveBeenCalledWith("Info message", {
      description: undefined,
      duration: 4000,
      action: undefined,
    });
  });

  it("should call toast.loading with infinite duration", () => {
    const { result } = renderHook(() => useToast());

    result.current.loading("Loading message");

    expect(toast.loading).toHaveBeenCalledWith("Loading message", {
      description: undefined,
      duration: Infinity,
    });
  });

  it("should call toast.promise", () => {
    const { result } = renderHook(() => useToast());
    const mockPromise = Promise.resolve("data");

    const messages = {
      loading: "Loading...",
      success: "Success!",
      error: "Error!",
    };

    result.current.promise(mockPromise, messages);

    expect(toast.promise).toHaveBeenCalledWith(mockPromise, messages);
  });

  it("should call toast.dismiss", () => {
    const { result } = renderHook(() => useToast());

    result.current.dismiss("toast-id");

    expect(toast.dismiss).toHaveBeenCalledWith("toast-id");
  });

  it("should call toast.dismiss without id", () => {
    const { result } = renderHook(() => useToast());

    result.current.dismiss();

    expect(toast.dismiss).toHaveBeenCalledWith(undefined);
  });
});

describe("toastMessages", () => {
  it("should have agent messages", () => {
    expect(toastMessages.agent.created).toBe("Agent berhasil dibuat");
    expect(toastMessages.agent.createError).toBe("Gagal membuat agent");
  });

  it("should have meeting messages", () => {
    expect(toastMessages.meeting.created).toBe("Meeting berhasil dibuat");
    expect(toastMessages.meeting.joinError).toBe("Gagal bergabung ke meeting");
  });

  it("should have auth messages", () => {
    expect(toastMessages.auth.signInSuccess).toBe("Berhasil masuk");
    expect(toastMessages.auth.sessionExpired).toBe("Sesi Anda telah berakhir");
  });

  it("should have general messages", () => {
    expect(toastMessages.general.saved).toBe("Data berhasil disimpan");
    expect(toastMessages.general.networkError).toBe(
      "Koneksi bermasalah, silakan coba lagi"
    );
  });
});
