import {
  loadCharactersDataFromJson,
  loadSampleCharactersData,
} from '../lib/load-data';
import { GetServerSideProps } from 'next';
import { Props, SearchTemplate } from '../components/templates/SearchTemplate';

export default SearchTemplate;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const dataName = context.query.data;
  if (!dataName || dataName === 'sample') {
    return {
      props: {
        characters: loadSampleCharactersData(),
      },
    };
  }

  const result = await fetch(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${dataName}.json?alt=media`
  );
  const json = await result.json();
  return {
    props: {
      characters: loadCharactersDataFromJson(json),
    },
  };
};
