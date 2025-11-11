import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon: Icon, trend }: StatCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`card-stat-${title.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{title}</span>
          <div className="p-2 bg-primary/10 rounded-md">
            <Icon className="h-4 w-4 text-primary" />
          </div>
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-display font-bold">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 text-sm ${trend.isPositive ? 'text-primary' : 'text-destructive'}`}>
              {trend.isPositive ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{trend.value}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
