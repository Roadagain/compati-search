import { NextApiHandler } from 'next';
import { loadSampleCharactersData } from '../../../lib/load-data';

const handler: NextApiHandler = (_, response) => {
  response.status(200).json(loadSampleCharactersData());
};

export default handler;
