import { loadCharactersDataFromJson } from '../lib/load-data';
import { GetServerSideProps } from 'next';
import { Props, SearchTemplate } from '../components/templates/SearchTemplate';

export default SearchTemplate;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { name } = context.params;
  const result = await fetch(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${name}.json?alt=media`
  );
  if (result.status === 404) {
    return {
      notFound: true,
    };
  }
  const json = await result.json();
  return {
    props: {
      characters: loadCharactersDataFromJson(json),
    },
  };
};
