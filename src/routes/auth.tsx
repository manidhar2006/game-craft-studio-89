import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, Loader2 } from "lucide-react";

const searchSchema = z.object({
  mode: z.enum(["signin", "signup"]).optional().default("signin"),
});

export const Route = createFileRoute("/auth")({
  validateSearch: zodValidator(searchSchema),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) navigate({ to: "/lobby" });
  }, [user, authLoading, navigate]);

  const isSignup = mode === "signup";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (isSignup) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/lobby`,
            data: { display_name: displayName || email.split("@")[0] },
          },
        });
        if (error) throw error;
        toast.success("Welcome aboard!");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Signed in.");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-hero shadow-soft">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-display text-lg font-semibold tracking-tight">DPDPA Tycoon</span>
        </Link>

        <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-soft backdrop-blur animate-fade-up">
          <h1 className="font-display text-3xl font-semibold tracking-tight">
            {isSignup ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {isSignup
              ? "Pick a name your fellow players will see at the table."
              : "Sign in to enter the lobby."}
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {isSignup && (
              <div className="space-y-1.5">
                <Label htmlFor="name">Display name</Label>
                <Input
                  id="name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="e.g. Aarav"
                  className="h-11 rounded-xl"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={submitting}
              className="h-11 w-full rounded-xl text-base"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSignup ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "New here?"}{" "}
            <Link
              to="/auth"
              search={{ mode: isSignup ? "signin" : "signup" }}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {isSignup ? "Sign in" : "Create one"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
