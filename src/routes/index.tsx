import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { PhotoBackdrop } from "@/components/app/PhotoBackdrop";
import { Button } from "@/components/ui/button";
import { brand } from "@/data/brand";
import { useSessionUser } from "@/hooks/use-session";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CALISTHIC – learn calisthenics skills on your phone" },
      { name: "description", content: "From your first push-up to a front lever: lessons, technique videos and an AI coach." },
      { property: "og:title", content: "CALISTHIC – learn calisthenics skills on your phone" },
      { property: "og:description", content: "From your first push-up to a front lever: lessons, technique videos and an AI coach." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WelcomePage,
});

function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useSessionUser();
  useEffect(() => {
    if (user) void navigate({ to: "/home", replace: true });
  }, [user, navigate]);

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden">
      <PhotoBackdrop />
      <div className="relative flex flex-1 flex-col px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-[max(3rem,env(safe-area-inset-top))]">
        <p className="font-display text-sm font-extrabold tracking-[0.3em] text-primary">{brand.appName}</p>
        <div className="mt-auto animate-rise">
          <h1 className="text-[2.6rem] font-extrabold leading-[1]">
            Train. Improve. <span className="text-primary">Be great.</span>
          </h1>
          <p className="mt-4 max-w-xs text-base leading-relaxed text-muted-foreground">
            From your first push-up to a front lever — step-by-step lessons, technique videos and your own AI coach.
          </p>
          <div className="mt-8 grid gap-3">
            <Button asChild variant="hero" size="xl" className="w-full">
              <Link to="/onboarding">Get started</Link>
            </Button>
            <Button asChild variant="outline" size="xl" className="w-full border-foreground/30 bg-background/40 backdrop-blur-md">
              <Link to="/auth" search={{ mode: "signin" }}>I already have an account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
