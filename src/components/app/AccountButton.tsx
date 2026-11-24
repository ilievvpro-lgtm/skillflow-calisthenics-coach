import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LogIn, LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useSessionUser } from "@/hooks/use-session";
import { supabase } from "@/integrations/supabase/client";

export function AccountButton() {
  const { user, ready } = useSessionUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  if (!ready) return <span className="size-9" />;
  if (!user)
    return (
      <Button asChild variant="outline" size="sm" className="rounded-full">
        <Link to="/auth" search={{ mode: "signin" }}><LogIn className="size-3.5" /> Log in</Link>
      </Button>
    );
  return (
    <Button
      variant="outline"
      size="sm"
      type="button"
      className="rounded-full"
      title={user.email ?? ""}
      onClick={async () => {
        await queryClient.cancelQueries();
        queryClient.clear();
        await supabase.auth.signOut();
        void navigate({ to: "/auth", replace: true });
      }}
    >
      <LogOut className="size-3.5" /> Sign out
    </Button>
  );
}
