import { AgentCard } from '../AgentCard'

export default function AgentCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <AgentCard
        agent={{
          address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
          name: "Solana Token Analyzer",
          totalSent: "1,250",
          totalReceived: "890",
          lastTransaction: "30 mins ago"
        }}
        onQuickPay={() => console.log('Quick pay to Alice')}
        onViewDetails={() => console.log('View Alice details')}
      />
      <AgentCard
        agent={{
          address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
          name: "NFT Collection Scanner",
          totalSent: "500",
          totalReceived: "1,200",
          lastTransaction: "2 hours ago"
        }}
        onQuickPay={() => console.log('Quick pay to Bob')}
        onViewDetails={() => console.log('View Bob details')}
      />
      <AgentCard
        agent={{
          address: "C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6",
          name: "Wallet Activity Monitor",
          totalSent: "0",
          totalReceived: "350",
          lastTransaction: "1 day ago"
        }}
        onQuickPay={() => console.log('Quick pay to Charlie')}
        onViewDetails={() => console.log('View Charlie details')}
      />
    </div>
  )
}
