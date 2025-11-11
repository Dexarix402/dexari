import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft, History, Wallet } from "lucide-react";
import heroBackground from "@assets/generated_images/Dashboard_hero_gradient_background_46c05051.png";

interface QuickActionsCardProps {
  onSend?: () => void;
  onReceive?: () => void;
  onHistory?: () => void;
  onConnect?: () => void;
}

export function QuickActionsCard({
  onSend,
  onReceive,
  onHistory,
  onConnect,
}: QuickActionsCardProps) {
  return (
    <Card className="relative overflow-hidden border-none" data-testid="card-quick-actions">
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
            <h2 className="text-2xl font-display font-bold mb-2">Quick Actions</h2>
            <p className="text-muted-foreground">Manage payments and connect your wallet</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="default" 
              className="gap-2 h-auto py-4 flex-col"
              onClick={onSend}
              data-testid="button-send"
            >
              <ArrowUpRight className="h-5 w-5" />
              <span className="text-sm">Send Payment</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-auto py-4 flex-col"
              onClick={onReceive}
              data-testid="button-receive"
            >
              <ArrowDownLeft className="h-5 w-5" />
              <span className="text-sm">Request Payment</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-auto py-4 flex-col"
              onClick={onHistory}
              data-testid="button-history"
            >
              <History className="h-5 w-5" />
              <span className="text-sm">View History</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2 h-auto py-4 flex-col"
              onClick={onConnect}
              data-testid="button-connect"
            >
              <Wallet className="h-5 w-5" />
              <span className="text-sm">Connect Wallet</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
