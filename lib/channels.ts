export const CHANNELS = ["Flutter", "NestJS", "Teaching", "Tools"] as const;
export type Channel = (typeof CHANNELS)[number];
