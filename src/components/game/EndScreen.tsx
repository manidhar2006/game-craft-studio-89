import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import { Link } from "@tanstack/react-router";

interface Props { winnerName: string; onPlayAgain: () => void }

export function EndScreen({ winnerName, onPlayAgain }: Props) {
  return (
    <Dialog open>
      <DialogContent className="max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-3">
            <Trophy className="h-10 w-10 text-accent" />
            <span className="text-2xl">{winnerName} wins!</span>
          </DialogTitle>
        </DialogHeader>
        <p className="mt-2 text-sm text-muted-foreground">Last compliant entity standing. The Data Protection Board approves.</p>
        <div className="mt-5 flex justify-center gap-3">
          <Button variant="secondary" asChild>
            <Link to="/lobby">Lobby</Link>
          </Button>
          <Button onClick={onPlayAgain}>Play again</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}