export interface Tag {
  category: string;
  label: string;
}

export type WouldBeTag = { [K in keyof Tag]?: unknown };

export const isTag = (obj: WouldBeTag): obj is Tag => {
  return typeof obj.category === 'string' && typeof obj.label === 'string';
};

export interface TaggedCharacter {
  name: string;
  kana: string;
  tags: Tag[];
  showDefault: boolean;
}

export type WouldBeTaggedCharacter = { [K in keyof TaggedCharacter]?: unknown };

export const isTaggedCharacter = (
  obj: WouldBeTaggedCharacter
): obj is TaggedCharacter => {
  return (
    typeof obj.name === 'string' &&
    typeof obj.kana === 'string' &&
    Array.isArray(obj.tags) &&
    obj.tags.every(isTag) &&
    typeof obj.showDefault === 'boolean'
  );
};
