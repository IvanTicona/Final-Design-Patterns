import { User } from "./User";
import { ReactNode } from "react";

export interface AuthContextProps {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
}

export interface AuthProviderProps {
  children: ReactNode;
}