import { Card } from "@/components/ui/card";
import { Building2, Zap } from "lucide-react";
import type { GameState, Player } from "@/lib/game/engine-types";
import { AVATARS, PRINCIPLES } from "@/lib/game/constants";

interface Props {
  state: GameState;
}

function getPlayerRent(
  state: GameState,
  principleNo: number,
  ownerId: string,
): number {
  const owner = state.players.find((player) => player.id === ownerId);
  if (!owner) return 0;

  // Check for player-specific rent override
  if (state.rentOverrides?.[principleNo]?.[ownerId] !== undefined) {
    return state.rentOverrides[principleNo][ownerId];
  }

  const principle = PRINCIPLES.find((p) => p.principleNo === principleNo);
  if (!principle) return 0;

  const layers = owner.layers[principleNo] ?? 0;
  
  // Check if owner owns full group
  const ownsFullGroup = PRINCIPLES.filter((p) => p.group === principle.group).every(
    (p) => state.propertyOwners[p.principleNo] === ownerId,
  );

  if (layers === 1) return principle.layer1Rent;
  if (layers === 2) return principle.layer2Rent;
  if (layers >= 3) return principle.layer3Rent;
  return ownsFullGroup ? principle.baseRent * 2 : principle.baseRent;
}

export function PropertiesBreakdown({ state }: Props) {
  // Group properties by owner
  const propertiesByOwner = new Map<string, number[]>();
  for (const [principleNoStr, ownerId] of Object.entries(state.propertyOwners)) {
    const principleNo = Number(principleNoStr);
    if (!propertiesByOwner.has(ownerId)) {
      propertiesByOwner.set(ownerId, []);
    }
    propertiesByOwner.get(ownerId)!.push(principleNo);
  }

  if (propertiesByOwner.size === 0) {
    return (
      <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Properties</div>
        <div className="mt-3 text-sm text-muted-foreground">No properties owned yet</div>
      </Card>
    );
  }

  return (
    <Card className="border-border/70 bg-card/90 p-4 shadow-soft">
      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
        <Building2 className="h-3.5 w-3.5" /> Properties
      </div>
      <div className="mt-3 space-y-3">
        {Array.from(propertiesByOwner.entries()).map(([ownerId, principleNos]) => {
          const owner = state.players.find((p) => p.id === ownerId);
          if (!owner) return null;

          const avatar = AVATARS[owner.avatarId % AVATARS.length];

          return (
            <div key={ownerId} className="rounded-lg border border-border/50 bg-secondary/40 p-3">
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-white"
                  style={{ background: avatar.color }}
                >
                  {avatar.emoji}
                </div>
                <div className="text-sm font-medium truncate">{owner.name}</div>
              </div>

              <div className="space-y-1.5">
                {principleNos
                  .sort()
                  .map((principleNo) => {
                    const principle = PRINCIPLES.find((p) => p.principleNo === principleNo);
                    if (!principle) return null;

                    const layers = owner.layers[principleNo] ?? 0;
                    const rent = getPlayerRent(state, principleNo, ownerId);

                    return (
                      <div key={principleNo} className="text-xs rounded bg-background/60 p-2 flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">{principle.name}</div>
                          <div className="text-muted-foreground flex items-center gap-1 mt-0.5">
                            {layers > 0 ? (
                              <>
                                <Zap className="h-3 w-3" />
                                <span>Layer {layers}</span>
                              </>
                            ) : (
                              <span>Base</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right font-semibold text-accent ml-2">₹{rent}</div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-2 pt-2 border-t border-border/30 text-xs text-muted-foreground flex justify-between">
                <span>Total Rent:</span>
                <span className="font-semibold text-foreground">
                  ₹{principleNos.reduce((sum, principleNo) => sum + getPlayerRent(state, principleNo, ownerId), 0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
