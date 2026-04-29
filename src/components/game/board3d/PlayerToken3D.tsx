import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { TILE_THICKNESS, getTileWorldPos } from "./boardLayout";

interface Props {
  position: number;
  color: string;
  label: string;
  isCurrent: boolean;
  seatOffset: { x: number; z: number };
}

export function PlayerToken3D({ position, color, isCurrent, seatOffset }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef(getTileWorldPos(position));
  targetRef.current = getTileWorldPos(position);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const target = targetRef.current;
    const tx = target.x + seatOffset.x;
    const tz = target.z + seatOffset.z;
    const lerp = Math.min(1, delta * 6);
    groupRef.current.position.x += (tx - groupRef.current.position.x) * lerp;
    groupRef.current.position.z += (tz - groupRef.current.position.z) * lerp;
    if (isCurrent) {
      groupRef.current.position.y =
        TILE_THICKNESS + 0.18 + Math.sin(performance.now() / 280) * 0.02;
    } else {
      groupRef.current.position.y = TILE_THICKNESS + 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Glowing base ring on the tile */}
      <mesh position={[0, -0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.13, 24]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} toneMapped={false} />
      </mesh>
      {/* Token body — small capsule */}
      <mesh castShadow>
        <capsuleGeometry args={[0.07, 0.16, 6, 12]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={isCurrent ? 0.9 : 0.5}
          metalness={0.2}
          roughness={0.4}
          toneMapped={false}
        />
      </mesh>
      {/* Highlight ring for current player */}
      {isCurrent ? (
        <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.15, 0.18, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.65} toneMapped={false} />
        </mesh>
      ) : null}
    </group>
  );
}
