import { GetServerSideProps, NextPage } from 'next';
import { SearchTemplate } from '../components/templates/SearchTemplate';

interface Props {
  name: string;
}

const NamedPage: NextPage<Props> = ({ name }) => (
  <SearchTemplate dataName={name} />
);

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
