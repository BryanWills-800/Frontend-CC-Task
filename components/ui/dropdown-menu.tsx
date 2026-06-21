"use client";

import {
  useEffect,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export function DropdownMenu({ children }: { children: ReactNode }) {
  useEffect(() => {
    const closeMenus = (target: EventTarget | null) => {
      const node = target as Node | null;

      document
        .querySelectorAll<HTMLDetailsElement>("details[data-dropdown-menu][open]")
        .forEach((menu) => {
          if (node && menu.contains(node)) {
            return;
          }

          menu.removeAttribute("open");
        });
    };

    const handlePointerDown = (event: PointerEvent) => {
      closeMenus(event.target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        document
          .querySelectorAll<HTMLDetailsElement>("details[data-dropdown-menu][open]")
          .forEach((menu) => menu.removeAttribute("open"));
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <details data-dropdown-menu className="relative inline-flex">
      {children}
    </details>
  );
}

export function DropdownMenuTrigger({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLButtonElement>) {
  return (
    <summary
      className={cn(
        "list-none inline-flex h-10 items-center justify-between gap-2 whitespace-nowrap rounded-md border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background [&::-webkit-details-marker]:hidden",
        className
      )}
      {...props}
    >
      {children}
    </summary>
  );
}

export function DropdownMenuContent({
  className,
  align = "end",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & {
  align?: "start" | "end";
}) {
  return (
    <div
      role="menu"
      className={cn(
        "absolute top-full z-50 mt-2 min-w-56 rounded-md border border-border/70 bg-popover p-1 text-popover-foreground shadow-lg",
        align === "end" ? "right-0" : "left-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function DropdownMenuLabel({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

export function DropdownMenuSeparator({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-border", className)} {...props} />;
}

export function DropdownMenuGroup({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("grid gap-1", className)} {...props} />;
}

export function DropdownMenuItem({
  className,
  disabled,
  onClick,
  ...props
}: HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      type="button"
      role="menuitem"
      disabled={disabled}
      className={cn(
        "flex w-full items-center rounded-sm px-2 py-1.5 text-left text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={(event) => {
        onClick?.(event);
        const menu = event.currentTarget.closest(
          "details[data-dropdown-menu]"
        ) as HTMLDetailsElement | null;

        menu?.removeAttribute("open");
      }}
      {...props}
    />
  );
}
