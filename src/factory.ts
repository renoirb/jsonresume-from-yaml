import * as schema from "./schema";

export const factory = (opts: Partial<schema.Basics> = {}): schema.Resume => {
  /**
   * https://egghead.io/lessons/typescript-transform-existing-types-using-mapped-types-in-typescript
   */
  return new schema.Resume(opts);
};
