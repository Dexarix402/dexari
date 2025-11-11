import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentAvatar } from "./AgentAvatar";
import { ArrowUpRight, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AgentCardProps {
  agent: {
    address: string;
    name: string;
    totalSent?: string;
    totalReceived?: string;
    lastTransaction?: string;
  };
  onQuickPay?: () => void;
  onViewDetails?: () => void;
}

export function AgentCard({ agent, onQuickPay, onViewDetails }: AgentCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-agent-${agent.address}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AgentAvatar address={agent.address} name={agent.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold truncate">{agent.name}</p>
              <p className="text-xs text-muted-foreground font-mono truncate">
                {agent.address.slice(0, 6)}...{agent.address.slice(-4)}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" data-testid="button-agent-menu">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
              <DropdownMenuItem>View History</DropdownMenuItem>
              <DropdownMenuItem>Request Payment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Sent</p>
            <p className="font-semibold">{agent.totalSent || "0"} USDC</p>
          </div>
          <div className="p-2 bg-muted rounded-md">
            <p className="text-xs text-muted-foreground mb-1">Received</p>
            <p className="font-semibold text-primary">{agent.totalReceived || "0"} USDC</p>
          </div>
        </div>

        {agent.lastTransaction && (
          <p className="text-xs text-muted-foreground mb-3">Last: {agent.lastTransaction}</p>
        )}

        <Button 
          className="w-full gap-2" 
          size="sm"
          onClick={onQuickPay}
          data-testid="button-quick-pay"
        >
          <ArrowUpRight className="h-3 w-3" />
          Quick Pay
        </Button>
      </CardContent>
    </Card>
  );
}
