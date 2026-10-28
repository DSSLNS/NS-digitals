import { Fraunces, Manrope } from "next/font/google";

/** Brand typefaces used by the concept-project mockups and the Oakhaven style tile. Not preloaded site-wide. */
export const mockSerif = Fraunces({ subsets: ["latin"], variable: "--mock-serif", display: "swap", preload: false });
export const mockSans = Manrope({ subsets: ["latin"], variable: "--mock-sans", display: "swap", preload: false });
