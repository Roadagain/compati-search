import { Tag, TaggedCharacter } from './tagged-character';
import { SearchTarget } from './search-target';

export interface CharacterName {
  label: string;
}

export type AutocompleteOption = Tag | CharacterName;

export const uniqueAndSortTags = (tags: Tag[]): Tag[] => {
  return tags
    .filter(
      (tag, index) =>
        tags.findIndex(
          ({ category, label }) =>
            tag.category === category && tag.label === label
        ) === index
    )
    .sort((a, b) => a.category.localeCompare(b.category));
};

export const generateAutocompleteOptions = (
  characters: TaggedCharacter[],
  target: SearchTarget,
  showAll: boolean
): AutocompleteOption[] => {
  const charactersShown = characters.filter(
    ({ showDefault }) => showAll || showDefault
  );
  switch (target) {
    case SearchTarget.TAG:
      return uniqueAndSortTags(charactersShown.flatMap(({ tags }) => tags));
    case SearchTarget.NAME:
      return charactersShown.map(({ name }) => ({ label: name }));
  }
};
