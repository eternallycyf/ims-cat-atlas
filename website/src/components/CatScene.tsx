import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import type { Breed } from '../data/breeds';
import { CatModel } from './CatModel';

interface CatSceneProps {
  breed: Breed;
  furColor: string;
  accentColor: string;
  autoRotate: boolean;
}

function SceneContent({ breed, furColor, accentColor, autoRotate }: CatSceneProps) {
  return (
    <>
      <color attach="background" args={['#d8ebe4']} />
      <fog attach="fog" args={['#d8ebe4', 10, 24]} />

      <Environment preset="park" background={false} />

      <hemisphereLight intensity={0.65} color="#f5fffb" groundColor="#8fb3a6" />
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 8, 3]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 3, -5]} intensity={0.65} color="#9ec0ff" />
      <spotLight
        position={[0, 7, 2]}
        angle={0.4}
        penumbra={0.65}
        intensity={1.1}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[2, 2, 4]} intensity={0.4} color="#ffeedd" />
      <pointLight position={[-2, 2, -4]} intensity={0.3} color="#ddeeff" />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]} receiveShadow>
        <circleGeometry args={[6, 64]} />
        <meshStandardMaterial color="#c5ddd4" roughness={0.95} metalness={0} />
      </mesh>

      <gridHelper args={[10, 20, '#9ebfb4', '#b7d0c6']} position={[0, -0.71, 0]} />

      <CatModel
        breed={breed}
        furColor={furColor}
        accentColor={accentColor}
        autoRotate={autoRotate}
      />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.5}
        scale={8}
        blur={2.5}
        far={4}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.06}
        minPolarAngle={0.55}
        maxPolarAngle={1.45}
        minDistance={2.8}
        maxDistance={8}
        target={[0, 0.55, 0]}
      />

      <EffectComposer>
        <Bloom
          intensity={0.3}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.1} darkness={0.3} />
      </EffectComposer>
    </>
  );
}

export function CatScene(props: CatSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [3.4, 1.75, 3.8], fov: 34, near: 0.1, far: 50 }}
      gl={{
        antialias: true,
        toneMappingExposure: 1.15,
        preserveDrawingBuffer: true,
      }}
    >
      <SceneContent {...props} />
    </Canvas>
  );
}
