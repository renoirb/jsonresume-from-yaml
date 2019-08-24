import {
  Award,
  Basics,
  Education,
  Interest,
  Language,
  Publication,
  Reference,
  ResumeInterface,
  Skill,
  Volunteer,
  Work,
} from './schema';

export interface SectionMap {
  awards: Award;
  basics: Basics;
  education: Education;
  interests: Interest;
  languages: Language;
  publications: Publication;
  references: Reference;
  skills: Skill;
  volunteer: Volunteer;
  work: Work;
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
      label: 'Programmer',
      name: 'John Doe',
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
