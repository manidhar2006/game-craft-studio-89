import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gavel } from "lucide-react";
import type { RegulatorCard } from "@/lib/game/engine-types";

interface Props { card: RegulatorCard; onClose: () => void }

export function RegulatorCardModal({ card, onClose }: Props) {
  return (
    <Dialog open>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Gavel className="h-5 w-5 text-primary" /> {card.title}
          </DialogTitle>
        </DialogHeader>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{card.body}</p>
        <div className="mt-4 flex justify-end">
          <Button onClick={onClose}>Acknowledge</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}