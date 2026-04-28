import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { GameSession } from "@/components/game/GameSession";

export const Route = createFileRoute("/game/$roomId")({
  component: GamePage,
});

function GamePage() {
  const { roomId } = useParams({ from: "/game/$roomId" });
  return <GameSession roomId={roomId} />;
}