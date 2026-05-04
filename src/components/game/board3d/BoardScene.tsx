import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import type { BoardTile } from "@/lib/game/constants";
import type { Player } from "@/lib/game/engine-types";
import { useTheme } from "@/lib/theme-context";
import { BoardSurface } from "./BoardSurface";
import { Tile3D } from "./Tile3D";
import { CameraRig } from "./CameraRig";
import { PlayerToken3D } from "./PlayerToken3D";
import { Dice3D } from "./Dice3D";
import { PLAYER_TOKEN_COLORS, getBoardPalette } from "./boardLayout";

interface Props {
  tiles: BoardTile[];
  players: Player[];
  currentPlayerId: string;
  propertyOwners: Record<number, string>;
  centerContent?: ReactNode;
  topDownCamera?: boolean;
  diceRolling?: boolean;
  diceValue?: number | null;
}

const SEAT_OFFSETS = [
  { x: -0.12, z: -0.12 },
  { x: 0.12, z: -0.12 },
  { x: -0.12, z: 0.12 },
  { x: 0.12, z: 0.12 },
];

export function BoardScene({
  tiles,
  players,
  currentPlayerId,
  propertyOwners,
  centerContent,
  topDownCamera = false,
  diceRolling = false,
  diceValue = null,
}: Props) {
  const { theme } = useTheme();
  const palette = getBoardPalette(theme);

  const playerColorMap = new Map<string, string>();
  players.forEach((p, idx) => {
    playerColorMap.set(p.id, PLAYER_TOKEN_COLORS[idx % PLAYER_TOKEN_COLORS.length]);
  });

  return (
    <div
      className="relative aspect-square w-full max-w-[820px] overflow-hidden rounded-2xl border border-[#3affd9]/20"
      style={{ backgroundColor: palette.containerBg }}
    >
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 9.5, 8.5], fov: 32 }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={[palette.sceneBg]} />

        <ambientLight intensity={palette.ambientIntensity} />
        <directionalLight
          position={[6, 10, 4]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[0, 6, 0]} intensity={0.7} color="#7a3aff" />
        <pointLight position={[-6, 3, -6]} intensity={0.5} color="#3a9bff" />
        <pointLight position={[6, 3, 6]} intensity={0.5} color="#ff3aff" />

        <Suspense fallback={null}>
          <BoardSurface palette={palette} />

          {tiles.map((tile) => {
            const isPrinciple = tile.type === "principle";
            const ownerId = isPrinciple ? propertyOwners[tile.principleNo] : undefined;
            const ownerColor = ownerId ? playerColorMap.get(ownerId) : undefined;
            const ownerPlayer = ownerId ? players.find((p) => p.id === ownerId) : undefined;
            const layers =
              ownerPlayer && isPrinciple ? (ownerPlayer.layers[tile.principleNo] ?? 0) : 0;
            return (
              <Tile3D
                key={tile.index}
                tile={tile}
                ownerColor={ownerColor}
                layers={layers}
                palette={palette}
              />
            );
          })}

          {players
            .filter((p) => !p.isEliminated)
            .map((p, idx) => (
              <PlayerToken3D
                key={p.id}
                position={p.position}
                color={playerColorMap.get(p.id) ?? "#ffffff"}
                label={`P${idx + 1}`}
                isCurrent={p.id === currentPlayerId}
                seatOffset={SEAT_OFFSETS[idx % SEAT_OFFSETS.length]}
              />
            ))}

          <Dice3D
            rolling={diceRolling}
            value={diceValue}
            position={[0, 0.7, 0]}
            accent="#3affd9"
            bodyColor={palette.diceBody}
          />
        </Suspense>

        <CameraRig topDown={topDownCamera} />
      </Canvas>

      {centerContent ? (
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
          <div className="pointer-events-auto">{centerContent}</div>
        </div>
      ) : null}
    </div>
  );
}
