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
