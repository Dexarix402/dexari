import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, History, TrendingUp, TrendingDown } from "lucide-react";
import heroBackground from "@assets/generated_images/Dashboard_hero_gradient_background_46c05051.png";

interface WalletBalanceCardProps {
  balance: string;
  currency: string;
  change24h: {
    value: string;
    isPositive: boolean;
  };
  onSend?: () => void;
  onReceive?: () => void;
  onHistory?: () => void;
}

export function WalletBalanceCard({
  balance,
  currency,
  change24h,
  onSend,
  onReceive,
  onHistory,
}: WalletBalanceCardProps) {
  return (
    <Card className="relative overflow-hidden border-none" data-testid="card-wallet-balance">
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80" />
      
      <CardContent className="relative p-8">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <div className="flex items-baseline gap-3">
              <h2 className="text-5xl font-display font-bold">{balance}</h2>
              <span className="text-2xl font-medium text-muted-foreground">{currency}</span>
            </div>
            <div className={`flex items-center gap-1.5 mt-3 ${change24h.isPositive ? 'text-primary' : 'text-destructive'}`}>
              {change24h.isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span className="font-medium">{change24h.value}</span>
              <span className="text-muted-foreground text-sm">24h</span>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <Button 
              variant="default" 
              className="gap-2"
              onClick={onSend}
              data-testid="button-send"
            >
              <ArrowUpRight className="h-4 w-4" />
              Send
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={onReceive}
              data-testid="button-receive"
            >
              <ArrowDownLeft className="h-4 w-4" />
              Request
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={onHistory}
              data-testid="button-history"
            >
              <History className="h-4 w-4" />
              History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
