import { WalletBalanceCard } from '../WalletBalanceCard'

export default function WalletBalanceCardExample() {
  return (
    <WalletBalanceCard
      balance="2,845.67"
      currency="USDC"
      change24h={{ value: "+5.2%", isPositive: true }}
      onSend={() => console.log('Send clicked')}
      onReceive={() => console.log('Receive clicked')}
      onHistory={() => console.log('History clicked')}
    />
  )
}
