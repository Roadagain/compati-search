import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (request, response) => {
  const { name } = request.query;
  return response.redirect(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${name}.json`
  );
};

export default handler;
