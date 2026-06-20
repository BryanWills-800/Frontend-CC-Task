import type { ReactNode } from "react";

export interface ISSLocation {
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
  timestamp: number;
}

export interface TelemetryExportRecord {
  timestamp: number;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
}

export type ExportFormat = "csv" | "json" | "pdf";

export interface ControlButtonsProps {
  history: ISSLocation[];
  latestData: ISSLocation | null;
  isRunning: boolean;
  onRunningChange: (isRunning: boolean) => void;
  onClearHistory: () => void;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export interface AuthSessionResponse {
  isLoggedIn: boolean;
  email: string | null;
}

export interface AuthLoginResponse {
  isLoggedIn: boolean;
  email: string;
}

export interface LoginBody {
  email?: string;
  password?: string;
}

export interface User {
  name: string;
  role: string;
  email: string;
  password: string;
}

export interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "neutral" | "accent";
  type?: "button" | "submit" | "reset";
}
