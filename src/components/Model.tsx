import React from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Suspense } from 'react';

interface ModelProps {
  modelPath: string;
}

function ModelContent({ modelPath }: ModelProps) {
  const gltf = useLoader(GLTFLoader, modelPath);
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function Model({ modelPath }: ModelProps) {
  return (
    <Suspense fallback={
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
    }>
      <ModelContent modelPath={modelPath} />
    </Suspense>
  );
}