import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  AdaptiveDpr,
  AdaptiveEvents,
  AccumulativeShadows,
  ContactShadows,
  Environment,
  Float,
  RandomizedLight,
  useGLTF,
} from '@react-three/drei';
import { EffectComposer, Bloom, ToneMapping, Vignette } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import gsap from 'gsap';
import * as THREE from 'three';
import Particles from './Particles.jsx';

const MODEL_PATH = '/models/car.glb';
const HDRI_PATH = '/hdri/studio.hdr';

function CarModel({ scrollProgress, reducedMotion }) {
  const group = useRef();
  const { scene } = useGLTF(MODEL_PATH, true);

  const car = useMemo(() => {
    const clone = scene.clone(true);

    clone.traverse((child) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      if (child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 1.9;
        child.material.roughness = Math.min(child.material.roughness ?? 0.38, 0.42);
        child.material.metalness = Math.max(child.material.metalness ?? 0.52, 0.62);
        child.material.needsUpdate = true;
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    if (!group.current || reducedMotion) return undefined;

    gsap.fromTo(
      group.current.position,
      { y: -1.9 },
      { y: -0.76, duration: 2.15, ease: 'power4.out', delay: 0.22 },
    );

    return () => gsap.killTweensOf(group.current?.position);
  }, [reducedMotion]);

  useFrame((state) => {
    if (!group.current) return;

    const elapsed = state.clock.elapsedTime;
    const scroll = scrollProgress.current;
    const showroomRotation = reducedMotion ? 0 : Math.sin(elapsed * 0.22) * THREE.MathUtils.degToRad(7.5);

    group.current.rotation.y = -0.64 + showroomRotation + scroll * 0.58;
    group.current.position.y += (-0.76 + scroll * 0.12 - group.current.position.y) * 0.035;
  });

  return (
    <Float speed={0.82} rotationIntensity={0.1} floatIntensity={reducedMotion ? 0 : 0.16}>
      <group ref={group} scale={1.9} position={[0, -1.9, 0]}>
        <primitive object={car} />

        <pointLight position={[-0.82, 0.28, 1.9]} color="#fff4ed" intensity={2.15} distance={3} />
        <pointLight position={[0.82, 0.28, 1.9]} color="#fff4ed" intensity={2.15} distance={3} />

        <mesh position={[0, -0.36, 0.26]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.72, 96]} />
          <meshBasicMaterial
            color="#e10600"
            transparent
            opacity={0.18}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

function CameraRig({ scrollProgress, reducedMotion }) {
  const { camera, pointer } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, 0.02, 0), []);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    camera.position.set(-4.25, 1.62, 5.45);
    camera.lookAt(target);

    if (reducedMotion) return undefined;

    gsap.fromTo(
      camera.position,
      { z: 6.85, y: 1.16 },
      { z: 5.45, y: 1.62, duration: 3.1, ease: 'power3.out' },
    );

    return () => gsap.killTweensOf(camera.position);
  }, [camera, reducedMotion, target]);

  useFrame(() => {
    const scroll = scrollProgress.current;

    // Clamp pointer influence so the car always remains hero-composed.
    desired.set(
      -4.25 + THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.34 + scroll * 2.15,
      1.62 + THREE.MathUtils.clamp(pointer.y, -1, 1) * 0.14 + scroll * 0.48,
      5.45 - scroll * 1.48,
    );

    camera.position.lerp(desired, reducedMotion ? 0.08 : 0.035);
    camera.lookAt(target);
  });

  return null;
}

function ShowroomFloor() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.38, 0]} receiveShadow>
        <circleGeometry args={[5.4, 128]} />
        <meshStandardMaterial
          color="#080808"
          roughness={0.18}
          metalness={0.38}
          envMapIntensity={1.25}
        />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.375, 0.2]}>
        <ringGeometry args={[1.4, 4.6, 160]} />
        <meshBasicMaterial color="#e10600" transparent opacity={0.045} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

export default function CarScene({ scrollProgress, reducedMotion }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ fov: 34, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => {
        gl.setClearColor('#050505');
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
        gl.outputColorSpace = THREE.SRGBColorSpace;

        // Three r150+ uses physically correct lighting by default, but these flags
        // keep older compatible builds aligned with the intended PBR showroom look.
        if ('useLegacyLights' in gl) gl.useLegacyLights = false;
        if ('physicallyCorrectLights' in gl) gl.physicallyCorrectLights = true;
      }}
    >
      <color attach="background" args={['#050505']} />
      <fog attach="fog" args={['#170202', 7, 18]} />

      <Suspense fallback={null}>
        <Environment files={HDRI_PATH} background={false} environmentIntensity={1.35} />
        <ambientLight intensity={0.16} color="#2b0303" />
        <directionalLight
          position={[-3.5, 3.2, 4.2]}
          color="#ffffff"
          intensity={2.35}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <directionalLight position={[4.2, 1.5, -3]} color="#e10600" intensity={3.25} />
        <pointLight position={[-2.5, 1.2, 2.45]} color="#f5f5f5" intensity={1.08} />
        <spotLight
          position={[0, 5.35, 1.2]}
          angle={0.42}
          penumbra={0.78}
          intensity={3.7}
          color="#ffffff"
          castShadow
        />

        <Particles />
        <ShowroomFloor />
        <CarModel scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

        <AccumulativeShadows temporal frames={90} alphaTest={0.88} scale={9} position={[0, -1.37, 0]}>
          <RandomizedLight amount={8} radius={4} ambient={0.45} intensity={1.55} position={[2.5, 5, 3]} />
        </AccumulativeShadows>
        <ContactShadows position={[0, -1.355, 0]} opacity={0.56} scale={7} blur={2.5} far={4} color="#120202" />
      </Suspense>

      <CameraRig scrollProgress={scrollProgress} reducedMotion={reducedMotion} />

      <EffectComposer multisampling={0}>
        <Bloom luminanceThreshold={0.18} luminanceSmoothing={0.55} intensity={0.72} mipmapBlur />
        <Vignette eskil={false} offset={0.18} darkness={0.82} />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>

      <AdaptiveDpr pixelated={false} />
      <AdaptiveEvents />
    </Canvas>
  );
}

useGLTF.preload(MODEL_PATH, true);
