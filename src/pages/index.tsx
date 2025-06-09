'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Scene } from '@/components';
import ControlPanel from '../components/ControlPanel';
import { Maximize2, Minimize2 } from 'lucide-react';
import type { GalaxyParams } from '@/lib/types';
import { useRouter } from 'next/router';
import { encodeGalaxyParams } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const Home = () => {
  const [isControlsOpen, setIsControlsOpen] = useState(true);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [galaxyParams, setGalaxyParams] = useState<GalaxyParams>({
    stars: 10000,
    radius: 5,
    branches: 5,
    spin: 1,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outsideColor: '#1b3984',
  });
  const router = useRouter();

  const toggleControls = () => {
    setIsControlsOpen(!isControlsOpen);
  };

  const handleViewGalaxy = () => {
    const queryCompressed = encodeGalaxyParams(galaxyParams);
    router.push(`/custom-galaxy?g=${queryCompressed}`);
  };

  useEffect(() => {
    if (!isMobile) {
      setIsControlsOpen(true);
    }
  }, [isMobile]);
  return (
    <>
      <Head>
        <title>Brahma - Galaxy Generator</title>
        <meta name="description" content="Customize and visualize your own galaxy in 3D using Brahma Galaxy Generator." />
      </Head>
      <main className="relative flex flex-col md:flex-row w-full min-h-screen bg-black overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black z-0 opacity-80"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black z-0 opacity-80"></div>

      <header className="relative z-10 pt-8 px-6 text-center md:hidden">
        <h1 className="text-4xl font-bold text-white tracking-tight mb-2">
       
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            Brahma
          </span>
          <br></br>
          Galaxy Generator
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-4">
          Customize and visualize your own galaxy in 3D
        </p>
      </header>

      {isMobile && (
        <>
          <div
            className={`relative transition-all duration-300 ease-in-out border-l border-gray-800 ${
              isControlsOpen
                ? isMobile
                  ? 'h-[50vh] w-full'
                  : 'md:w-2/5 h-screen'
                : isMobile
                  ? 'h-0'
                  : 'w-0'
            }`}
          >
            <button
              onClick={toggleControls}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-800/80 text-white hover:bg-gray-700/80 transition-all md:hidden"
              aria-label={isControlsOpen ? 'Hide controls' : 'Show controls'}
            >
              {isControlsOpen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            {isControlsOpen && (
              <ControlPanel
                galaxyParams={galaxyParams}
                setGalaxyParams={setGalaxyParams}
                onClickButton={handleViewGalaxy}
              />
            )}
          </div>
        </>
      )}

      <div
        className={`relative ${isMobile ? 'h-[50vh] w-full' : 'h-screen'} ${isControlsOpen && !isMobile ? 'md:w-3/5' : 'w-full'}`}
      >
        <div className="absolute top-8 left-8 z-20 hidden md:block">
          <h1 className="text-5xl font-bold text-white tracking-tight mb-2">
            
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
              Brahma
            </span>
            {' -'} Galaxy Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Customize and visualize your own galaxy in 3D
          </p>
        </div>
        <Scene galaxyParams={galaxyParams} />
      </div>

      {!isMobile && (
        <div
          className={`relative transition-all duration-300 ease-in-out border-l border-gray-800 ${
            isControlsOpen
              ? isMobile
                ? 'h-[50vh] w-full'
                : 'md:w-2/5 h-screen'
              : isMobile
                ? 'h-0'
                : 'w-0'
          }`}
        >
          {isControlsOpen && (
            <ControlPanel
              galaxyParams={galaxyParams}
              setGalaxyParams={setGalaxyParams}
              onClickButton={handleViewGalaxy}
            />
          )}
        </div>
      )}
    </main>
    </>
  );
};

export default Home;
