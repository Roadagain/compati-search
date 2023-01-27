export interface Tag {
  category: string;
  label: string;
}

export interface TaggedCharacter {
  id: number;
  name: string;
  kana: string;
  tags: Tag[];
  showDefault: boolean;
}
