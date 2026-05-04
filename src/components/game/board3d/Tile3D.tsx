import { useMemo } from "react";
import { Html } from "@react-three/drei";
import type { BoardTile } from "@/lib/game/constants";
import {
  NEON_GROUP_COLORS,
  TILE_SIZE,
  TILE_THICKNESS,
  TILE_TYPE_COLOR,
  getTileWorldPos,
  type BoardPalette,
} from "./boardLayout";

interface Props {
  tile: BoardTile;
  ownerColor?: string;
  layers: number;
  highlighted?: boolean;
  palette: BoardPalette;
}

const TILE_DEPTH = TILE_SIZE * 0.96;
const TILE_WIDTH = TILE_SIZE * 0.96;
const TILE_TOP_Y = TILE_THICKNESS;
const STRIPE_HEIGHT = 0.05;
const STRIPE_THICKNESS = TILE_DEPTH * 0.18;

export function Tile3D({ tile, ownerColor, layers, highlighted, palette }: Props) {
  const { x, z, side, corner } = getTileWorldPos(tile.index);

  const baseColor = useMemo(() => {
    if (tile.type === "principle") return NEON_GROUP_COLORS[tile.group];
    return TILE_TYPE_COLOR[tile.type] ?? "#3a9bff";
  }, [tile]);

  // Outer edges (world-aligned). For corner tiles, both exposed sides get a stripe.
  const showStripePosZ = side === "bottom" || corner === "BR" || corner === "BL";
  const showStripeNegZ = side === "top" || corner === "TR" || corner === "TL";
  const showStripePosX = side === "right" || corner === "BR" || corner === "TR";
  const showStripeNegX = side === "left" || corner === "BL" || corner === "TL";

  const stripeY = TILE_TOP_Y + STRIPE_HEIGHT / 2;
  const glowY = TILE_TOP_Y + 0.001;

  return (
    <group position={[x, 0, z]}>
      {/* Tile body — raised panel */}
      <mesh receiveShadow castShadow position={[0, TILE_THICKNESS / 2, 0]}>
        <boxGeometry args={[TILE_WIDTH, TILE_THICKNESS, TILE_DEPTH]} />
        <meshStandardMaterial
          color={highlighted ? palette.tileBodyHighlighted : palette.tileBody}
          metalness={0.3}
          roughness={0.55}
          emissive={highlighted ? baseColor : "#000000"}
          emissiveIntensity={highlighted ? 0.4 : 0}
        />
      </mesh>

      {/* Stripe along +Z outer edge (board's bottom row) */}
      {showStripePosZ ? (
        <>
          <mesh position={[0, stripeY, TILE_DEPTH / 2 - STRIPE_THICKNESS / 2]}>
            <boxGeometry args={[TILE_WIDTH * 0.96, STRIPE_HEIGHT, STRIPE_THICKNESS]} />
            <meshBasicMaterial color={baseColor} toneMapped={false} />
          </mesh>
          <mesh
            position={[0, glowY, TILE_DEPTH / 2 - STRIPE_THICKNESS / 2]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[TILE_WIDTH * 1.05, STRIPE_THICKNESS * 1.6]} />
            <meshBasicMaterial color={baseColor} transparent opacity={0.18} toneMapped={false} />
          </mesh>
        </>
      ) : null}

      {/* Stripe along -Z outer edge (board's top row) */}
      {showStripeNegZ ? (
        <>
          <mesh position={[0, stripeY, -(TILE_DEPTH / 2 - STRIPE_THICKNESS / 2)]}>
            <boxGeometry args={[TILE_WIDTH * 0.96, STRIPE_HEIGHT, STRIPE_THICKNESS]} />
            <meshBasicMaterial color={baseColor} toneMapped={false} />
          </mesh>
          <mesh
            position={[0, glowY, -(TILE_DEPTH / 2 - STRIPE_THICKNESS / 2)]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[TILE_WIDTH * 1.05, STRIPE_THICKNESS * 1.6]} />
            <meshBasicMaterial color={baseColor} transparent opacity={0.18} toneMapped={false} />
          </mesh>
        </>
      ) : null}

      {/* Stripe along +X outer edge (board's right column) */}
      {showStripePosX ? (
        <>
          <mesh position={[TILE_WIDTH / 2 - STRIPE_THICKNESS / 2, stripeY, 0]}>
            <boxGeometry args={[STRIPE_THICKNESS, STRIPE_HEIGHT, TILE_DEPTH * 0.96]} />
            <meshBasicMaterial color={baseColor} toneMapped={false} />
          </mesh>
          <mesh
            position={[TILE_WIDTH / 2 - STRIPE_THICKNESS / 2, glowY, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[STRIPE_THICKNESS * 1.6, TILE_DEPTH * 1.05]} />
            <meshBasicMaterial color={baseColor} transparent opacity={0.18} toneMapped={false} />
          </mesh>
        </>
      ) : null}

      {/* Stripe along -X outer edge (board's left column) */}
      {showStripeNegX ? (
        <>
          <mesh position={[-(TILE_WIDTH / 2 - STRIPE_THICKNESS / 2), stripeY, 0]}>
            <boxGeometry args={[STRIPE_THICKNESS, STRIPE_HEIGHT, TILE_DEPTH * 0.96]} />
            <meshBasicMaterial color={baseColor} toneMapped={false} />
          </mesh>
          <mesh
            position={[-(TILE_WIDTH / 2 - STRIPE_THICKNESS / 2), glowY, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[STRIPE_THICKNESS * 1.6, TILE_DEPTH * 1.05]} />
            <meshBasicMaterial color={baseColor} transparent opacity={0.18} toneMapped={false} />
          </mesh>
        </>
      ) : null}

      {/* HTML label centered on the tile face */}
      <Html
        position={[0, TILE_TOP_Y + 0.06, 0]}
        center
        distanceFactor={7}
        zIndexRange={[10, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          className="select-none text-center whitespace-nowrap"
          style={{
            color: palette.labelColor,
            textShadow: palette.labelShadow(baseColor),
          }}
        >
          <div
            className="font-semibold leading-tight"
            style={{ fontSize: "11px", letterSpacing: "0.04em" }}
          >
            {tile.name}
          </div>
          {tile.subtitle ? (
            <div
              className="leading-tight opacity-75"
              style={{ fontSize: "9px", marginTop: "1px" }}
            >
              {tile.subtitle}
            </div>
          ) : null}
        </div>
      </Html>

      {/* Owner accent square in corner of tile face */}
      {ownerColor ? (
        <mesh position={[TILE_WIDTH * 0.32, TILE_TOP_Y + 0.012, -TILE_DEPTH * 0.32]}>
          <boxGeometry args={[0.1, 0.02, 0.1]} />
          <meshBasicMaterial color={ownerColor} toneMapped={false} />
        </mesh>
      ) : null}

      {/* Layer pips */}
      {layers > 0 ? (
        <group position={[-TILE_WIDTH * 0.32, TILE_TOP_Y + 0.012, -TILE_DEPTH * 0.32]}>
          {Array.from({ length: layers }).map((_, i) => (
            <mesh key={i} position={[i * 0.09, 0, 0]}>
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color="#ffd23a" toneMapped={false} />
            </mesh>
          ))}
        </group>
      ) : null}
    </group>
  );
}
