import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import emptyStateImage from "@assets/generated_images/Empty_state_network_illustration_29983909.png";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  useIllustration?: boolean;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  useIllustration = false,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center" data-testid="empty-state">
      {useIllustration ? (
        <img 
          src={emptyStateImage} 
          alt="Empty state" 
          className="w-48 h-48 mb-6 opacity-50"
        />
      ) : Icon ? (
        <div className="p-4 bg-muted rounded-full mb-4">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>
      ) : null}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} data-testid="button-empty-action">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
