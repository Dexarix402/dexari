import { ActivityItem } from '../ActivityItem'
import { CheckCircle2, ArrowUpRight, UserPlus } from 'lucide-react'

export default function ActivityItemExample() {
  return (
    <div className="space-y-2">
      <ActivityItem
        icon={CheckCircle2}
        title="Payment Confirmed"
        description="Payment to Alice Agent confirmed on-chain"
        timestamp={new Date(Date.now() - 1000 * 60 * 5)}
      />
      <ActivityItem
        icon={ArrowUpRight}
        title="Payment Sent"
        description="Sent 100 USDC to Bob Agent"
        timestamp={new Date(Date.now() - 1000 * 60 * 15)}
      />
      <ActivityItem
        icon={UserPlus}
        title="New Agent Connected"
        description="Charlie Agent added to your network"
        timestamp={new Date(Date.now() - 1000 * 60 * 45)}
      />
    </div>
  )
}
