import { TransactionCard } from '../TransactionCard'

export default function TransactionCardExample() {
  return (
    <div className="space-y-3">
      <TransactionCard
        id="1"
        type="sent"
        agent={{ address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", name: "Solana Token Analyzer" }}
        amount="250.00"
        currency="USDC"
        status="confirmed"
        timestamp={new Date(Date.now() - 1000 * 60 * 30)}
        onClick={() => console.log('Transaction clicked')}
      />
      <TransactionCard
        id="2"
        type="received"
        agent={{ address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", name: "NFT Collection Scanner" }}
        amount="500.00"
        currency="USDC"
        status="processing"
        timestamp={new Date(Date.now() - 1000 * 60 * 60 * 2)}
        onClick={() => console.log('Transaction clicked')}
      />
      <TransactionCard
        id="3"
        type="sent"
        agent={{ address: "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB" }}
        amount="100.50"
        currency="USDC"
        status="pending"
        timestamp={new Date(Date.now() - 1000 * 60 * 15)}
        onClick={() => console.log('Transaction clicked')}
      />
    </div>
  )
}
