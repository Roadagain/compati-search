'use client';

import { NextPage } from 'next';
import { usePathname } from 'next/navigation';

import { SearchTemplate } from '../../components/templates/SearchTemplate';

const NamedPage: NextPage = () => {
  const pathname = usePathname();
  const name = pathname.match(/^\/(.+)/)[1];
  return <SearchTemplate dataName={name} />;
};

export default NamedPage;
