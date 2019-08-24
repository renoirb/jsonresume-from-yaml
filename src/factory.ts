import { Basics, Resume } from "./schema";

export const factory = (opts: Partial<Basics> = {}): Resume => {
  const out: Resume = new Resume(opts);
  return out;
};
