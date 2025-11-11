import { StatCard } from '../StatCard'
import { ArrowUpRight, ArrowDownLeft, Users, Clock } from 'lucide-react'

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <StatCard
        title="Total Sent"
        value="1,234.56 USDC"
        icon={ArrowUpRight}
        trend={{ value: "+12.5%", isPositive: true }}
      />
      <StatCard
        title="Total Received"
        value="987.32 USDC"
        icon={ArrowDownLeft}
        trend={{ value: "-3.2%", isPositive: false }}
      />
      <StatCard
        title="Active Agents"
        value="24"
        icon={Users}
      />
      <StatCard
        title="Pending"
        value="3"
        icon={Clock}
      />
    </div>
  )
}
