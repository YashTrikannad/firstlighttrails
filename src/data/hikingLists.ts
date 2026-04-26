export interface Peak {
  name: string;
  elevation: number; // feet
  coords: [number, number]; // [lng, lat] — Mapbox format
}

export interface HikingList {
  id: string;
  name: string;
  description: string;
  totalPeaks: number;
  peaks: Peak[];
}

// Coordinates sourced from trailspotting.com 52WAV map pack KML
export const NH_52_WAV: Peak[] = [
  { name: "Sandwich Mt",       elevation: 3992, coords: [-71.498131,  43.900070] },
  { name: "Mt. Webster",       elevation: 3910, coords: [-71.388398,  44.194878] },
  { name: "The Horn",          elevation: 3900, coords: [-71.400120,  44.517955] },
  { name: "Shelburne Moriah",  elevation: 3743, coords: [-71.098342,  44.353239] },
  { name: "Sugarloaf Mt",      elevation: 3702, coords: [-71.467890,  44.744170] },
  { name: "Imp Face",          elevation: 3615, coords: [-71.188150,  44.321627] },
  { name: "North Baldface",    elevation: 3597, coords: [-71.086988,  44.242999] },
  { name: "Mt. Success",       elevation: 3592, coords: [-71.039180,  44.471520] },
  { name: "South Baldface",    elevation: 3576, coords: [-71.077810,  44.230870] },
  { name: "Jennings Peak",     elevation: 3493, coords: [-71.510600,  43.911050] },
  { name: "Mt. Chocorua",      elevation: 3490, coords: [-71.273300,  43.954350] },
  { name: "Stairs Mt",         elevation: 3469, coords: [-71.318364,  44.154868] },
  { name: "Mt. Avalon",        elevation: 3440, coords: [-71.426774,  44.206441] },
  { name: "Percy, North Peak", elevation: 3415, coords: [-71.435130,  44.663080] },
  { name: "Mt. Resolution",    elevation: 3400, coords: [-71.315861,  44.145985] },
  { name: "Magalloway Mt",     elevation: 3385, coords: [-71.162516,  45.062834] },
  { name: "Mt. Tremont",       elevation: 3384, coords: [-71.356960,  44.053340] },
  { name: "Middle Sister",     elevation: 3338, coords: [-71.270120,  43.964730] },
  { name: "Kearsarge North",   elevation: 3269, coords: [-71.094120,  44.105810] },
  { name: "Owlshead",          elevation: 3268, coords: [-71.492350,  44.338640] },
  { name: "Smarts Mt",         elevation: 3238, coords: [-72.038060,  43.825510] },
  { name: "North Moat Mt",     elevation: 3202, coords: [-71.214610,  44.043140] },
  { name: "Mt. Monadnock",     elevation: 3170, coords: [-72.108070,  42.861410] },
  { name: "Mt. Cardigan",      elevation: 3149, coords: [-71.914180,  43.649550] },
  { name: "Mt. Crawford",      elevation: 3128, coords: [-71.332420,  44.136707] },
  { name: "Mt. Paugus",        elevation: 3080, coords: [-71.328049,  43.946300] },
  { name: "North Doublehead",  elevation: 3051, coords: [-71.130050,  44.167830] },
  { name: "Eagle Crag",        elevation: 3020, coords: [-71.071577,  44.253624] },
  { name: "Mt. Parker",        elevation: 3013, coords: [-71.298510,  44.123530] },
  { name: "Mt. Shaw",          elevation: 2990, coords: [-71.274244,  43.744191] },
  { name: "Rogers Ledge",      elevation: 2952, coords: [-71.361740,  44.550040] },
  { name: "Eastman Mt",        elevation: 2938, coords: [-71.061870,  44.215700] },
  { name: "Mt. Kearsarge",     elevation: 2934, coords: [-71.857000,  43.383230] },
  { name: "Mt. Cube",          elevation: 2915, coords: [-72.022840,  43.885860] },
  { name: "Stinson Mt",        elevation: 2890, coords: [-71.779093,  43.834876] },
  { name: "Mt. Willard",       elevation: 2850, coords: [-71.413280,  44.203940] },
  { name: "Black Mt",          elevation: 2829, coords: [-71.922352,  44.074548] },
  { name: "South Moat Mt",     elevation: 2760, coords: [-71.193578,  44.017516] },
  { name: "Iron Mt",           elevation: 2723, coords: [-71.239239,  44.134791] },
  { name: "Dickey Mt",         elevation: 2722, coords: [-71.578590,  43.922980] },
  { name: "Potash Mt",         elevation: 2691, coords: [-71.390800,  43.981990] },
  { name: "Table Mt",          elevation: 2669, coords: [-71.262580,  44.031830] },
  { name: "Mt. Israel",        elevation: 2636, coords: [-71.471850,  43.845600] },
  { name: "Welch Mt",          elevation: 2605, coords: [-71.575954,  43.919050] },
  { name: "Mt. Roberts",       elevation: 2582, coords: [-71.325960,  43.756300] },
  { name: "Mt. Hayes",         elevation: 2573, coords: [-71.159387,  44.415707] },
  { name: "Mt. Pemigewasset",  elevation: 2552, coords: [-71.699030,  44.097820] },
  { name: "Hedgehog Mt",       elevation: 2542, coords: [-71.367170,  43.973620] },
  { name: "Middle Sugarloaf",  elevation: 2537, coords: [-71.517339,  44.251614] },
  { name: "Bald Peak",         elevation: 2465, coords: [-71.751752,  44.147842] },
  { name: "Pine Mt",           elevation: 2404, coords: [-71.214720,  44.366260] },
  { name: "Mt. Percival",      elevation: 2212, coords: [-71.557417,  43.809595] },
  { name: "Mt. Morgan",        elevation: 2200, coords: [-71.566283,  43.803825] },
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
