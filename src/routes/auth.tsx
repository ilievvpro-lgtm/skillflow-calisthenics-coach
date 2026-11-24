import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { PhotoBackdrop } from "@/components/app/PhotoBackdrop";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import { useSessionUser } from "@/hooks/use-session";
import { lovable } from "@/integrations/lovable";
import { supabase } from "@/integrations/supabase/client";

type Mode = "signin" | "signup";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { mode?: Mode } =>
    search["mode"] === "signup" ? { mode: "signup" } : search["mode"] === "signin" ? { mode: "signin" } : {},
  head: () => ({
    meta: [
      { title: "Sign in or create an account | CALISTHIC" },
      { name: "description", content: "Sign in or create your CALISTHIC account to start training." },
      { property: "og:title", content: "Sign in | CALISTHIC" },
      { property: "og:description", content: "Sign in or create your CALISTHIC account to start training." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

const field =
  "h-12 w-full rounded-lg border border-border bg-background/70 px-4 text-base text-foreground backdrop-blur-md placeholder:text-muted-foreground focus:border-primary focus:outline-none";

function AuthPage() {
  const navigate = useNavigate();
  const search = Route.useSearch();
  const { user } = useSessionUser();
  const [mode, setMode] = useState<Mode>(search.mode ?? "signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) void navigate({ to: "/home", replace: true });
  }, [user, navigate]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (!data.session) toast.success("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  async function social(p: "google" | "lovable") {
    const res = await lovable.auth.signInWithOAuth(p, { redirect_uri: window.location.origin });
    if (res.error) toast.error(res.error.message);
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <PhotoBackdrop />
      <div className="relative flex flex-1 flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))]">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost" size="icon" aria-label="Back">
            <Link to="/"><ArrowLeft /></Link>
          </Button>
          <p className="font-display text-sm font-extrabold tracking-[0.3em] text-primary">{brand.appName}</p>
          <span className="size-10" />
        </div>

        <div className="mt-auto animate-rise">
          <div role="tablist" aria-label="Account" className="grid grid-cols-2 gap-1 rounded-lg border border-border bg-background/60 p-1 backdrop-blur-md">
            {(["signin", "signup"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                type="button"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`h-10 rounded-md text-sm font-semibold transition-colors ${mode === m ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >
                {m === "signin" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <h1 className="mt-6 text-[2rem] font-extrabold leading-tight">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {mode === "signin" ? "Pick up your training where you left off." : "It takes 20 seconds. Then we start with your first push-up."}
          </p>

          <form onSubmit={onSubmit} className="mt-6 grid gap-3">
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" aria-label="Email" autoComplete="email" className={field} />
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" aria-label="Password" autoComplete={mode === "signin" ? "current-password" : "new-password"} className={field} />
            <Button type="submit" variant="hero" size="xl" disabled={busy} className="mt-1 w-full">
              {mode === "signin" ? "Log in" : "Create account"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-2.5">
            <Button variant="outline" size="lg" className="w-full bg-background/50 backdrop-blur-md" onClick={() => void social("google")}>Continue with Google</Button>
            <Button variant="outline" size="lg" className="w-full bg-background/50 backdrop-blur-md" onClick={() => void social("lovable")}>Continue with Lovable</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
