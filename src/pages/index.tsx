import { loadSampleCharactersData } from '../lib/load-data';
import { SearchTemplate } from '../components/templates/SearchTemplate';

const Index = () => <SearchTemplate characters={loadSampleCharactersData()} />;

export default Index;
