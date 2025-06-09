import React, { useMemo, useState } from 'react';
import { Popup, Scene } from '@/components';
import { useRouter } from 'next/router';
import { decodeGalaxyParams } from '@/lib/utils';

const CustomGalaxy = () => {
  const { query, isReady } = useRouter();
  const [showVRModal, setShowVRModal] = useState(true);

  const galaxyParams = useMemo(() => {
    if (!isReady) return null;
    if (typeof query.g !== 'string') return null;
    return decodeGalaxyParams(query.g);
  }, [isReady, query]);

  const isClient = typeof window !== 'undefined';
  if (!isClient) return null;
  if (!isReady) return null;
  if (!galaxyParams) return <div className="text-red-500 p-4">Invalid parameters</div>;

  return (
    <div className="h-screen w-screen overflow-hidden bg-black text-white">
      <Scene galaxyParams={galaxyParams} />
      {showVRModal && <Popup setShowVRModal={setShowVRModal} />}
    </div>
  );
};

export default CustomGalaxy;
