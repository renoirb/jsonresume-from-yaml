/* tslint:disable:object-literal-sort-keys */

/**
 * JSON Resume Schema TypeScript Typings.
 *
 * https://jsonresume.org/schema/
 */

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
  projects?: Project[];
}

export interface Basics {
  name: string;
  /**
   * e.g. Web Developer
   */
  label?: string;
  /**
   * URL (as per RFC 3986) to a image in JPEG or PNG format
   */
  image?: string;
  /**
   * e.g. thomas@gmail.com
   */
  email?: string;
  /**
   * Phone numbers are stored as strings so use any format you like, e.g. 712-117-2923
   */
  phone?: string;
  /**
   * URL (as per RFC 3986) to your website, e.g. personal homepage
   */
  url?: string;
  /**
   * Write a short 2-3 sentence biography about yourself
   */
  summary?: string;
  location?: Location;
  profiles?: Profile[];
}

export interface Location {
  /**
   * To add multiple address lines, use
   * . For example, 1234 Glücklichkeit Straße
   * Hinterhaus 5. Etage li.
   */
  address?: string;
  postalCode?: string;
  city?: string;
  /**
   * code as per ISO-3166-1 ALPHA-2, e.g. US, AU, IN
   */
  countryCode?: string;
  /**
   * The general region where you live. Can be a US state, or a province, for instance.
   */
  region?: string;
}

export interface Profile {
  /**
   * e.g. Facebook or Twitter
   */
  network: string;
  /**
   * e.g. neutralthoughts
   */
  username: string;
  /**
   * e.g. http://twitter.example.com/neutralthoughts
   */
  url: string;
  [k: string]: string;
}

export interface Volunteer {
  /**
   * e.g. Facebook
   */
  organization: string;
  /**
   * e.g. Software Engineer
   */
  position: string;
  /**
   * e.g. http://facebook.example.com
   */
  url?: string;
  /**
   * resume.json uses the ISO 8601 date standard e.g. 2014-06-29
   */
  startDate?: string;
  /**
   * e.g. 2012-06-29
   */
  endDate?: string;
  /**
   * Give an overview of your responsibilities at the company
   */
  summary?: string;
  /**
   * Specify accomplishments and achievements
   */
  highlights?: string[];
}

export interface Work {
  /**
   * e.g. Facebook
   */
  name: string;
  /**
   * e.g. Menlo Park, CA
   */
  location: string;
  /**
   * e.g. Social Media Company
   */
  description: string;
  company: string;
  /**
   * e.g. Software Engineer
   */
  position: string;
  /**
   * e.g. http://facebook.example.com
   */
  url: string;
  /**
   * resume.json uses the ISO 8601 date standard e.g. 2014-06-29
   */
  startDate?: string;
  /**
   * e.g. 2012-06-29
   */
  endDate?: string;
  /**
   * Give an overview of your responsibilities at the company
   */
  summary?: string;
  /**
   * Specify multiple accomplishments
   */
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
  /**
   * e.g. One of the 100 greatest minds of the century
   */
  title: string;
  /**
   * e.g. 1989-06-12
   */
  date?: string;
  /**
   * e.g. Time Magazine
   */
  awarder?: string;
  /**
   * e.g. Received for my work with Quantum Physics
   */
  summary?: string;
}

export interface Publication {
  /**
   * e.g. The World Wide Web
   */
  name: string;
  /**
   * e.g. IEEE, Computer Magazine
   */
  publisher?: string;
  /**
   * e.g. 1990-08-01
   */
  releaseDate?: string;
  /**
   * e.g. http://www.computer.org.example.com/csdl/mags/co/1996/10/rx069-abs.html
   */
  url?: string;
  /**
   * Short summary of publication. e.g. Discussion of the World Wide Web, HTTP, HTML.
   */
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
  /**
   * e.g. English, Spanish
   */
  language: string;
  /**
   * e.g. Fluent, Beginner
   */
  fluency?: string;
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

export interface Project {
  /**
   * e.g. The World Wide Web
   */
  name: string;
  /**
   * Short summary of project. e.g. Collated works of 2017.
   */
  description: string;
  /**
   * Specify multiple features
   */
  highlights?: string[];
  /**
   * Specify special elements involved
   */
  keywords?: string[];
  /**
   * resume.json uses the ISO 8601 date standard e.g. 2014-06-29
   */
  startDate?: string;
  /**
   * e.g. 2012-06-29
   */
  endDate?: string;
  /**
   * e.g. http://www.computer.org/csdl/mags/co/1996/10/rx069-abs.html
   */
  url?: string;
  /**
   * Specify your role on this project or in company
   */
  roles?: string[];
  /**
   * Specify the relevant company/entity affiliations e.g. 'greenpeace', 'corporationXYZ'
   */
  entity?: string;
  /**
   *  e.g. 'volunteering', 'presentation', 'talk', 'application', 'conference'
   */
  type?: string;
}

export interface Reference {
  name: string;
  reference: string;
}
