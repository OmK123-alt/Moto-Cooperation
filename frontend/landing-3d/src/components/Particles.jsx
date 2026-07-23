import { Sparkles } from '@react-three/drei';

export default function Particles() {
  return (
    <Sparkles
      count={82}
      scale={[8, 3.6, 5.2]}
      size={1.1}
      speed={0.2}
      opacity={0.26}
      color="#ff2a1a"
    />
  );
}
