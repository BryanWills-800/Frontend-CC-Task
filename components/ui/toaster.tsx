"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type ToastVariant = "default" | "success" | "error" | "warning";

type ToastItem = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
};

type ToastInput = Omit<ToastItem, "id" | "duration"> & {
  duration?: number;
};

type ToastApi = {
  show: (toast: ToastInput) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  warning: (title: string, description?: string) => void;
};

let pushToast: ((toast: ToastItem) => void) | null = null;
let removeToast: ((id: number) => void) | null = null;
let nextToastId = 1;

const ToastContext = createContext<ToastApi | null>(null);

export const toast: ToastApi = {
  show: (input) => {
    const item: ToastItem = {
      id: nextToastId++,
      duration: input.duration ?? 3200,
      title: input.title,
      description: input.description,
      variant: input.variant,
    };

    pushToast?.(item);

    if (item.duration > 0) {
      window.setTimeout(() => {
        removeToast?.(item.id);
      }, item.duration);
    }
  },
  success: (title, description) =>
    toast.show({ title, description, variant: "success" }),
  error: (title, description) =>
    toast.show({ title, description, variant: "error" }),
  warning: (title, description) =>
    toast.show({ title, description, variant: "warning" }),
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    pushToast = (toastItem) => {
      setToasts((current) => [...current, toastItem]);
    };

    removeToast = (id) => {
      setToasts((current) => current.filter((toastItem) => toastItem.id !== id));
    };

    return () => {
      pushToast = null;
      removeToast = null;
    };
  }, []);

  const api = useMemo(
    () => toast,
    []
  );

  return (
    <ToastContext.Provider value={api}>
      <div
        aria-live="polite"
        aria-atomic="true"
        className="pointer-events-none fixed bottom-4 right-4 z-50 flex w-[min(100vw-2rem,24rem)] flex-col gap-3"
      >
        {toasts.map((item) => (
          <ToastView key={item.id} item={item} onClose={() => removeToast?.(item.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastView({
  item,
  onClose,
}: {
  item: ToastItem;
  onClose: () => void;
}) {
  return (
    <div
      className={cn(
        "pointer-events-auto rounded-xl border border-border/70 bg-popover p-4 text-popover-foreground shadow-lg",
        item.variant === "success" && "border-emerald-500/40",
        item.variant === "error" && "border-red-500/40",
        item.variant === "warning" && "border-amber-500/40"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{item.title}</p>
          {item.description ? (
            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          onClick={onClose}
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    return toast;
  }

  return context;
}
