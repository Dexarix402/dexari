import { PaymentStatusBadge } from '../PaymentStatusBadge'

export default function PaymentStatusBadgeExample() {
  return (
    <div className="flex gap-3 flex-wrap">
      <PaymentStatusBadge status="pending" />
      <PaymentStatusBadge status="processing" />
      <PaymentStatusBadge status="confirmed" />
      <PaymentStatusBadge status="failed" />
    </div>
  )
}
