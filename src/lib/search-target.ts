export enum SearchType {
  TAG,
  NAME,
}

interface SearchTargetSimple {
  type: SearchType;
}

interface SearchTargetTagCategory {
  type: SearchType.TAG;
  category: string;
}

export type SearchTarget = SearchTargetSimple | SearchTargetTagCategory;
