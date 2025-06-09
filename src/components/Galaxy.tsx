'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { GalaxyParams } from '@/lib/types';

const Galaxy = ({
  stars = 10000,
  radius = 5,
  branches = 5,
  spin = 1,
  randomness = 0.2,
  randomnessPower = 3,
  insideColor = '#ff6030',
  outsideColor = '#1b3984',
}: GalaxyParams) => {
  const points = useRef<THREE.Points>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(stars * 3);
    const colors = new Float32Array(stars * 3);

    const colorInside = new THREE.Color(insideColor);
    const colorOutside = new THREE.Color(outsideColor);

    for (let i = 0; i < stars; i++) {
      const i3 = i * 3;

      const r = Math.random() * radius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2;
      const spinAngle = r * spin;

      const randomX =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomY =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
      const randomZ =
        Math.pow(Math.random(), randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const mixedColor = colorInside.clone();
      mixedColor.lerp(colorOutside, r / radius);

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    return { positions, colors };
  }, [stars, radius, branches, spin, randomness, randomnessPower, insideColor, outsideColor]);

  useEffect(() => {
    if (!geometryRef.current) return;

    geometryRef.current.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometryRef.current.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  }, [positions, colors]);

  useFrame((_, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.05}
        sizeAttenuation
        depthWrite={false}
        vertexColors
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default Galaxy;
