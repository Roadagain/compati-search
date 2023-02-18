import { NewSearchTarget } from '../search-target';

export interface SearchWords {
  name: string[];
  tag: string[];
}

export type NewSearchWords = Record<NewSearchTarget, string[]>;
