import { PaymentVolumeChart } from '../PaymentVolumeChart'

export default function PaymentVolumeChartExample() {
  const mockData = [
    { date: "Mon", sent: 120, received: 80 },
    { date: "Tue", sent: 200, received: 150 },
    { date: "Wed", sent: 180, received: 220 },
    { date: "Thu", sent: 250, received: 180 },
    { date: "Fri", sent: 300, received: 250 },
    { date: "Sat", sent: 180, received: 200 },
    { date: "Sun", sent: 220, received: 190 },
  ]

  return <PaymentVolumeChart data={mockData} />
}
