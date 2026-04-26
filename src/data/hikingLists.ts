export interface Peak {
  name: string;
  elevation: number; // feet
  coords: [number, number]; // [lng, lat] — Mapbox format
}

export interface HikingList {
  id: string;
  name: string;
  description: string;
  totalPeaks: number; // full list size (may exceed peaks below until all are added)
  peaks: Peak[];
}

// Starter set — expand as GPX files are imported
export const NH_52_WAV: Peak[] = [
  { name: "Mt. Monadnock",         elevation: 3165, coords: [-72.1081, 42.8603] },
  { name: "Mt. Chocorua",          elevation: 3480, coords: [-71.2689, 43.9542] },
  { name: "Welch & Dickey",        elevation: 2734, coords: [-71.6339, 43.9203] },
  { name: "Kearsarge North",       elevation: 3268, coords: [-71.0819, 44.0658] },
  { name: "Mt. Cardigan",          elevation: 3155, coords: [-71.8897, 43.6483] },
  { name: "Mt. Willard",           elevation: 2865, coords: [-71.4133, 44.2025] },
  { name: "Mt. Avalon",            elevation: 3440, coords: [-71.4136, 44.2178] },
  { name: "North Baldface",        elevation: 3597, coords: [-71.0200, 44.2836] },
  { name: "South Baldface",        elevation: 3576, coords: [-71.0225, 44.2681] },
  { name: "Mt. Pemigewasset",      elevation: 2557, coords: [-71.6875, 44.1142] },
];

export const HIKING_LISTS: HikingList[] = [
  {
    id: "52wav",
    name: "52 With a View",
    description: "52 NH peaks under 4,000 ft with exceptional views",
    totalPeaks: 52,
    peaks: NH_52_WAV,
  },
];
