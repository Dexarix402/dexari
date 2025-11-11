import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { StatCard } from "@/components/StatCard";
import { Activity, TrendingUp, Clock, AlertCircle } from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function ApiUsageDashboard() {
  // Mock data for API calls over time
  const apiCallsData = [
    { date: "Jan 1", calls: 245, success: 238, failed: 7 },
    { date: "Jan 2", calls: 312, success: 305, failed: 7 },
    { date: "Jan 3", calls: 289, success: 280, failed: 9 },
    { date: "Jan 4", calls: 401, success: 392, failed: 9 },
    { date: "Jan 5", calls: 356, success: 348, failed: 8 },
    { date: "Jan 6", calls: 428, success: 415, failed: 13 },
    { date: "Jan 7", calls: 495, success: 485, failed: 10 },
  ];

  // Mock data for endpoint usage
  const endpointData = [
    { endpoint: "/analyze", calls: 1245 },
    { endpoint: "/scan", calls: 892 },
    { endpoint: "/monitor", calls: 756 },
    { endpoint: "/swap", calls: 634 },
    { endpoint: "/deploy", calls: 423 },
  ];

  // Mock data for status codes
  const statusData = [
    { name: "Success (200)", value: 2863, color: "hsl(var(--primary))" },
    { name: "Created (201)", value: 234, color: "hsl(142 76% 36%)" },
    { name: "Bad Request (400)", value: 45, color: "hsl(48 96% 53%)" },
    { name: "Error (500)", value: 52, color: "hsl(var(--destructive))" },
  ];

  // Mock data for response times
  const responseTimeData = [
    { time: "00:00", avgMs: 145 },
    { time: "04:00", avgMs: 132 },
    { time: "08:00", avgMs: 178 },
    { time: "12:00", avgMs: 245 },
    { time: "16:00", avgMs: 289 },
    { time: "20:00", avgMs: 198 },
    { time: "23:00", avgMs: 156 },
  ];

  // Mock data for agent usage
  const agentUsageData = [
    { agent: "Token Analyzer", requests: 1456, cost: 728.00 },
    { agent: "NFT Scanner", requests: 892, cost: 223.00 },
    { agent: "Wallet Monitor", requests: 756, cost: 756.00 },
    { agent: "Swap Optimizer", requests: 634, cost: 63.40 },
    { agent: "Gas Tracker", requests: 423, cost: 63.45 },
  ];

  return (
    <div className="space-y-6" data-testid="page-api-usage">
      <div className="flex items-center gap-4">
        <img 
          src="/logo-black.png" 
          alt="DXRI Logo" 
          className="h-8 dark:hidden block"
        />
        <img 
          src="/logo-white.png" 
          alt="DXRI Logo" 
          className="h-8 dark:block hidden"
        />
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">API Usage Dashboard</h1>
          <p className="text-muted-foreground">Monitor your API consumption and performance metrics</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total API Calls"
          value="3,194"
          icon={Activity}
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <StatCard
          title="Success Rate"
          value="97.4%"
          icon={TrendingUp}
          trend={{ value: "+2.1%", isPositive: true }}
        />
        <StatCard
          title="Avg Response Time"
          value="192ms"
          icon={Clock}
          trend={{ value: "-8ms", isPositive: true }}
        />
        <StatCard
          title="Failed Requests"
          value="52"
          icon={AlertCircle}
          trend={{ value: "+5", isPositive: false }}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
          <TabsTrigger value="endpoints" data-testid="tab-endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="performance" data-testid="tab-performance">Performance</TabsTrigger>
          <TabsTrigger value="agents" data-testid="tab-agents">Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>API Calls Over Time</CardTitle>
                <CardDescription>Daily API request volume for the past week</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={apiCallsData}>
                    <defs>
                      <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="date" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calls" 
                      stroke="hsl(var(--primary))" 
                      fill="url(#colorCalls)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Code Distribution</CardTitle>
                <CardDescription>Response status breakdown</CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))', 
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '6px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Success vs Failed Requests</CardTitle>
              <CardDescription>Comparison of successful and failed API calls</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={apiCallsData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="date" className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="success" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Successful"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="failed" 
                    stroke="hsl(var(--destructive))" 
                    strokeWidth={2}
                    name="Failed"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Endpoint Usage</CardTitle>
              <CardDescription>Most frequently called API endpoints</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={endpointData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis type="number" className="text-xs" />
                  <YAxis dataKey="endpoint" type="category" className="text-xs" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="calls" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Average Response Time</CardTitle>
              <CardDescription>Response time trends throughout the day</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={responseTimeData}>
                  <defs>
                    <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="time" className="text-xs" />
                  <YAxis className="text-xs" label={{ value: 'ms', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="avgMs" 
                    stroke="hsl(var(--primary))" 
                    fill="url(#colorTime)"
                    strokeWidth={2}
                    name="Avg Response Time (ms)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Agent Usage & Costs</CardTitle>
              <CardDescription>API requests and associated costs by agent</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="space-y-4">
                {agentUsageData.map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-md bg-muted">
                    <div className="flex-1">
                      <p className="font-semibold">{agent.agent}</p>
                      <p className="text-sm text-muted-foreground">{agent.requests.toLocaleString()} requests</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display font-bold text-lg text-primary">${agent.cost.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Total cost</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cost Distribution</CardTitle>
              <CardDescription>Spending breakdown by agent service</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={agentUsageData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="agent" className="text-xs" angle={-45} textAnchor="end" height={100} />
                  <YAxis className="text-xs" label={{ value: 'USD', angle: -90, position: 'insideLeft' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
