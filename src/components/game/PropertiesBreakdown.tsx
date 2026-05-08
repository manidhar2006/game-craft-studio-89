import { Card } from "@/components/ui/card";
import { Building2, Zap } from "lucide-react";
import type { GameState } from "@/lib/game/engine-types";
import { AVATARS, GROUP_COLORS, PRINCIPLES } from "@/lib/game/constants";

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

  if (state.rentOverrides?.[principleNo]?.[ownerId] !== undefined) {
    return state.rentOverrides[principleNo][ownerId];
  }

  const principle = PRINCIPLES.find((p) => p.principleNo === principleNo);
  if (!principle) return 0;

  const layers = owner.layers[principleNo] ?? 0;

  const ownsFullGroup = PRINCIPLES.filter((p) => p.group === principle.group).every(
    (p) => state.propertyOwners[p.principleNo] === ownerId,
  );

  if (layers === 1) return principle.layer1Rent;
  if (layers === 2) return principle.layer2Rent;
  if (layers >= 3) return principle.layer3Rent;
  return ownsFullGroup ? principle.baseRent * 2 : principle.baseRent;
}

export function PropertiesBreakdown({ state }: Props) {
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
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5" /> Properties
        </div>
        <div className="mt-3 rounded-xl border border-dashed border-border/50 bg-secondary/30 p-4 text-center text-sm text-muted-foreground">
          No tiles claimed yet — answer correctly to buy in!
        </div>
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
          const totalRent = principleNos.reduce(
            (sum, principleNo) => sum + getPlayerRent(state, principleNo, ownerId),
            0,
          );

          return (
            <div
              key={ownerId}
              className="rounded-xl border border-border/50 bg-secondary/40 p-3 transition-all hover:border-primary/40 hover:shadow-soft"
            >
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full text-base text-white shadow-tile"
                    style={{
                      background: `linear-gradient(135deg, ${avatar.color}, ${avatar.color}cc)`,
                    }}
                  >
                    {avatar.emoji}
                  </div>
                  <div className="text-sm font-semibold truncate">{owner.name}</div>
                </div>
                <div className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-bold text-accent tabular-nums">
                  ₹{totalRent}
                </div>
              </div>

              <div className="space-y-1.5">
                {principleNos
                  .sort((a, b) => a - b)
                  .map((principleNo) => {
                    const principle = PRINCIPLES.find((p) => p.principleNo === principleNo);
                    if (!principle) return null;

                    const layers = owner.layers[principleNo] ?? 0;
                    const rent = getPlayerRent(state, principleNo, ownerId);
                    const groupColor = GROUP_COLORS[principle.group];

                    return (
                      <div
                        key={principleNo}
                        className="group flex items-center gap-2 rounded-lg bg-background/60 p-2 text-xs transition-all hover:translate-x-0.5 hover:bg-background"
                      >
                        <span
                          className="h-7 w-1 shrink-0 rounded-full"
                          style={{ background: groupColor }}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <div className="font-medium truncate">{principle.name}</div>
                          <div className="mt-0.5 flex items-center gap-1 text-muted-foreground">
                            {layers > 0 ? (
                              <>
                                <Zap className="h-3 w-3 text-primary" />
                                <span className="font-semibold text-primary">L{layers}</span>
                              </>
                            ) : (
                              <span>Base tile</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent tabular-nums">
                          ₹{rent}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
