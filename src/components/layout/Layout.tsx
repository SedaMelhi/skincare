import { FC, PropsWithChildren } from 'react';
import Meta from '../seo/Meta';
import { IMeta } from '../seo/meta.interface';
import Header from './header/header';

const Layout: FC<PropsWithChildren<IMeta>> = ({ children, title, description }) => {
  return (
    <>
      <Meta title={title} description={description} />
      <Header />

      {children}
    </>
  );
};
export default Layout;
