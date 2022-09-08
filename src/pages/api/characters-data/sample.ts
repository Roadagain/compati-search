import { NextApiHandler } from 'next';

import sampleCharactersData from '../../../../sample/characters-data/sample.json';

const handler: NextApiHandler = (_, response) => {
  response.status(200).json(sampleCharactersData);
};

export default handler;
