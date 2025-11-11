import { QuickActionsCard } from '../QuickActionsCard'

export default function QuickActionsCardExample() {
  return (
    <QuickActionsCard
      onSend={() => console.log('Send clicked')}
      onReceive={() => console.log('Receive clicked')}
      onHistory={() => console.log('History clicked')}
      onConnect={() => console.log('Connect wallet clicked')}
    />
  )
}
