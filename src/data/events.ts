export interface Event {
  id: string;
  title: string;
  date: string;
  mode: string;
  tag: "beginner" | "intermediate" | "open";
  reward: string;
  desc: string;
  seatsTotal: number;
  seatsTaken: number;
  formUrl: string;
  image: string;  // path to event banner image
}

export interface PastEvent {
  title: string;
  date: string;
  result: string;
  image: string;  // path to past event image
}

// ─── Upcoming Events ──────────────────────────────────────────────────────
export const upcomingEvents: Event[] = [
  {
    id: "ev1",
    title: "PixelJam 2026",
    date: "Sep 12–14, 2026",
    mode: "On-Campus · Team",
    tag: "intermediate",
    reward: "₹40,000 Prize Pool",
    desc: "48-hour game jam. Build a playable game from a surprise theme, ship it, pitch it.",
    seatsTotal: 60,
    seatsTaken: 42,
    formUrl: "https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.111=PixelJam+2026",
    image: "/events/pixeljam-2026.png",
  },
  {
    id: "ev2",
    title: "Unity Bootcamp",
    date: "Aug 22, 2026",
    mode: "On-Campus · Solo",
    tag: "beginner",
    reward: "Certificate of Completion",
    desc: "Hands-on two-day workshop covering Unity fundamentals, 2D physics, and basic scene scripting.",
    seatsTotal: 40,
    seatsTaken: 27,
    formUrl: "https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.111=Unity+Bootcamp",
    image: "/events/unity-bootcamp.png",
  },
];

// ─── Past Events ──────────────────────────────────────────────────────────
export const pastEvents: PastEvent[] = [
  {
    title: "PixelJam 2025",
    date: "Sep 2025",
    result: "Won by Team Nullptr · 18 teams competed",
    image: "/events/pixeljam-2025.png",
  },
  {
    title: "Unity Bootcamp",
    date: "Mar 2025",
    result: "38 attendees · 92% completion rate",
    image: "/events/unity-bootcamp.png",
  },
  {
    title: "Dev Talk: Indie Publishing",
    date: "Jan 2025",
    result: "Speaker: Aryan Shah, ex-Ubisoft",
    image: "/events/pixeljam-2025.png",
  },
  {
    title: "Game Design Workshop",
    date: "Nov 2024",
    result: "12 submitted game concepts, 3 green-lit",
    image: "/events/unity-bootcamp.png",
  },
  {
    title: "Hackathon — Internal",
    date: "Oct 2024",
    result: "Won by ByteForge · 48h build sprint",
    image: "/events/pixeljam-2025.png",
  },
];
