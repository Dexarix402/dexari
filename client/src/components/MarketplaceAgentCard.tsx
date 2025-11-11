import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AgentAvatar } from "./AgentAvatar";
import { Star, ArrowUpRight, Eye, Zap } from "lucide-react";

interface MarketplaceAgentCardProps {
  agent: {
    id: string;
    address: string;
    name: string;
    description: string;
    category: string;
    rating: number;
    reviewCount: number;
    tags: string[];
    price?: string;
    priceType?: "one-time" | "per-use" | "monthly";
    featured?: boolean;
  };
  onView?: () => void;
  onQuickPay?: () => void;
}

export function MarketplaceAgentCard({ agent, onView, onQuickPay }: MarketplaceAgentCardProps) {
  return (
    <Card className="hover-elevate group" data-testid={`card-marketplace-agent-${agent.id}`}>
      <CardContent className="p-5">
        {agent.featured && (
          <div className="flex items-center gap-1.5 mb-3">
            <Zap className="h-3 w-3 text-primary fill-primary" />
            <span className="text-xs font-semibold text-primary">Featured</span>
          </div>
        )}
        
        <div className="flex items-start justify-between mb-3">
          <Badge variant="outline" className="text-xs">
            {agent.category}
          </Badge>
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{agent.rating.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">({agent.reviewCount})</span>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <AgentAvatar address={agent.address} name={agent.name} size="md" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base mb-1 truncate">{agent.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{agent.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {agent.tags.map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {agent.price && (
          <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-md">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Price</p>
              <p className="font-display font-bold text-lg text-primary">{agent.price} USDC</p>
            </div>
            <Badge variant="outline" className="text-xs">
              {agent.priceType === "one-time" ? "One-time" : agent.priceType === "per-use" ? "Per use" : "Monthly"}
            </Badge>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 gap-2"
            onClick={onView}
            data-testid="button-view-agent"
          >
            <Eye className="h-3.5 w-3.5" />
            View
          </Button>
          <Button 
            size="sm" 
            className="flex-1 gap-2"
            onClick={onQuickPay}
            data-testid="button-quick-pay-agent"
          >
            <ArrowUpRight className="h-3.5 w-3.5" />
            Quick Pay
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
