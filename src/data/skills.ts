export type SkillLevel = "Foundation" | "Beginner+" | "Intermediate" | "Intermediate+" | "Advanced";

export interface ProgressionStep {
  title: string;
  detail: string;
  target: string;
}

export interface BreakdownPhase {
  phase: string;
  cue: string;
}

export interface Skill {
  slug: string;
  name: string;
  nameEn: string;
  level: SkillLevel;
  tagline: string;
  /** Must be met before starting the skill. */
  prerequisites: string[];
  technique: string[];
  steps: ProgressionStep[];
  breakdown: BreakdownPhase[];
  hacks: string[];
  /** Short wrong-vs-right contrast used on the video page. */
  wrong: string;
  right: string;
}

/** Ordered from easiest to hardest in the creator's teaching sequence. */
export const skills: Skill[] = [
  {
    "slug": "pushup",
    "name": "Push-up",
    "nameEn": "Push-up",
    "level": "Foundation",
    "tagline": "The foundation of every pushing movement.",
    "prerequisites": [
      "30-second straight plank without sagging",
      "10 clean knee push-ups"
    ],
    "technique": [
      "Place your hands slightly wider than your shoulders, fingers forward.",
      "Keep one straight body line: brace your core and glutes.",
      "Move your elbows back at about 45°, not out to the sides.",
      "Bring your chest to the floor, then push the floor away."
    ],
    "steps": [
      {
        "title": "Wall push-ups",
        "detail": "Learn a straight body line with less load.",
        "target": "3 × 20"
      },
      {
        "title": "Incline push-ups",
        "detail": "Place your hands on a bench or waist-high bar.",
        "target": "3 × 15"
      },
      {
        "title": "Knee push-ups",
        "detail": "Use full range of motion, chest to the floor.",
        "target": "3 × 15"
      },
      {
        "title": "Negative push-ups",
        "detail": "Lower for 3–4 seconds, then return from your knees.",
        "target": "3 × 8"
      },
      {
        "title": "Full push-ups",
        "detail": "Keep clean form without sagging at the lower back.",
        "target": "3 × 20"
      }
    ],
    "breakdown": [
      {
        "phase": "Setup",
        "cue": "Straight plank, shoulders over wrists."
      },
      {
        "phase": "Lower",
        "cue": "Take 2 seconds down with elbows moving back."
      },
      {
        "phase": "Bottom",
        "cue": "Chest touches first; do not lead with your lower back."
      },
      {
        "phase": "Push",
        "cue": "Press the floor away and spread your shoulder blades at the top."
      }
    ],
    "hacks": [
      "Squeeze your glutes to stop your lower back from sagging.",
      "Look about 20 cm in front of your hands, not between them.",
      "Practice half repetitions until you can perform clean full push-ups."
    ],
    "wrong": "Retracted shoulder blades, raised hips and elbows flaring out.",
    "right": "Protracted shoulder blades, elbows tucked and glutes engaged."
  },
  {
    "slug": "dips",
    "name": "Dips",
    "nameEn": "Dips",
    "level": "Foundation",
    "tagline": "Chest and triceps strength for everything above the bar.",
    "prerequisites": [
      "15 clean push-ups",
      "30-second parallel-bar support hold"
    ],
    "technique": [
      "Keep your shoulders down and away from your ears throughout.",
      "Lean slightly forward with your legs behind you.",
      "Lower until your shoulders are just below your elbows.",
      "Fully straighten your arms at the top and press down."
    ],
    "steps": [
      {
        "title": "Support hold",
        "detail": "Straight arms, shoulders down.",
        "target": "3 × 30 sec"
      },
      {
        "title": "Bench dips",
        "detail": "Feet on the ground, full range of motion.",
        "target": "3 × 15"
      },
      {
        "title": "Negative dips",
        "detail": "Lower on parallel bars for 4 seconds.",
        "target": "3 × 6"
      },
      {
        "title": "Band-assisted dips",
        "detail": "Place a resistance band under your knees.",
        "target": "3 × 10"
      },
      {
        "title": "Full dips",
        "detail": "Stay controlled without bouncing at the bottom.",
        "target": "3 × 12"
      }
    ],
    "breakdown": [
      {
        "phase": "Top",
        "cue": "Locked elbows, shoulders down."
      },
      {
        "phase": "Lower",
        "cue": "Lean forward, elbows moving back."
      },
      {
        "phase": "Bottom",
        "cue": "Shoulders just below elbows, no deeper."
      },
      {
        "phase": "Push",
        "cue": "Press the parallel bars toward the ground."
      }
    ],
    "hacks": [
      "Think “long neck” to keep your shoulders away from your ears.",
      "Cross your legs behind you for a more stable body position.",
      "If the front of your shoulder hurts, reduce depth and adjust your forward lean."
    ],
    "wrong": "Shoulders up by the ears, lowering beyond 90° and shoulder-blade retraction.",
    "right": "Protracted shoulder blades, depressed shoulders and lowering to 90°."
  },
  {
    "slug": "pullup",
    "name": "Pull-up",
    "nameEn": "Pull-up",
    "level": "Foundation",
    "tagline": "The king of pulling. Your key to muscle-ups and levers.",
    "prerequisites": [
      "30-second active hang",
      "3 × 10 inverted rows"
    ],
    "technique": [
      "Use a shoulder-width grip or slightly wider.",
      "Start from an active hang with shoulder blades pulled down.",
      "Pull your elbows toward your pockets, not your hands toward the bar.",
      "Bring your chin above the bar, then lower under control."
    ],
    "steps": [
      {
        "title": "Active hang",
        "detail": "Hang while pulling your shoulder blades down.",
        "target": "3 × 20 sec"
      },
      {
        "title": "Inverted rows",
        "detail": "Position your body under a low bar, chest toward the bar.",
        "target": "3 × 12"
      },
      {
        "title": "Negative pull-ups",
        "detail": "Jump to the top, then lower for 5 seconds.",
        "target": "3 × 5"
      },
      {
        "title": "Band-assisted pull-ups",
        "detail": "Reduce band assistance each week.",
        "target": "3 × 8"
      },
      {
        "title": "Full pull-ups",
        "detail": "No kipping; use full range of motion.",
        "target": "3 × 10"
      }
    ],
    "breakdown": [
      {
        "phase": "Hang",
        "cue": "Shoulder blades down, core braced."
      },
      {
        "phase": "Initiate",
        "cue": "Drive elbows down toward your ribs."
      },
      {
        "phase": "Top",
        "cue": "Chin above the bar, chest approaching it."
      },
      {
        "phase": "Lower",
        "cue": "Take 2–3 seconds to reach full extension."
      }
    ],
    "hacks": [
      "Grip the bar firmly to engage your back more.",
      "Brace your core on every pull-up to prevent swinging.",
      "Do one repetition whenever you pass the bar: “greasing the groove.”"
    ],
    "wrong": "Elbows tucked inward, relaxed core and swinging legs.",
    "right": "Elbows outward, chest lifted, legs straight and engaged, core braced."
  },
  {
    "slug": "elbow-lever",
    "name": "Elbow Lever",
    "nameEn": "Elbow lever",
    "level": "Beginner+",
    "tagline": "Your first balance: a horizontal body supported on your elbows.",
    "prerequisites": [
      "20 push-ups",
      "30-second straight plank",
      "Healthy, pain-free wrists"
    ],
    "technique": [
      "Point your fingers toward your feet and place your elbows on your lower abdomen near your hip bones.",
      "Lean forward until your feet lift naturally.",
      "Keep your body straight like a plank and look forward."
    ],
    "steps": [
      {
        "title": "Wrist warm-up",
        "detail": "Circle and stretch your wrists on all fours.",
        "target": "2 min"
      },
      {
        "title": "Forward lean",
        "detail": "Knees on the floor, weight supported on your elbows.",
        "target": "3 × 15 sec"
      },
      {
        "title": "Single-leg lift",
        "detail": "Lift one foot off the floor.",
        "target": "3 × 10 sec"
      },
      {
        "title": "Full elbow lever",
        "detail": "Lift both feet off the floor.",
        "target": "3 × 15 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Setup",
        "cue": "Elbows against your abdomen, hands close together."
      },
      {
        "phase": "Lean",
        "cue": "Move shoulders ahead of your hands."
      },
      {
        "phase": "Lift",
        "cue": "Engage your glutes and straighten your legs."
      },
      {
        "phase": "Hold",
        "cue": "Breathe and make small fingertip corrections."
      }
    ],
    "hacks": [
      "Try low parallel bars first to reduce wrist strain.",
      "Hands closer together can make balance more stable.",
      "Place a cushion in front of you for your first attempts."
    ],
    "wrong": "Hands facing forward, elbows away from the abdomen, too little forward lean and feet staying grounded.",
    "right": "Hands turned 90° or 180°, elbows on the lower abdomen; lean the whole body forward until the feet lift."
  },
  {
    "slug": "frog-stand",
    "name": "Frog Stand",
    "nameEn": "Frog stand",
    "level": "Beginner+",
    "tagline": "Your hand-balancing journey starts here.",
    "prerequisites": [
      "10-second elbow lever",
      "15 push-ups"
    ],
    "technique": [
      "Place hands shoulder-width apart with fingers spread.",
      "Rest knees on the outside of your elbows.",
      "Lean forward until your feet leave the floor.",
      "Balance with your fingers: press fingertips down if you tip forward."
    ],
    "steps": [
      {
        "title": "Squat with hands down",
        "detail": "Knees on elbows, feet on the floor.",
        "target": "3 × 20 sec"
      },
      {
        "title": "Single-foot lift",
        "detail": "Shift your weight forward.",
        "target": "3 × 8 per leg"
      },
      {
        "title": "Frog stand",
        "detail": "Hold both feet off the floor.",
        "target": "3 × 20 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Setup",
        "cue": "Hands down, elbows bent, knees on elbows."
      },
      {
        "phase": "Lean",
        "cue": "Move shoulders ahead of wrists."
      },
      {
        "phase": "Balance",
        "cue": "Use your fingertips as brakes."
      }
    ],
    "hacks": [
      "Look forward rather than between your hands to avoid rolling over.",
      "A block under your feet makes the first attempts easier."
    ],
    "wrong": "No squat, hands outside the legs, elbows at 45° and no finger or palm pressure.",
    "right": "Squat with hands between your legs, fingers forward; press fingers to stop tipping forward and palms to stop tipping back."
  },
  {
    "slug": "crow-stand",
    "name": "Crow Stand",
    "nameEn": "Crow stand",
    "level": "Beginner+",
    "tagline": "Build on the frog stand with straighter arms and stronger support.",
    "prerequisites": [
      "20-second frog stand",
      "20 push-ups"
    ],
    "technique": [
      "Rest knees high on your triceps, close to your armpits.",
      "Keep your arms almost straight.",
      "Lift your hips and bring your feet together."
    ],
    "steps": [
      {
        "title": "Frog stand",
        "detail": "Build a stable foundation.",
        "target": "3 × 20 sec"
      },
      {
        "title": "Higher knees",
        "detail": "Move knees toward armpits and straighten your arms further.",
        "target": "3 × 10 sec"
      },
      {
        "title": "Crow stand",
        "detail": "Straight arms, hips high.",
        "target": "3 × 20 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Setup",
        "cue": "Position knees high on your arms."
      },
      {
        "phase": "Lean",
        "cue": "Shift your hips over your hands."
      },
      {
        "phase": "Hold",
        "cue": "Push the floor away and round your upper back."
      }
    ],
    "hacks": [
      "Round your back like a cat to gain more height.",
      "Place your feet on a block to practice the position."
    ],
    "wrong": "Performing a frog stand instead of a crow stand, without finger or palm pressure.",
    "right": "Start in a half squat with knees on the triceps; lean forward until the feet float and balance with palms and fingers."
  },
  {
    "slug": "handstand",
    "name": "Handstand",
    "nameEn": "Handstand",
    "level": "Intermediate",
    "tagline": "Your world upside down. Patience matters as much as strength.",
    "prerequisites": [
      "20-second crow stand",
      "30-second chest-to-wall handstand",
      "Healthy wrists"
    ],
    "technique": [
      "Place hands shoulder-width apart with fingers spread.",
      "Push shoulders up toward your ears (elevation).",
      "Keep ribs tucked and glutes engaged for a straight line.",
      "Balance with your fingertips and palms, not your legs."
    ],
    "steps": [
      {
        "title": "Back-to-wall handstand",
        "detail": "Build strength and wrist tolerance.",
        "target": "3 × 30 sec"
      },
      {
        "title": "Chest-to-wall handstand",
        "detail": "Walk your feet up the wall to learn a straight line.",
        "target": "3 × 45 sec"
      },
      {
        "title": "Wall toe pulls",
        "detail": "Lift one foot, then both, away from the wall.",
        "target": "10 attempts"
      },
      {
        "title": "Freestanding kick-up",
        "detail": "Kick up and hold in open space.",
        "target": "20 attempts / day"
      },
      {
        "title": "Freestanding handstand",
        "detail": "Balance without a wall.",
        "target": "30 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Kick-up",
        "cue": "Hands on the floor, kick with a straight leg."
      },
      {
        "phase": "Align",
        "cue": "Stack wrists, shoulders, hips and ankles."
      },
      {
        "phase": "Balance",
        "cue": "Fingers stop tipping forward; palms stop tipping back."
      },
      {
        "phase": "Exit",
        "cue": "Turn sideways into a safe cartwheel-style exit."
      }
    ],
    "hacks": [
      "Learn a sideways exit first. Fear can hold you back more than strength.",
      "Train briefly every day: 10 minutes daily beats one hour once a week.",
      "Push through your shoulders to stay upright and avoid a banana-shaped back."
    ],
    "wrong": "Bent arms, feet too far from the hands, insufficient forward lean and flat hands with no active pressure.",
    "right": "Hands and spread fingers forward, pike setup, stepping leg near the hands and kicking leg straight; push off, kick up, keep the head between the arms and balance with fingers and palms."
  },
  {
    "slug": "tuck-press",
    "name": "Tuck Press to Handstand",
    "nameEn": "Tuck press to handstand",
    "level": "Intermediate+",
    "tagline": "Rise into a handstand without jumping: strength and control.",
    "prerequisites": [
      "20-second freestanding handstand",
      "30-second crow stand",
      "10-second L-sit"
    ],
    "technique": [
      "From a crow stand or squat, shift shoulders well ahead of your hands.",
      "Lift hips over your shoulders while keeping knees tucked.",
      "Once hips are high, extend your legs upward."
    ],
    "steps": [
      {
        "title": "Compression",
        "detail": "Seated leg lifts with your torso close to your thighs.",
        "target": "3 × 12"
      },
      {
        "title": "Tuck hold",
        "detail": "Hold a tucked handstand by a wall.",
        "target": "3 × 15 sec"
      },
      {
        "title": "Negatives",
        "detail": "Lower from handstand into tuck and crow.",
        "target": "3 × 5"
      },
      {
        "title": "Tuck press",
        "detail": "Press from a squat into a tucked handstand.",
        "target": "3 × 3"
      },
      {
        "title": "Press to handstand",
        "detail": "Extend into a full handstand.",
        "target": "3 × 3"
      }
    ],
    "breakdown": [
      {
        "phase": "Setup",
        "cue": "Hands down, knees toward your chest."
      },
      {
        "phase": "Lean",
        "cue": "Move shoulders well ahead of wrists."
      },
      {
        "phase": "Rise",
        "cue": "Lift hips upward."
      },
      {
        "phase": "Extend",
        "cue": "Reach legs up and return shoulders over your hands."
      }
    ],
    "hacks": [
      "Use blocks under your hands to create more space for your hips.",
      "Negatives are your secret weapon: practice them before you can press upward."
    ],
    "wrong": "Bending arms beyond 90°, not leaning forward enough and lacking strength to lift and tuck the legs.",
    "right": "Squat with hands slightly forward; press through the palms, slowly float and tuck the legs toward the chest, balance with fingers and extend into handstand."
  },
  {
    "slug": "hspu",
    "name": "Handstand Push-up",
    "nameEn": "Handstand push-up",
    "level": "Advanced",
    "tagline": "Your full bodyweight overhead. Pure shoulder strength.",
    "prerequisites": [
      "5 chest-to-wall handstand push-ups",
      "60-second wall handstand",
      "15 dips"
    ],
    "technique": [
      "Your head and hands form a triangle on the floor.",
      "Point elbows forward, not out to the sides.",
      "Lower to a light head touch, then press up."
    ],
    "steps": [
      {
        "title": "Pike push-ups",
        "detail": "Hips high, head toward the floor.",
        "target": "3 × 12"
      },
      {
        "title": "Elevated pike push-ups",
        "detail": "Feet on a bench to load your shoulders more.",
        "target": "3 × 10"
      },
      {
        "title": "Wall negatives",
        "detail": "Lower for 5 seconds.",
        "target": "3 × 4"
      },
      {
        "title": "Wall handstand push-ups",
        "detail": "Perform full repetitions.",
        "target": "3 × 5"
      },
      {
        "title": "Freestanding HSPU",
        "detail": "Without a wall: advanced control.",
        "target": "1–3"
      }
    ],
    "breakdown": [
      {
        "phase": "Top",
        "cue": "Handstand with shoulders elevated."
      },
      {
        "phase": "Lower",
        "cue": "Move your head ahead of your hands to form a triangle."
      },
      {
        "phase": "Bottom",
        "cue": "Light touch without relaxing."
      },
      {
        "phase": "Push",
        "cue": "Bring your head back between your arms."
      }
    ],
    "hacks": [
      "Place a cushion under your head to practice with less fear.",
      "Keep elbows at about 45° toward the wall to protect your shoulders."
    ],
    "wrong": "Only lowering with elbows flared, then failing to drive the legs above the head on the return, arching the body.",
    "right": "Elbows forward, a controlled negative and an active leg drive above the head when returning to handstand."
  },
  {
    "slug": "muscle-up",
    "name": "Muscle-up",
    "nameEn": "Muscle-up",
    "level": "Intermediate+",
    "tagline": "From hanging to above the bar in one movement.",
    "prerequisites": [
      "8 explosive chest-to-bar pull-ups",
      "15 parallel-bar dips"
    ],
    "technique": [
      "Use a false grip or standard shoulder-width grip.",
      "Begin with a small hollow swing back, then pull sharply toward your abdomen.",
      "Rotate your wrists and bring your chest above the bar.",
      "Finish with a straight-bar dip to full support."
    ],
    "steps": [
      {
        "title": "Chest-to-bar pull-ups",
        "detail": "Touch the bar with your chest.",
        "target": "3 × 10"
      },
      {
        "title": "Explosive pull-ups",
        "detail": "Pull until the bar reaches your abdomen.",
        "target": "5 × 3"
      },
      {
        "title": "Straight-bar dips",
        "detail": "Learn the top phase.",
        "target": "3 × 10"
      },
      {
        "title": "Negative muscle-ups",
        "detail": "Lower slowly through the transition.",
        "target": "3 × 3"
      },
      {
        "title": "Band-assisted muscle-ups",
        "detail": "Use a band to assist the transition.",
        "target": "3 × 3"
      },
      {
        "title": "Full muscle-up",
        "detail": "Clean repetitions without kicking.",
        "target": "3 × 1–3"
      }
    ],
    "breakdown": [
      {
        "phase": "Swing",
        "cue": "Small hollow movement back, no large swing."
      },
      {
        "phase": "Pull",
        "cue": "Bring the bar toward your abdomen, not your chin."
      },
      {
        "phase": "Transition",
        "cue": "Rotate wrists and bring your chest over the bar."
      },
      {
        "phase": "Dip",
        "cue": "Press to full arm extension."
      }
    ],
    "hacks": [
      "Pull the bar toward your thighs as if throwing it beneath you.",
      "Use a low bar to learn the transition with feet on the floor.",
      "If you cannot get above the bar, return to explosive pull-ups.",
      "Aim to get your chest above the bar, not just your chin."
    ],
    "wrong": "Pulling like a normal pull-up, poor false grip, no leg kip and a swing timed too early or late.",
    "right": "Pull explosively as you return from the forward position, lift knees high toward the chest and bring the chest over the bar."
  },
  {
    "slug": "back-lever",
    "name": "Back Lever",
    "nameEn": "Back lever",
    "level": "Intermediate+",
    "tagline": "A horizontal body beneath the bar, facing the ground.",
    "prerequisites": [
      "10 pull-ups",
      "20-second pain-free German hang",
      "15 dips"
    ],
    "technique": [
      "Keep arms straight and shoulder blades engaged.",
      "Maintain a straight body line with chest facing the ground.",
      "Engage glutes and keep legs together."
    ],
    "steps": [
      {
        "title": "German hang",
        "detail": "Prepare shoulder mobility.",
        "target": "3 × 20 sec"
      },
      {
        "title": "Tuck back lever",
        "detail": "Bring knees toward your chest.",
        "target": "3 × 15 sec"
      },
      {
        "title": "Advanced tuck",
        "detail": "Straight back, knees at 90°.",
        "target": "3 × 12 sec"
      },
      {
        "title": "Straddle back lever",
        "detail": "Extend legs apart.",
        "target": "3 × 10 sec"
      },
      {
        "title": "Full back lever",
        "detail": "Keep legs together.",
        "target": "3 × 10 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Skin the cat",
        "cue": "Rotate backward through the bar."
      },
      {
        "phase": "Lower",
        "cue": "Lower slowly to horizontal."
      },
      {
        "phase": "Hold",
        "cue": "Press the bar down with straight arms."
      }
    ],
    "hacks": [
      "Never jump directly into the position; prepare your shoulders with a German hang.",
      "Breathe in and brace, then breathe lightly during the hold."
    ],
    "wrong": "Retracted shoulder blades, a wide grip and anterior pelvic tilt.",
    "right": "Protracted shoulder blades, a narrow grip, a slow negative into the hold and posterior pelvic tilt."
  },
  {
    "slug": "front-lever",
    "name": "Front Lever",
    "nameEn": "Front lever",
    "level": "Advanced",
    "tagline": "The peak of pulling strength. Face toward the sky.",
    "prerequisites": [
      "15 pull-ups",
      "10-second back lever",
      "45-second hollow-body hold",
      "5 skin-the-cat repetitions"
    ],
    "technique": [
      "Keep arms straight and shoulder blades down and back.",
      "Press the bar toward your thighs with straight arms.",
      "Hold the body horizontal, face up and hips in line."
    ],
    "steps": [
      {
        "title": "Tuck front lever",
        "detail": "Knees toward your chest, back horizontal.",
        "target": "3 × 15 sec"
      },
      {
        "title": "Advanced tuck",
        "detail": "Maintain a straight back.",
        "target": "3 × 12 sec"
      },
      {
        "title": "One-leg front lever",
        "detail": "Extend one leg.",
        "target": "3 × 10 sec"
      },
      {
        "title": "Straddle front lever",
        "detail": "Extend legs apart.",
        "target": "3 × 8 sec"
      },
      {
        "title": "Full front lever",
        "detail": "Keep legs together.",
        "target": "3 × 5–10 sec"
      }
    ],
    "breakdown": [
      {
        "phase": "Hang",
        "cue": "Active shoulder blades, hollow body."
      },
      {
        "phase": "Raise",
        "cue": "Press the bar toward your thighs."
      },
      {
        "phase": "Hold",
        "cue": "Keep hips high and look upward."
      },
      {
        "phase": "Exit",
        "cue": "Lower under control without letting go."
      }
    ],
    "hacks": [
      "Lower from an inverted hang to horizontal for effective negative practice.",
      "A band under your hips helps you feel the full position.",
      "Your back does most of the work: train front-lever rows."
    ],
    "wrong": "Bent arms, low hips, protracted shoulder blades and anterior pelvic tilt.",
    "right": "Locked straight arms, neutral hips and extended feet."
  }
];

export function getSkill(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}
