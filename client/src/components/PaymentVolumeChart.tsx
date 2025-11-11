import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface PaymentVolumeChartProps {
  data: Array<{
    date: string;
    sent: number;
    received: number;
  }>;
}

export function PaymentVolumeChart({ data }: PaymentVolumeChartProps) {
  return (
    <Card data-testid="chart-payment-volume">
      <CardHeader>
        <CardTitle>Payment Volume (7 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              className="text-xs"
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sent" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              name="Sent"
              dot={{ fill: "hsl(var(--primary))" }}
            />
            <Line 
              type="monotone" 
              dataKey="received" 
              stroke="hsl(var(--chart-2))" 
              strokeWidth={2}
              name="Received"
              dot={{ fill: "hsl(var(--chart-2))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
