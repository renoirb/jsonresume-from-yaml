/**
 * Read and walk all YAML files in a directory
 *
 * https://github.com/jprichardson/node-fs-extra
 */

import { readFileSync } from "fs";
import { AsyncLoader, default as JoyCon } from "joycon";

import YAML from "yaml";
import { Resume, ResumeInterface } from "./schema";

export const files: string[] = [
  "basics.yaml",
  "work.yaml",
  "volunteer.yaml",
  "education.yaml",
  "awards.yaml",
  "publications.yaml",
  "skills.yaml",
  "languages.yaml",
  "interests.yaml",
  "references.yaml"
];

const addLoader: AsyncLoader = {
  test: /\.ya?ml$/,
  // tslint:disable-next-line:no-any
  load(filepath: string): Promise<any> {
    const contents = readFileSync(filepath, "utf8");
    const parsed = YAML.parse(contents);
    // tslint:disable-next-line:no-console
    // console.log("loader", { contents, filepath, parsed });
    return parsed;
  }
};

export const walk = async (path?: string): Promise<ResumeInterface> => {
  const cwd: string = typeof path === "string" ? path : __dirname;

  const loader = new JoyCon();
  loader.addLoader(addLoader);

  const { data } = await loader.load({
    cwd,
    files: ["basics.yaml"]
  });

  const resume = new Resume(data);

  return resume;
};

export default walk;
