/* tslint:disable:object-literal-sort-keys */

/**
 * JSON Resume Schema TypeScript Typings.
 *
 * https://jsonresume.org/schema/
 */

export type InterfaceKeys<T, Condition> = Pick<
  T,
  {
    [k in keyof T]: T[k] extends Condition ? k : never;
  }[keyof T]
>;

export type ResumeInterfaceKeys = InterfaceKeys<ResumeInterface, string>;

export interface ResumeInterface {
  basics: Basics;
  work?: Work[];
  volunteer?: Volunteer[];
  education?: Education[];
  awards?: Award[];
  publications?: Publication[];
  skills?: Skill[];
  languages?: Language[];
  interests?: Interest[];
  references?: Reference[];
}

export type BasicsInterfaceKeys = InterfaceKeys<Basics, string>;

export interface Basics {
  name: string;
  label: string;
  picture?: string;
  email?: string;
  phone?: string;
  website?: string;
  summary: string;
  location?: Location;
  profiles?: Profile[];
}

export interface Location {
  address?: string;
  postalCode?: string;
  city: string;
  countryCode?: string;
  region?: string;
}

export interface Profile {
  network: string;
  username: string;
  url?: string;
}

export interface Volunteer {
  organization: string;
  position?: string;
  website?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Work {
  company: string;
  position?: string;
  website?: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

export interface Education {
  institution: string;
  area?: string;
  studyType: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  courses?: string[];
}

export interface Award {
  title: string;
  date: string;
  awarder?: string;
  summary?: string;
}

export interface Publication {
  name: string;
  publisher?: string;
  releaseDate?: string;
  website?: string;
  summary?: string;
}

export interface Skill {
  /**
   * e.g. "Web Development"
   */
  name: string;
  /**
   * e.g. "Master"
   */
  level?: string;
  /**
   * e.g. ["HTML", "CSS"]
   */
  keywords?: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Interest {
  /**
   * e.g. "Wildlife"
   */
  name: string;
  /**
   * e.g. ["Ferrets"]
   */
  keywords: string[];
}

export interface Reference {
  name: string;
  reference: string;
}

export class Resume implements ResumeInterface {
  public basics!: Basics;
  public work: Work[] = [];
  public volunteer: Volunteer[] = [];
  public education: Education[] = [];
  public awards: Award[] = [];
  public publications: Publication[] = [];
  public skills: Skill[] = [];
  public languages: Language[] = [];
  public interests: Interest[] = [];
  public references: Reference[] = [];

  constructor(args: Partial<Basics> = {}) {
    const basicsFallback: Basics = {
      name: 'John Doe',
      label: 'Programmer',
      summary: 'A summary of John Doe...',
    };
    const basics: Basics = {
      ...basicsFallback,
      ...args,
    };
    this.basics = basics;
  }

  public addPublication(name: string): void {
    const item: Publication = { name };
    this.publications.push(item);
  }

  public addSkill(
    name: string,
    level: string = 'Master',
    keywords: string[] = [],
  ): void {
    const item: Skill = { name, level, keywords: [...keywords] };
    this.skills.push(item);
  }

  public addLanguage(
    language: string,
    fluency: string = 'Native speaker',
  ): void {
    const item: Language = { language, fluency };
    this.languages.push(item);
  }

  public addInterest(name: string, keywords: string[] = []): void {
    const item: Interest = { name, keywords: [...keywords] };
    this.interests.push(item);
  }

  public addReference(name: string, reference: string): void {
    const item: Reference = { name, reference };
    this.references.push(item);
  }
}
