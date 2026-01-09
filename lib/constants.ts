export const MEDIA_BASE_URL = "https://birthday-media-proxy.tyagisaksham576.workers.dev/media?id=";

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

export const ALL_MEDIA = [
  ...MEDIA_CONFIG.videos.map(id => ({ id, type: 'video' as const })),
  ...MEDIA_CONFIG.photos.map(id => ({ id, type: 'photo' as const }))
];

export const TARGET_DATE = new Date("2026-01-11T00:00:00");

export const MOON_DATA = [
  { year: "2005", src: "https://github.com/navneetty-netizen/moon/blob/main/moon-2005.png?raw=true" },
  { year: "2015", src: "https://github.com/navneetty-netizen/moon/blob/main/moon-2015.jpg?raw=true" },
  { year: "2021", src: "https://github.com/navneetty-netizen/moon/blob/main/moon%202021.jpg?raw=true" },
  { year: "2024", src: "https://github.com/navneetty-netizen/moon/blob/main/moon-2024.jpg?raw=true" },
  { year: "2025", src: "https://github.com/navneetty-netizen/moon/blob/main/moon-2025.jpg?raw=true" },
];
