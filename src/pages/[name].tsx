import { GetServerSideProps, NextPage } from 'next';
import { SearchTemplate } from '../components/templates/SearchTemplate';
import { useCharactersData } from '../hooks/characters-data';

interface Props {
  name: string;
}

const NamedPage: NextPage<Props> = ({ name }) => {
  const [characters] = useCharactersData(name);
  return <SearchTemplate characters={characters} />;
};

export default NamedPage;

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { name } = context.params;
  if (typeof name !== 'string') {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      name,
    },
  };
};
