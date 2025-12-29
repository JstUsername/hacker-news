import { Footer } from '../Footer';
import { Header } from '../Header';
import { Outlet } from 'react-router-dom';
import { MainWrapper } from '~/commons';

export const Layout = () => {
  return (
    <MainWrapper>
      <Header />
      <Outlet />
      <Footer />
    </MainWrapper>
  );
};
