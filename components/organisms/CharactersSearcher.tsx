import React from 'react';
import {
  filterCharactersByTags,
  TaggedCharacter,
} from '../../lib/tagged-character';
import { CharacterName } from '../atoms/CharacterName';
import { SearchForm } from '../molecules/SearchForm';

interface Props {
  /**
   * 検索対象のキャラクター一覧
   */
  characters: TaggedCharacter[];
}

export const CharactersSearcher: React.FC<Props> = ({ characters }) => {
  const [searchResults, setSearchResults] = React.useState<TaggedCharacter[]>(
    []
  );
  const search = (text: string) => {
    const tags = text.split(/\s/);
    setSearchResults(filterCharactersByTags(characters, tags));
  };

  return (
    <>
      <SearchForm onSearch={search} />
      <ul>
        {searchResults.map(({ name }) => (
          <li key={name}>
            <CharacterName>{name}</CharacterName>
          </li>
        ))}
      </ul>
    </>
  );
};
