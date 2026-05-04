import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Rotation needed to bring each pip-value face to point UP (+Y).
// Face layout: top=1 (+Y), bottom=6 (-Y), front=2 (+Z), back=5 (-Z), right=3 (+X), left=4 (-X).
const FACE_QUATERNIONS: Record<number, THREE.Euler> = {
  1: new THREE.Euler(0, 0, 0),
  2: new THREE.Euler(-Math.PI / 2, 0, 0),
  3: new THREE.Euler(0, 0, Math.PI / 2),
  4: new THREE.Euler(0, 0, -Math.PI / 2),
  5: new THREE.Euler(Math.PI / 2, 0, 0),
  6: new THREE.Euler(Math.PI, 0, 0),
};

interface Props {
  rolling: boolean;
  value: number | null;
  position: [number, number, number];
  accent?: string;
  bodyColor?: string;
}

function makePipMaterial(accent: string) {
  return new THREE.MeshStandardMaterial({
    color: accent,
    emissive: accent,
    emissiveIntensity: 1.4,
    toneMapped: false,
  });
}

type PipFace = "top" | "bottom" | "front" | "back" | "right" | "left";

// Standard western die: opposite faces sum to 7.
const FACE_VALUES: Record<PipFace, number> = {
  top: 1,
  bottom: 6,
  front: 2,
  back: 5,
  right: 3,
  left: 4,
};

// 2D pip layout per value, in normalized [-1, 0, 1] grid.
const PIP_PATTERNS: Record<number, Array<[number, number]>> = {
  1: [[0, 0]],
  2: [
    [-1, 1],
    [1, -1],
  ],
  3: [
    [-1, 1],
    [0, 0],
    [1, -1],
  ],
  4: [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ],
  5: [
    [-1, 1],
    [1, 1],
    [0, 0],
    [-1, -1],
    [1, -1],
  ],
  6: [
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [1, 1],
    [1, 0],
    [1, -1],
  ],
};

const SIZE = 0.5;
const HALF = SIZE / 2;
const SPREAD = HALF * 0.55;
const PROTRUSION = 0.005;

function pipPositionsForFace(face: PipFace): Array<[number, number, number]> {
  const value = FACE_VALUES[face];
  const pattern = PIP_PATTERNS[value];
  return pattern.map(([u, v]) => {
    const a = u * SPREAD;
    const b = v * SPREAD;
    const o = HALF + PROTRUSION;
    switch (face) {
      case "top":
        return [a, o, b];
      case "bottom":
        return [a, -o, -b];
      case "front":
        return [a, b, o];
      case "back":
        return [-a, b, -o];
      case "right":
        return [o, b, -a];
      case "left":
        return [-o, b, a];
    }
  });
}

const FACES: PipFace[] = ["top", "bottom", "front", "back", "right", "left"];

export function Dice3D({ rolling, value, position, accent = "#ff3aff", bodyColor = "#0c1024" }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const startTimeRef = useRef<number | null>(null);
  const startQuatRef = useRef(new THREE.Quaternion());
  const targetQuatRef = useRef(new THREE.Quaternion());
  const tumbleSeedRef = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    if (!rolling) return;
    startTimeRef.current = performance.now();
    if (groupRef.current) {
      startQuatRef.current.copy(groupRef.current.quaternion);
    }
    tumbleSeedRef.current = {
      x: 6 + Math.random() * 6,
      y: 6 + Math.random() * 6,
      z: 6 + Math.random() * 6,
    };
  }, [rolling]);

  useEffect(() => {
    if (rolling || value == null) return;
    const euler = FACE_QUATERNIONS[value] ?? FACE_QUATERNIONS[1];
    targetQuatRef.current.setFromEuler(euler);
  }, [rolling, value]);

  useFrame(() => {
    const group = groupRef.current;
    if (!group) return;
    if (rolling && startTimeRef.current != null) {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const seed = tumbleSeedRef.current;
      group.rotation.x = startQuatRef.current.x + elapsed * seed.x;
      group.rotation.y = startQuatRef.current.y + elapsed * seed.y;
      group.rotation.z = startQuatRef.current.z + elapsed * seed.z;
      group.position.y = position[1] + Math.abs(Math.sin(elapsed * 6)) * 0.4;
    } else if (value != null) {
      const target = targetQuatRef.current;
      group.quaternion.slerp(target, 0.18);
      group.position.y += (position[1] - group.position.y) * 0.2;
    }
  });

  const pipMaterial = useMemo(() => makePipMaterial(accent), [accent]);

  const allPips = useMemo(
    () =>
      FACES.flatMap((face) =>
        pipPositionsForFace(face).map((pos) => ({ face, pos })),
      ),
    [],
  );

  return (
    <group ref={groupRef} position={position}>
      {/* Glassy die body */}
      <mesh castShadow>
        <boxGeometry args={[SIZE, SIZE, SIZE]} />
        <meshPhysicalMaterial
          color={bodyColor}
          transmission={0.7}
          roughness={0.05}
          metalness={0.1}
          thickness={0.4}
          ior={1.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          attenuationColor="#3affd9"
          attenuationDistance={0.4}
        />
      </mesh>
      {/* Edge glow outline — just the 12 cube edges */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(SIZE * 1.02, SIZE * 1.02, SIZE * 1.02)]} />
        <lineBasicMaterial color={accent} transparent opacity={0.7} toneMapped={false} />
      </lineSegments>
      {/* Pips for all six faces */}
      {allPips.map(({ face, pos }, i) => (
        <mesh key={`${face}-${i}`} position={pos} material={pipMaterial}>
          <sphereGeometry args={[0.04, 16, 16]} />
        </mesh>
      ))}
    </group>
  );
}
