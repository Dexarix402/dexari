import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Activity, CheckCircle2, Clock, XCircle, AlertCircle, Loader2, Radio } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type TransactionStatus = "pending" | "confirming" | "confirmed" | "failed";

interface LiveTransaction {
  id: string;
  timestamp: number;
  type: "send" | "receive";
  agent: string;
  amount: string;
  status: TransactionStatus;
  from: string;
  to: string;
  signature?: string;
}

const statusConfig = {
  pending: {
    icon: Clock,
    label: "Pending",
    className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    iconClassName: "text-yellow-500"
  },
  confirming: {
    icon: Loader2,
    label: "Confirming",
    className: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    iconClassName: "text-blue-500 animate-spin"
  },
  confirmed: {
    icon: CheckCircle2,
    label: "Confirmed",
    className: "bg-primary/10 text-primary border-primary/20",
    iconClassName: "text-primary"
  },
  failed: {
    icon: XCircle,
    label: "Failed",
    className: "bg-destructive/10 text-destructive border-destructive/20",
    iconClassName: "text-destructive"
  }
};

export default function LiveMonitorPage() {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<LiveTransaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isConnected, setIsConnected] = useState(true);
  const [lastTransactionCount, setLastTransactionCount] = useState(0);

  // Initialize with some transactions
  useEffect(() => {
    const initialTransactions: LiveTransaction[] = [
      {
        id: "tx_001",
        timestamp: Date.now() - 45000,
        type: "send",
        agent: "Solana Token Analyzer",
        amount: "2.50",
        status: "confirmed",
        from: "8zWT...xK9P",
        to: "TOKx...3mLQ",
        signature: "3Kf9...pZ2w"
      },
      {
        id: "tx_002",
        timestamp: Date.now() - 30000,
        type: "receive",
        agent: "NFT Metadata Scanner",
        amount: "1.75",
        status: "confirmed",
        from: "NFTy...8pLm",
        to: "8zWT...xK9P",
        signature: "5Hm2...kL9x"
      },
      {
        id: "tx_003",
        timestamp: Date.now() - 15000,
        type: "send",
        agent: "DEX Swap Optimizer",
        amount: "5.00",
        status: "confirming",
        from: "8zWT...xK9P",
        to: "SWPx...7nQw"
      }
    ];
    setTransactions(initialTransactions);
  }, []);

  // Simulate real-time transaction updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => {
        const updated = prev.map(tx => {
          // Simulate status progression
          if (tx.status === "pending") {
            return { ...tx, status: "confirming" as TransactionStatus };
          }
          if (tx.status === "confirming" && Math.random() > 0.6) {
            const confirmedTx = { 
              ...tx, 
              status: "confirmed" as TransactionStatus,
              signature: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
            };
            
            // Show toast notification when transaction is confirmed
            toast({
              title: "Transaction Confirmed",
              description: `${confirmedTx.agent} - ${confirmedTx.amount} DXRI`,
            });
            
            return confirmedTx;
          }
          return tx;
        });

        // Randomly add new transactions (10% chance every 3 seconds)
        if (Math.random() > 0.9) {
          const agents = [
            "Solana Token Analyzer",
            "NFT Metadata Scanner", 
            "DEX Swap Optimizer",
            "DeFi Yield Tracker",
            "Portfolio Rebalancer",
            "MEV Protection Bot",
            "Gas Fee Optimizer"
          ];
          
          const newTx: LiveTransaction = {
            id: `tx_${Date.now()}`,
            timestamp: Date.now(),
            type: Math.random() > 0.5 ? "send" : "receive",
            agent: agents[Math.floor(Math.random() * agents.length)],
            amount: (Math.random() * 10).toFixed(2),
            status: "pending",
            from: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
            to: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
          };
          
          // Show toast notification for new transaction
          toast({
            title: "New Transaction Detected",
            description: `${newTx.type === "send" ? "Sending" : "Receiving"} ${newTx.amount} DXRI`,
          });
          
          return [newTx, ...updated].slice(0, 50); // Keep max 50 transactions
        }

        return updated;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [toast]);

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setIsConnected(false);
        setTimeout(() => setIsConnected(true), 2000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const stats = {
    total: transactions.length,
    confirmed: transactions.filter(tx => tx.status === "confirmed").length,
    pending: transactions.filter(tx => tx.status === "pending" || tx.status === "confirming").length,
    failed: transactions.filter(tx => tx.status === "failed").length
  };

  return (
    <div className="space-y-6" data-testid="page-live-monitor">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Transaction Monitor</h1>
          <p className="text-muted-foreground mt-1">Real-time transaction tracking and status updates</p>
        </div>
        <div className="flex items-center gap-2">
          <div 
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm font-medium",
              isConnected 
                ? "bg-primary/10 text-primary border-primary/20" 
                : "bg-destructive/10 text-destructive border-destructive/20"
            )}
            data-testid="status-connection"
          >
            <Radio className={cn("h-3.5 w-3.5", isConnected && "animate-pulse")} />
            {isConnected ? "Live" : "Reconnecting..."}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-transactions">{stats.total}</div>
            <p className="text-xs text-muted-foreground mt-1">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary" data-testid="stat-confirmed-transactions">{stats.confirmed}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500" data-testid="stat-pending-transactions">{stats.pending}</div>
            <p className="text-xs text-muted-foreground mt-1">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive" data-testid="stat-failed-transactions">{stats.failed}</div>
            <p className="text-xs text-muted-foreground mt-1">Require attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Transaction Feed</CardTitle>
              <CardDescription className="mt-1">Live updates from the Solana network</CardDescription>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-transactions"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]" data-testid="select-status-filter">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirming">Confirming</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredTransactions.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No transactions found</p>
              </div>
            ) : (
              filteredTransactions.map((tx, index) => {
                const StatusIcon = statusConfig[tx.status].icon;
                return (
                  <div
                    key={tx.id}
                    className={cn(
                      "p-4 hover-elevate transition-all",
                      index === 0 && tx.status === "pending" && "bg-primary/5"
                    )}
                    data-testid={`transaction-${tx.id}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge
                            variant="outline"
                            className={cn("gap-1.5", statusConfig[tx.status].className)}
                          >
                            <StatusIcon className={cn("h-3 w-3", statusConfig[tx.status].iconClassName)} />
                            {statusConfig[tx.status].label}
                          </Badge>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {tx.type === "send" ? "↑ SEND" : "↓ RECEIVE"}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{getTimeAgo(tx.timestamp)}</span>
                        </div>
                        
                        <p className="font-medium mb-1">{tx.agent}</p>
                        
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <div>
                            <span className="text-xs">From:</span>
                            <p className="font-mono text-xs">{tx.from}</p>
                          </div>
                          <div>
                            <span className="text-xs">To:</span>
                            <p className="font-mono text-xs">{tx.to}</p>
                          </div>
                        </div>
                        
                        {tx.signature && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Signature: <span className="font-mono">{tx.signature}</span>
                          </p>
                        )}
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">{tx.amount} DXRI</p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">#{tx.id}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
