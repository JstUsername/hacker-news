import type { Engine } from '@tsparticles/engine';
import { loadLinksPreset } from '@tsparticles/preset-links';
import { initParticlesEngine, Particles } from '@tsparticles/react';
import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

export const ParticlesBackground = () => {
  const { color } = useTheme();
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadLinksPreset(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  if (!init) return null;

  return (
    <Particles
      options={{
        preset: 'links',
        smooth: true,
        background: {
          color: color.backgroundDark,
        },
        particles: {
          links: {
            color: color.background,
          },
          color: {
            value: color.background,
          },
        },
      }}
    />
  );
};
