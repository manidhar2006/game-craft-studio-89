import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { GameSession } from "@/components/game/GameSession";

export const Route = createFileRoute("/_app/game/$roomId")({
  component: GamePage,
});

function GamePage() {
  const { roomId } = useParams({ from: "/_app/game/$roomId" });
  return <GameSession roomId={roomId} />;
}