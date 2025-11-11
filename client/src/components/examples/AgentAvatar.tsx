import { AgentAvatar } from '../AgentAvatar'

export default function AgentAvatarExample() {
  return (
    <div className="flex gap-4 items-center">
      <AgentAvatar address="9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM" name="Solana Token Analyzer" size="sm" />
      <AgentAvatar address="HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH" name="NFT Collection Scanner" size="md" />
      <AgentAvatar address="JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB" size="lg" />
    </div>
  )
}
