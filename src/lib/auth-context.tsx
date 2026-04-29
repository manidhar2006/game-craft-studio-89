import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

interface AuthContextValue {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAnonymous: boolean;
  signOut: () => Promise<void>;
  ensureSession: () => Promise<User>;
  linkEmail: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const ensureInflightRef = useRef<Promise<User> | null>(null);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
      setLoading(false);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const ensureSession = useCallback(async (): Promise<User> => {
    const existing = (await supabase.auth.getSession()).data.session;
    if (existing?.user) return existing.user;

    if (ensureInflightRef.current) return ensureInflightRef.current;

    const inflight = (async () => {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error || !data.user) {
        throw error ?? new Error("Could not create guest session");
      }
      return data.user;
    })();

    ensureInflightRef.current = inflight;
    try {
      return await inflight;
    } finally {
      ensureInflightRef.current = null;
    }
  }, []);

  const linkEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.updateUser({ email, password });
    if (error) throw error;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      isAnonymous: Boolean(session?.user?.is_anonymous),
      signOut,
      ensureSession,
      linkEmail,
    }),
    [session, loading, signOut, ensureSession, linkEmail],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
