import heroAsset from "@/assets/plamen-full-handstand.png.asset.json";

/** Full-screen creator photo, slightly blurred and darkened so buttons on top stay readable. */
export function PhotoBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <img src={heroAsset.url} alt="" className="size-full scale-105 object-cover object-center blur-[3px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/55 to-background" />
    </div>
  );
}
