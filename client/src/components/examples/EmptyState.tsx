import { EmptyState } from '../EmptyState'
import { Inbox } from 'lucide-react'

export default function EmptyStateExample() {
  return (
    <div className="space-y-8">
      <EmptyState
        icon={Inbox}
        title="No transactions yet"
        description="Start sending payments to other agents to see your transaction history here."
        actionLabel="Send Payment"
        onAction={() => console.log('Send payment clicked')}
      />
      <EmptyState
        useIllustration
        title="No network connections"
        description="Connect with other agents to enable peer-to-peer payments across the network."
        actionLabel="Explore Agents"
        onAction={() => console.log('Explore clicked')}
      />
    </div>
  )
}
