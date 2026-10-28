/** Card surface colours shared by service, industry and article cards. */
export const toneSurface = {
  white: "bg-white",
  lavender: "bg-lavender",
  mint: "bg-mint",
  coral: "bg-coral-soft",
  sun: "bg-[#fff0c2]",
  plum: "bg-plum",
} as const;

export type Tone = keyof typeof toneSurface;
