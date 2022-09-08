export interface Tag {
  category: string;
  label: string;
}

export interface TaggedCharacter {
  name: string;
  tags: Tag[];
  showDefault: boolean;
}
