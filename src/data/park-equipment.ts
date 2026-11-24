export type EquipmentId = "pullup-bar" | "dip-bars" | "ground";

export interface Equipment {
  id: EquipmentId;
  name: string;
  description: string;
  /** Skill slugs from the app that can be trained on this equipment. */
  skills: string[];
}

export const equipment: Equipment[] = [
  {
    id: "pullup-bar",
    name: "Pull-up bar",
    description: "The high straight bar. Hang, pull, swing over and hold levers.",
    skills: ["pullup", "muscle-up", "dips", "elbow-lever", "front-lever", "back-lever"],
  },
  {
    id: "dip-bars",
    name: "Dip bars",
    description: "Two parallel bars at hip height. Press, balance and hold.",
    skills: ["dips", "elbow-lever", "front-lever", "back-lever"],
  },
  {
    id: "ground",
    name: "Ground",
    description: "Flat ground or grass. Everything you need for pushing and hand balance.",
    skills: ["pushup", "frog-stand", "crow-stand", "handstand", "tuck-press", "hspu"],
  },
];
