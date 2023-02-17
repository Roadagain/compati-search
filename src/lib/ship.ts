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

export interface NewShip {
  id: number;
  name: string;
  kana: string;
  category: string;
  type: string;
  speed: string;
  range: string;
  equipments: string[];
  abilities: string[];
  showDefault: boolean;
}
