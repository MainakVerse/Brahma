import { GalaxyParams } from '@/lib/types';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Galaxy, Loader } from '@/components';
import { Stars, Environment } from '@react-three/drei';
import { PointerEvents, XR, XROrigin, createXRStore } from '@react-three/xr';
import { OrbitHandles } from '@react-three/handle';

interface CustomGalaxyProps {
  galaxyParams: GalaxyParams;
}

export const store = createXRStore({});

const Scene = ({ galaxyParams }: CustomGalaxyProps) => {
  return (
    <Canvas camera={{ position: [10, 10, 0], fov: 50 }}>
      <color attach="background" args={['#000']} />
      <ambientLight intensity={0.2} />
      <PointerEvents />
      <OrbitHandles damping={0.01} zoom={true} pan={false} />
      <XR store={store}>
        <XROrigin position={[0, 1, 12.5]} />
        <Suspense fallback={<Loader />}>
          <Galaxy {...galaxyParams} />
          <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade speed={2} />
          <Environment preset="night" />
        </Suspense>
      </XR>
    </Canvas>
  );
};

export default Scene;
