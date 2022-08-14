import { GetStaticProps } from 'next';

// export defaultがないと怒られるから無のDOMを返す関数を置く
const Sample = () => null;

export default Sample;

export const getStaticProps: GetStaticProps = () => ({
  redirect: {
    permanent: true,
    destination: '/',
  },
});
