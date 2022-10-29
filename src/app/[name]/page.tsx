'use client';

import { usePathname } from 'next/navigation';

import { SearchTemplate } from '../../components/templates/SearchTemplate';

const Page = () => {
  const pathname = usePathname();
  const name = pathname.match(/^\/(.+)/)[1];
  return <SearchTemplate dataName={name} />;
};

export default Page;
