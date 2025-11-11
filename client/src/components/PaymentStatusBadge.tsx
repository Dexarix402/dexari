import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";

export type PaymentStatus = "pending" | "confirmed" | "failed" | "processing";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20",
  },
  processing: {
    label: "Processing",
    icon: Loader2,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  },
  confirmed: {
    label: "Confirmed",
    icon: CheckCircle2,
    className: "bg-primary/10 text-primary border-primary/20",
  },
  failed: {
    label: "Failed",
    icon: XCircle,
    className: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge variant="outline" className={config.className} data-testid={`badge-status-${status}`}>
      <Icon className={`h-3 w-3 mr-1 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {config.label}
    </Badge>
  );
}
