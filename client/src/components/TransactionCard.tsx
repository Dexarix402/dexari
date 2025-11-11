import { Card, CardContent } from "@/components/ui/card";
import { AgentAvatar } from "./AgentAvatar";
import { PaymentStatusBadge, PaymentStatus } from "./PaymentStatusBadge";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface TransactionCardProps {
  id: string;
  type: "sent" | "received";
  agent: {
    address: string;
    name?: string;
  };
  amount: string;
  currency: string;
  status: PaymentStatus;
  timestamp: Date;
  onClick?: () => void;
}

export function TransactionCard({
  id,
  type,
  agent,
  amount,
  currency,
  status,
  timestamp,
  onClick,
}: TransactionCardProps) {
  return (
    <Card 
      className="hover-elevate cursor-pointer" 
      onClick={onClick}
      data-testid={`card-transaction-${id}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <AgentAvatar address={agent.address} name={agent.name} size="md" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium truncate">{agent.name || `${agent.address.slice(0, 6)}...${agent.address.slice(-4)}`}</p>
                {type === "sent" ? (
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                ) : (
                  <ArrowDownLeft className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2 ml-4">
            <p className={`font-display font-semibold ${type === "sent" ? "text-foreground" : "text-primary"}`}>
              {type === "sent" ? "-" : "+"}{amount} {currency}
            </p>
            <PaymentStatusBadge status={status} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
