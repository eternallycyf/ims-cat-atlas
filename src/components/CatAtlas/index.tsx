import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import type { Breed, FurPattern } from '../../data/breeds';

interface CatModelProps {
  breed: Breed;
  furColor: string;
  accentColor: string;
  autoRotate?: boolean;
}

function useFurMaterial(color: string, roughness = 0.72, metalness = 0.05) {
  return useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness,
        metalness,
      }),
    [color, roughness, metalness],
  );
}

function createFurTexture(baseColor: string, accentColor: string, pattern: FurPattern): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 512, 512);

  if (pattern === 'tabby') {
    ctx.strokeStyle = accentColor;
    ctx.lineWidth = 8;
    for (let i = 0; i < 12; i++) {
      const y = (i / 12) * 512;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(128, y + 20, 384, y - 20, 512, y);
      ctx.stroke();
    }
  } else if (pattern === 'pointed') {
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    gradient.addColorStop(0, baseColor);
    gradient.addColorStop(0.6, baseColor);
    gradient.addColorStop(1, accentColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
  } else if (pattern === 'shaded') {
    const gradient = ctx.createLinearGradient(0, 0, 0, 512);
    gradient.addColorStop(0, accentColor);
    gradient.addColorStop(0.4, baseColor);
    gradient.addColorStop(1, baseColor);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
  } else if (pattern === 'bicolor') {
    ctx.fillStyle = accentColor;
    ctx.fillRect(0, 256, 512, 256);
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, 512, 256);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createFurNormalMap(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#8080ff';
  ctx.fillRect(0, 0, 256, 256);

  for (let i = 0; i < 2000; i++) {
    const x = Math.random() * 256;
    const y = Math.random() * 256;
    const length = 3 + Math.random() * 5;
    const angle = Math.random() * Math.PI * 2;

    ctx.strokeStyle = `rgb(${128 + Math.cos(angle) * 40}, ${128 + Math.sin(angle) * 40}, 255)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function PatternOverlay({ pattern, accent }: { pattern: FurPattern; accent: string }) {
  const mat = useFurMaterial(accent, 0.8, 0.02);

  if (pattern === 'solid') return null;

  if (pattern === 'pointed') {
    return (
      <group>
        <mesh position={[0, 1.55, 0.55]} material={mat}>
          <sphereGeometry args={[0.28, 24, 24]} />
        </mesh>
        <mesh position={[0, 0.15, -0.95]} rotation={[0.4, 0, 0]} material={mat}>
          <capsuleGeometry args={[0.12, 0.55, 6, 12]} />
        </mesh>
        {[
          [-0.32, -0.35, 0.35],
          [0.32, -0.35, 0.35],
          [-0.28, -0.35, -0.35],
          [0.28, -0.35, -0.35],
        ].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]} material={mat}>
            <sphereGeometry args={[0.14, 16, 16]} />
          </mesh>
        ))}
      </group>
    );
  }

  if (pattern === 'shaded') {
    return (
      <mesh position={[0, 0.85, 0.15]} material={mat}>
        <sphereGeometry args={[0.55, 28, 28]} />
      </mesh>
    );
  }

  if (pattern === 'bicolor') {
    return (
      <mesh position={[0, 0.05, 0.15]} material={mat}>
        <sphereGeometry args={[0.55, 24, 24]} />
      </mesh>
    );
  }

  return (
    <group>
      {[-0.15, 0.05, 0.25].map((y, i) => (
        <mesh key={i} position={[0, 0.45 + y, 0.55]} material={mat}>
          <boxGeometry args={[0.85, 0.08, 0.12]} />
        </mesh>
      ))}
      <mesh position={[0, 1.35, 0.5]} material={mat}>
        <boxGeometry args={[0.15, 0.35, 0.08]} />
      </mesh>
    </group>
  );
}

function ProceduralCat({ breed, furColor, accentColor, autoRotate }: CatModelProps) {
  const group = useRef<THREE.Group>(null);
  const fluff = breed.fluff;
  const ear = breed.earSize;
  const face = breed.faceRoundness;

  const furTexture = useMemo(
    () => createFurTexture(furColor, accentColor, breed.pattern),
    [furColor, accentColor, breed.pattern],
  );

  const normalMap = useMemo(() => createFurNormalMap(), []);

  const fur = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        map: furTexture,
        normalMap: normalMap,
        normalScale: new THREE.Vector2(0.3, 0.3),
        roughness: 0.85,
        metalness: 0.02,
      }),
    [furTexture, normalMap],
  );

  const accent = useFurMaterial(accentColor, 0.78);
  const eye = useFurMaterial(breed.eyeColor, 0.25, 0.35);
  const nose = useFurMaterial('#e8a0a0', 0.55);
  const paw = useFurMaterial('#f5e6dc', 0.85);

  useFrame((_, delta) => {
    if (!group.current || !autoRotate) return;
    group.current.rotation.y += delta * 0.35;
  });

  return (
    <group ref={group} position={[0, -0.35, 0]} rotation={[0, Math.PI * 0.18, 0]} scale={1.15}>
      <mesh position={[0, 0.45, 0]} material={fur} castShadow receiveShadow>
        <sphereGeometry args={[0.72 * fluff, 32, 32]} />
      </mesh>
      <mesh position={[0, 0.15, 0.05]} material={fur} castShadow>
        <sphereGeometry args={[0.58 * fluff, 32, 32]} />
      </mesh>

      <mesh position={[0, 0.35, 0.55]} material={accent} castShadow>
        <sphereGeometry args={[0.32 * fluff, 24, 24]} />
      </mesh>

      <mesh position={[0, 1.25, 0.35]} material={fur} castShadow>
        <sphereGeometry args={[0.48 * face, 32, 32]} />
      </mesh>

      <mesh position={[0, 1.12, 0.72]} material={fur}>
        <sphereGeometry args={[0.18 * face, 20, 20]} />
      </mesh>
      <mesh position={[0, 1.08, 0.88]} material={nose}>
        <sphereGeometry args={[0.06, 12, 12]} />
      </mesh>

      <mesh position={[-0.16, 1.32, 0.72]} material={eye}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      <mesh position={[0.16, 1.32, 0.72]} material={eye}>
        <sphereGeometry args={[0.09, 16, 16]} />
      </mesh>
      <mesh position={[-0.16, 1.32, 0.8]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.16, 1.32, 0.8]}>
        <sphereGeometry args={[0.035, 10, 10]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      <mesh
        position={[-0.28 * face, 1.62, 0.25]}
        rotation={[0.25, 0, -0.35]}
        material={fur}
        castShadow
      >
        <coneGeometry args={[0.16 * ear, 0.32 * ear, 4]} />
      </mesh>
      <mesh
        position={[0.28 * face, 1.62, 0.25]}
        rotation={[0.25, 0, 0.35]}
        material={fur}
        castShadow
      >
        <coneGeometry args={[0.16 * ear, 0.32 * ear, 4]} />
      </mesh>
      <mesh
        position={[-0.28 * face, 1.58, 0.28]}
        rotation={[0.25, 0, -0.35]}
        material={accent}
      >
        <coneGeometry args={[0.08 * ear, 0.18 * ear, 4]} />
      </mesh>
      <mesh
        position={[0.28 * face, 1.58, 0.28]}
        rotation={[0.25, 0, 0.35]}
        material={accent}
      >
        <coneGeometry args={[0.08 * ear, 0.18 * ear, 4]} />
      </mesh>

      {[
        [-0.32, -0.15, 0.28],
        [0.32, -0.15, 0.28],
        [-0.28, -0.15, -0.32],
        [0.28, -0.15, -0.32],
      ].map((p, i) => (
        <group key={i} position={p as [number, number, number]}>
          <mesh material={fur} castShadow>
            <capsuleGeometry args={[0.12 * fluff, 0.28, 6, 12]} />
          </mesh>
          <mesh position={[0, -0.28, 0.02]} material={paw}>
            <sphereGeometry args={[0.13, 12, 12]} />
          </mesh>
        </group>
      ))}

      <mesh
        position={[0.05, 0.55, -0.85]}
        rotation={[0.9, 0.2, 0.4]}
        material={fur}
        castShadow
      >
        <capsuleGeometry args={[0.1 * fluff, 0.7 * fluff, 6, 12]} />
      </mesh>

      <PatternOverlay pattern={breed.pattern} accent={accentColor} />
    </group>
  );
}

function SceneContent({ breed, furColor, accentColor, autoRotate }: CatModelProps) {
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

      <ProceduralCat
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
    </>
  );
}

export interface CatAtlasProps {
  breed: Breed;
  furColor?: string;
  accentColor?: string;
  autoRotate?: boolean;
}

export function CatAtlas({
  breed,
  furColor = breed.fur,
  accentColor = breed.accent,
  autoRotate = true,
}: CatAtlasProps) {
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
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContent
        breed={breed}
        furColor={furColor}
        accentColor={accentColor}
        autoRotate={autoRotate}
      />
    </Canvas>
  );
}
