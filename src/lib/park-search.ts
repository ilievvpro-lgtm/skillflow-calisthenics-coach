import type { Park } from "@/data/parks";

const map: Record<string, string> = { а:"a",б:"b",в:"v",г:"g",д:"d",е:"e",ж:"zh",з:"z",и:"i",й:"y",к:"k",л:"l",м:"m",н:"n",о:"o",п:"p",р:"r",с:"s",т:"t",у:"u",ф:"f",х:"h",ц:"ts",ч:"ch",ш:"sh",щ:"sht",ъ:"a",ь:"y",ю:"yu",я:"ya" };

/** Lowercase, Cyrillic → Latin, and drop spelling variants so "Дружба", "Drujba" and "druzhba" match. */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .split("")
    .map((c) => map[c] ?? c)
    .join("")
    .replace(/j/g, "zh")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

export function searchParks(parks: Park[], query: string): Park[] {
  const q = normalize(query);
  if (!q) return parks;
  const words = q.split(" ");
  return parks.filter((p) => {
    const hay = normalize(`${p.name} ${p.area} ${p.searchArea} ${p.address}`);
    return words.every((w) => hay.includes(w));
  });
}
