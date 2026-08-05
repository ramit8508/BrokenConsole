export interface Event {
  id: string;
  title: string;
  date: string;
  mode: string;
  tag: "beginner" | "intermediate" | "open" | "esports";
  reward: string;
  desc: string;
  seatsTotal: number;
  seatsTaken: number;
  formUrl: string;
}

export interface PastEvent {
  title: string;
  date: string;
  result: string;
}

// ─── Upcoming Events ──────────────────────────────────────────────────────
// Update seatsTaken by counting Sheet rows per event, then redeploy.
// Update formUrl per Section 6.2 of the build spec (pre-filled Google Form URL).
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
  },
  {
    id: "ev3",
    title: "Valorant Open — Season 3",
    date: "Sep 6, 2026",
    mode: "Online · Team of 5",
    tag: "esports",
    reward: "₹15,000 · Ranked Seeds",
    desc: "Inter-college Valorant tournament. Double-elimination bracket, seeded by last season's standings.",
    seatsTotal: 32,
    seatsTaken: 30,
    formUrl: "https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.111=Valorant+Open+S3",
  },
];

// ─── Past Events ──────────────────────────────────────────────────────────
export const pastEvents: PastEvent[] = [
  { title: "PixelJam 2025", date: "Sep 2025", result: "Won by Team Nullptr · 18 teams competed" },
  { title: "Unity Bootcamp", date: "Mar 2025", result: "38 attendees · 92% completion rate" },
  { title: "Valorant Open S2", date: "Feb 2025", result: "Won by Apex Protocol · 24 teams" },
  { title: "Dev Talk: Indie Publishing", date: "Jan 2025", result: "Speaker: Aryan Shah, ex-Ubisoft" },
  { title: "Game Design Workshop", date: "Nov 2024", result: "12 submitted game concepts, 3 green-lit" },
  { title: "Hackathon — Internal", date: "Oct 2024", result: "Won by ByteForge · 48h build sprint" },
];
