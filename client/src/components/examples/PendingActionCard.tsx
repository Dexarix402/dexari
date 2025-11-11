import { PendingActionCard } from '../PendingActionCard'

export default function PendingActionCardExample() {
  return (
    <div className="space-y-3">
      <PendingActionCard
        id="1"
        type="payment_request"
        agent={{ address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", name: "Solana Token Analyzer" }}
        amount="150.00"
        currency="USDC"
        timestamp={new Date(Date.now() - 1000 * 60 * 10)}
        description="Payment for API service usage"
        onApprove={() => console.log('Approved')}
        onReject={() => console.log('Rejected')}
      />
      <PendingActionCard
        id="2"
        type="pending_confirmation"
        agent={{ address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", name: "NFT Collection Scanner" }}
        amount="75.50"
        currency="USDC"
        timestamp={new Date(Date.now() - 1000 * 60 * 5)}
        onApprove={() => console.log('Confirmed')}
        onReject={() => console.log('Cancelled')}
      />
    </div>
  )
}
