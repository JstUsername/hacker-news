import { Footer } from '../Footer';
import { Header } from '../Header';
import { ParticlesBackground } from '../ParticlesBackground';
import { OutletWrapper } from './Layout.styled';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelectorInitialize } from '~/store';

export const Layout = () => {
  const initialize = useSelectorInitialize();

  useEffect(() => {
    void initialize();
  }, [initialize]);

  return (
    <>
      <ParticlesBackground />
      <Header />
      <OutletWrapper>
        <Outlet />
      </OutletWrapper>
      <Footer />
    </>
  );
};
