import { NextApiHandler } from 'next';

const handler: NextApiHandler = async (request, response) => {
  const { name } = request.query;
  if (typeof name !== 'string') {
    return response.status(400).json({ error: 'Name must be string' });
  }
  const fetchResult = await fetch(
    `${process.env.CHARACTERS_DATA_STORAGE_URL}/${name}.json`
  );
  const { status } = fetchResult;
  if (400 <= status && status < 500) {
    return response.status(404).json({ error: 'Not Found' });
  }
  const json = await fetchResult.json();
  response.status(200).json(json);
};

export default handler;
