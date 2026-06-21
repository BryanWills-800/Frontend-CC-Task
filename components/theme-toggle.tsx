"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "@/components/theme-provider";

const themeLabels: Record<Theme, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Toggle dark mode"
        onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      >
        <span aria-hidden="true">{resolvedTheme === "dark" ? "L" : "D"}</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger className="min-w-36">
          <span className="flex items-center gap-2">
            <span>Theme</span>
            <Badge variant="secondary" className="rounded-full px-2 py-0.5">
              {themeLabels[theme]}
            </Badge>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Color mode</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(["system", "light", "dark"] as Theme[]).map((option) => (
            <DropdownMenuItem
              key={option}
              className={cn(theme === option && "bg-accent text-accent-foreground")}
              onClick={() => setTheme(option)}
            >
              {themeLabels[option]}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
