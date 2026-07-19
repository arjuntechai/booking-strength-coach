export type Focus = "Strength" | "Conditioning" | "Mobility";
export type Location = "Studio" | "Outdoor";
export type Availability = "open" | "limited" | "full";

export type Slot = {
  id: string;
  day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";
  time: string;
  name: string;
  focus: Focus;
  location: Location;
  duration: string;
  availability: Availability;
};

export const DAYS: Slot["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const SCHEDULE: Slot[] = [
  { id: "mon-07", day: "Mon", time: "07:00", name: "Barbell Base",       focus: "Strength",     location: "Studio",  duration: "60 min", availability: "open" },
  { id: "mon-12", day: "Mon", time: "12:30", name: "Midday Conditioning", focus: "Conditioning", location: "Studio",  duration: "45 min", availability: "limited" },
  { id: "mon-18", day: "Mon", time: "18:30", name: "Park Circuit",       focus: "Conditioning", location: "Outdoor", duration: "50 min", availability: "open" },

  { id: "tue-07", day: "Tue", time: "07:00", name: "Mobility Reset",     focus: "Mobility",     location: "Studio",  duration: "45 min", availability: "open" },
  { id: "tue-18", day: "Tue", time: "18:00", name: "Strength Block",     focus: "Strength",     location: "Studio",  duration: "60 min", availability: "full" },
  { id: "tue-19", day: "Tue", time: "19:30", name: "Beach Intervals",    focus: "Conditioning", location: "Outdoor", duration: "45 min", availability: "limited" },

  { id: "wed-07", day: "Wed", time: "07:00", name: "Barbell Base",       focus: "Strength",     location: "Studio",  duration: "60 min", availability: "limited" },
  { id: "wed-13", day: "Wed", time: "13:00", name: "Lunch Lift",         focus: "Strength",     location: "Studio",  duration: "45 min", availability: "open" },
  { id: "wed-18", day: "Wed", time: "18:30", name: "Urban Stairs",       focus: "Conditioning", location: "Outdoor", duration: "50 min", availability: "open" },

  { id: "thu-07", day: "Thu", time: "07:00", name: "Mobility Reset",     focus: "Mobility",     location: "Studio",  duration: "45 min", availability: "open" },
  { id: "thu-12", day: "Thu", time: "12:30", name: "Midday Conditioning", focus: "Conditioning", location: "Studio",  duration: "45 min", availability: "open" },
  { id: "thu-19", day: "Thu", time: "19:00", name: "Strength Block",     focus: "Strength",     location: "Studio",  duration: "60 min", availability: "limited" },

  { id: "fri-07", day: "Fri", time: "07:00", name: "Barbell Base",       focus: "Strength",     location: "Studio",  duration: "60 min", availability: "open" },
  { id: "fri-18", day: "Fri", time: "18:00", name: "Park Circuit",       focus: "Conditioning", location: "Outdoor", duration: "50 min", availability: "open" },

  { id: "sat-09", day: "Sat", time: "09:00", name: "Beach Session",      focus: "Conditioning", location: "Outdoor", duration: "60 min", availability: "limited" },
  { id: "sat-10", day: "Sat", time: "10:30", name: "Strength Block",     focus: "Strength",     location: "Studio",  duration: "60 min", availability: "open" },
  { id: "sat-12", day: "Sat", time: "12:00", name: "Mobility Reset",     focus: "Mobility",     location: "Studio",  duration: "45 min", availability: "open" },
];
