/**
 * Read and walk all YAML files in a directory
 */

// @ts-ignore
import { schema } from "resume-schema";

// z-schema should be at the same version as jsonResumeSchema
import SchemaValidator from "z-schema";

import YAML from "yaml";

import { Resume } from ".";

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

export class Walker {
  private readonly sections: string[] = [];

  constructor(private readonly schemaString: string = "") {
    const applicableSchemaString = schemaString === "" ? schema : schemaString;
    this.schemaString = applicableSchemaString;
    const schemaHashMap = JSON.parse(applicableSchemaString);
    if ("properties" in schemaHashMap) {
      for (const [propName] of Object.entries(schemaHashMap)) {
        this.sections.push(propName);
      }
    } else {
      const message = "Invalid schema provided";
      throw new Error(message);
    }
  }

  /**
   * Validate an hydrated resume object against schema validator
   * https://github.com/zaggino/z-schema/blob/master/index.d.ts#L89
   * @param {Partial<Resume>} resume
   */
  public validate(resume: Partial<Resume>): boolean {
    const schemaString = this.schemaString;
    return new SchemaValidator().validate(resume, schemaString);
  }

  // tslint:disable-next-line:no-any
  public parseSection(name: string, contents: string): any {
    if (name in this.sections) {
      const hydrated = YAML.parse(contents);
      return hydrated;
    } else {
      const message = "Invalid section provided";
      throw new Error(message);
    }
  }
}
