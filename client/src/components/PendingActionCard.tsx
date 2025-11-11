import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AgentAvatar } from "./AgentAvatar";
import { Clock, X, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PendingActionCardProps {
  id: string;
  type: "payment_request" | "pending_confirmation";
  agent: {
    address: string;
    name?: string;
  };
  amount: string;
  currency: string;
  timestamp: Date;
  description?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export function PendingActionCard({
  id,
  type,
  agent,
  amount,
  currency,
  timestamp,
  description,
  onApprove,
  onReject,
}: PendingActionCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5" data-testid={`card-pending-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Clock className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm mb-1">
              {type === "payment_request" ? "Payment Request" : "Pending Confirmation"}
            </p>
            <div className="flex items-center gap-2 mb-1">
              <AgentAvatar address={agent.address} name={agent.name} size="sm" />
              <p className="text-sm truncate">{agent.name || `${agent.address.slice(0, 6)}...${agent.address.slice(-4)}`}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(timestamp, { addSuffix: true })}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display font-bold text-lg">{amount}</p>
            <p className="text-xs text-muted-foreground">{currency}</p>
          </div>
        </div>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 px-2">{description}</p>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2"
            onClick={onReject}
            data-testid="button-reject"
          >
            <X className="h-3 w-3" />
            Decline
          </Button>
          <Button
            size="sm"
            className="flex-1 gap-2"
            onClick={onApprove}
            data-testid="button-approve"
          >
            <Check className="h-3 w-3" />
            {type === "payment_request" ? "Pay" : "Confirm"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
