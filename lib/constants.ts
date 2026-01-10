// ===============================
// MEDIA BASE URLS
// ===============================

// Photos (opaque IDs → Cloudflare Worker)
export const PHOTO_BASE_URL =
  "https://birthday-media-proxy.tyagisaksham576.workers.dev/media?id=";

// Videos (direct streaming → Cloudflare Pages)
export const VIDEO_BASE_URL =
  "https://birthday-videos.pages.dev/";

// ===============================
// MEDIA CONFIG (IDS ONLY)
// ===============================

export const MEDIA_CONFIG = {
  photos: [
    "nPT7h", "OA3M1", "Sr5rZ", "1-XoX", "d76NA", "n_JoR", "j_oFK", "sVJST",
    "0_lCi", "BcaUk", "0hyT0", "BAH91", "C09ul", "sFWO5", "orYRR", "Upsj-",
    "5CCu5", "FZL1L", "Q6ZPf", "tCmmR", "3ZDTs", "fNqF-", "jSdkv", "JbSpG",
    "TF406", "Ug_0U", "FyxfT", "X6ngS", "hSsRV", "JZfA0", "p1KFE", "8iV1n",
    "HZKXM", "xAY-D", "cOV31", "kuAqb", "W5gay"
  ],
  videos: [
    "FnY03", "i3zgH", "z7ixn", "k8STW", "c74Qn", "j-1E4", "p7gsq"
  ]
};

// ===============================
// VIDEO ID → FILE MAP (CRITICAL)
// ===============================

export const VIDEO_MAP: Record<string, string> = {
  "FnY03": "20ab3e9c-3abe-4db6-8376-38813c52805b.mp4",
  "i3zgH": "2d15b425-8682-4e45-92eb-76719a75a072.mp4",
  "z7ixn": "5834fa6e-181d-4f91-b4b2-7d201bb4a070.mp4",
  "k8STW": "79f045eb73dd4fd0ad11d61cd0639d85.mp4",
  "c74Qn": "D95D6E71-EE66-4B47-8E94-F8DB677BCB13.mp4",
  "j-1E4": "a1dc2a34-6ef1-454c-bc1b-1939fc5ea908.mp4",
  "p7gsq": "aa72db2e140e45ffbabd0c4610d40b30.mp4"
};

// ===============================
// FLATTENED MEDIA LIST
// ===============================

export const ALL_MEDIA = [
  ...MEDIA_CONFIG.videos.map(id => ({
    id,
    type: "video" as const,
    src: `${VIDEO_BASE_URL}${VIDEO_MAP[id]}`
  })),
  ...MEDIA_CONFIG.photos.map(id => ({
    id,
    type: "photo" as const,
    src: `${PHOTO_BASE_URL}${id}`
  }))
];

// ===============================
// DATE CONFIG
// ===============================

export const TARGET_DATE = new Date("2026-01-11T00:00:00");

// ===============================
// MOON DATA (UNCHANGED)
// ===============================

export const MOON_DATA = [
  { year: "2005", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2005.png?raw=true" },
  { year: "2015", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2015.png?raw=true" },
  { year: "2021", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2021.png?raw=true" },
  { year: "2024", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2024.png?raw=true" },
  { year: "2025", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2025.png?raw=true" },
  { year: "2026", src: "https://github.com/navneetty-netizen/moon1/blob/main/moon-2026.png?raw=true" }
];
