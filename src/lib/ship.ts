export interface Tag {
  category: string;
  label: string;
}

export interface Ship {
  id: number;
  name: string;
  kana: string;
  tags: Tag[];
  showDefault: boolean;
}
