import { BOARD_HALF, BOARD_THICKNESS, TILE_SIZE } from "./boardLayout";

const BOARD_OUTER = (BOARD_HALF + TILE_SIZE / 2) * 2 + 0.6;
const BOARD_INNER_HOLLOW = BOARD_HALF * 2 - TILE_SIZE * 0.5;

export function BoardSurface() {
  return (
    <group>
      {/* Main raised plate (the physical board) */}
      <mesh position={[0, -BOARD_THICKNESS / 2, 0]} receiveShadow castShadow>
        <boxGeometry args={[BOARD_OUTER, BOARD_THICKNESS, BOARD_OUTER]} />
        <meshStandardMaterial color="#0a0d18" metalness={0.55} roughness={0.45} />
      </mesh>

      {/* Outer neon frame — sits flat on top of the plate, around the tiles */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[
            (BOARD_OUTER / 2) * 0.985,
            BOARD_OUTER / 2,
            4,
            1,
            Math.PI / 4,
            Math.PI * 2,
          ]}
        />
        <meshBasicMaterial color="#3affd9" toneMapped={false} />
      </mesh>

      {/* Inner felt — a slightly raised dark inset inside the tile ring */}
      <mesh position={[0, 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[BOARD_INNER_HOLLOW, BOARD_INNER_HOLLOW]} />
        <meshStandardMaterial color="#06080f" metalness={0.4} roughness={0.7} />
      </mesh>

      {/* Inner neon trim around the felt */}
      <mesh position={[0, 0.012, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry
          args={[BOARD_INNER_HOLLOW / 2 - 0.04, BOARD_INNER_HOLLOW / 2, 4, 1, Math.PI / 4, Math.PI * 2]}
        />
        <meshBasicMaterial color="#ff3aff" transparent opacity={0.6} toneMapped={false} />
      </mesh>

      {/* Center pad — circular glow under the dice */}
      <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.0, 64]} />
        <meshBasicMaterial color="#1a0535" transparent opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.016, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.92, 1.0, 64]} />
        <meshBasicMaterial color="#ff3aff" toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.018, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.55, 0.62, 64]} />
        <meshBasicMaterial color="#3affd9" toneMapped={false} />
      </mesh>
    </group>
  );
}
