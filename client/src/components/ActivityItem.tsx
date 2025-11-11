import { formatDistanceToNow } from "date-fns";
import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  timestamp: Date;
  color?: string;
}

export function ActivityItem({ icon: Icon, title, description, timestamp, color = "text-primary" }: ActivityItemProps) {
  return (
    <div className="flex gap-3 p-3 rounded-md hover-elevate" data-testid="item-activity">
      <div className={`p-2 rounded-md bg-primary/10 h-fit ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{title}</p>
        <p className="text-sm text-muted-foreground truncate">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">
          {formatDistanceToNow(timestamp, { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
