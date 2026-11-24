import { fireEvent, render, screen, waitFor, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ComponentType, ReactNode } from "react";

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: { component: ComponentType }) => options,
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

import { Route as CoachRoute } from "@/routes/coach";
import { Route as TechniqueRoute } from "@/routes/technique";
import { skills } from "@/data/skills";

afterEach(() => { cleanup(); vi.unstubAllGlobals(); localStorage.clear(); });

describe("unrestricted free access", () => {
  it("allows coach questions beyond the old 3-question limit even with exhausted saved usage", async () => {
    localStorage.setItem("calisthic:coach-questions", "999");
    Element.prototype.scrollIntoView = vi.fn();
    const fetchMock = vi.fn(async () => new Response("Brace your core."));
    vi.stubGlobal("fetch", fetchMock);
    const Page = (CoachRoute as unknown as { component: ComponentType }).component;
    render(<Page />);
    for (let i = 0; i < 4; i++) {
      fireEvent.change(screen.getByRole("textbox"), { target: { value: `Question ${i}` } });
      fireEvent.click(screen.getByRole("button", { name: "Send" }));
      await waitFor(() => expect(screen.getAllByText("Brace your core.")).toHaveLength(i + 1));
    }
    expect(fetchMock).toHaveBeenCalledTimes(4);
  });

  it("opens all 12 technique pairs without clearing previously watched skills", () => {
    localStorage.setItem("calisthic:technique-watched", JSON.stringify(skills.map(s => s.slug)));
    const Page = (TechniqueRoute as unknown as { component: ComponentType }).component;
    const { container } = render(<Page />);
    const videos = Array.from(container.querySelectorAll("video"));
    expect(videos).toHaveLength(24);
    for (const skill of skills) {
      const wrong = container.querySelector(`video[aria-label="${skill.name} — wrong"]`);
      const right = container.querySelector(`video[aria-label="${skill.name} — right"]`);
      expect(wrong?.getAttribute("src")).toMatch(/\.mp4$/);
      expect(right?.getAttribute("src")).toMatch(/\.mp4$/);
    }
  });
});