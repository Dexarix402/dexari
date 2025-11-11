import { useState } from "react";
import { QuickActionsCard } from "@/components/QuickActionsCard";
import { StatCard } from "@/components/StatCard";
import { MarketplaceAgentCard } from "@/components/MarketplaceAgentCard";
import { PendingActionCard } from "@/components/PendingActionCard";
import { WalletRequiredDialog } from "@/components/WalletRequiredDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ArrowDownLeft, Zap, Clock, Search, SlidersHorizontal } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function DashboardHome() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const mockAgents = [
    {
      id: "1",
      address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
      name: "Solana Token Analyzer",
      description: "Real-time analysis of SPL tokens - Track holders, liquidity pools, and on-chain metrics",
      category: "DeFi & Analytics",
      rating: 5.0,
      reviewCount: 42,
      tags: ["solana", "spl-token", "analytics"],
      price: "0.50",
      priceType: "per-use" as const,
      featured: true
    },
    {
      id: "2",
      address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH",
      name: "NFT Collection Scanner",
      description: "Scan Solana NFT collections for rarity, floor price, and marketplace activity",
      category: "NFT Tools",
      rating: 4.8,
      reviewCount: 28,
      tags: ["nft", "solana", "magic-eden"],
      price: "0.25",
      priceType: "per-use" as const
    },
    {
      id: "3",
      address: "C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6",
      name: "Wallet Activity Monitor",
      description: "Track any Solana wallet's transaction history, token holdings, and DeFi positions",
      category: "DeFi & Analytics",
      rating: 5.0,
      reviewCount: 56,
      tags: ["wallet", "monitoring", "defi"],
      price: "1.00",
      priceType: "per-use" as const
    },
    {
      id: "4",
      address: "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB",
      name: "Jupiter Swap Optimizer",
      description: "Find the best swap routes on Jupiter with real-time price impact analysis",
      category: "DeFi & Analytics",
      rating: 4.9,
      reviewCount: 67,
      tags: ["jupiter", "swap", "dex"],
      price: "0.10",
      priceType: "per-use" as const,
      featured: true
    },
    {
      id: "5",
      address: "TRDwq3BN4mP68GSFjvYJUmEtFLN6gvjRDvjU8YwZqeL",
      name: "Telegram Trading Bot",
      description: "Automated Solana trading bot for Telegram with limit orders and stop-loss features",
      category: "Trading Bots",
      rating: 5.0,
      reviewCount: 91,
      tags: ["telegram", "trading", "automation"],
      price: "15.00",
      priceType: "one-time" as const
    },
    {
      id: "6",
      address: "DEPLoYT7qK4WrKhKSMjvLnR4z8fJ9kqPvVXmKmWy3nB",
      name: "Smart Contract Deployer",
      description: "Deploy and verify Solana programs with automated testing and security checks",
      category: "Developer Tools",
      rating: 4.7,
      reviewCount: 34,
      tags: ["deployment", "anchor", "verification"],
      price: "2.00",
      priceType: "per-use" as const
    },
    {
      id: "7",
      address: "RAYDiuM675SUiXXPaGWtXWZwJ5r8vN6Y2cLGxfLpump",
      name: "Raydium Pool Finder",
      description: "Discover new liquidity pools on Raydium with APR calculations and risk metrics",
      category: "DeFi & Analytics",
      rating: 4.6,
      reviewCount: 23,
      tags: ["raydium", "liquidity", "pools"],
      price: "0.75",
      priceType: "per-use" as const,
      featured: true
    },
    {
      id: "8",
      address: "GASFeEZqApx8iF7TG7FpBGrx2hnxWbYE9qzZNa8PUMP",
      name: "Solana Gas Tracker",
      description: "Monitor network congestion and get optimal transaction timing recommendations",
      category: "Network Tools",
      rating: 4.5,
      reviewCount: 19,
      tags: ["gas", "network", "optimization"],
      price: "0.15",
      priceType: "per-use" as const
    },
  ];

  const mockPendingActions = [
    {
      id: "1",
      type: "payment_request" as const,
      agent: { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", name: "Solana Token Analyzer" },
      amount: "0.50",
      currency: "USDC",
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      description: "Token analysis request for 5 SPL tokens"
    },
    {
      id: "2",
      type: "pending_confirmation" as const,
      agent: { address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", name: "NFT Collection Scanner" },
      amount: "0.25",
      currency: "USDC",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
  ];

  const filteredAgents = mockAgents.filter(agent => {
    const matchesSearch = searchQuery === "" || 
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || agent.category === categoryFilter;
    const matchesTab = activeTab === "all" || 
      (activeTab === "featured" && agent.featured) ||
      (activeTab === "defi" && agent.category === "DeFi & Analytics") ||
      (activeTab === "nft" && agent.category === "NFT Tools") ||
      (activeTab === "trading" && agent.category === "Trading Bots") ||
      (activeTab === "dev" && agent.category === "Developer Tools");
    return matchesSearch && matchesCategory && matchesTab;
  });

  const handleQuickPay = (agentName: string) => {
    setShowWalletDialog(true);
    console.log('Quick pay to:', agentName);
  };

  const handleViewAgent = (agentName: string) => {
    toast({
      title: "View Agent",
      description: `Opening details for ${agentName}...`,
    });
    console.log('View agent:', agentName);
  };

  const handleApproveAction = (id: string) => {
    setShowWalletDialog(true);
    console.log('Approved action:', id);
  };

  const handleRejectAction = (id: string) => {
    toast({
      title: "Action Declined",
      description: "The request has been declined.",
    });
    console.log('Rejected action:', id);
  };

  return (
    <div className="space-y-6" data-testid="page-dashboard">
      <div className="flex items-center gap-4">
        <img 
          src="/logo-black.png" 
          alt="DXRI Logo" 
          className="h-10 dark:hidden block"
        />
        <img 
          src="/logo-white.png" 
          alt="DXRI Logo" 
          className="h-10 dark:block hidden"
        />
        <div>
          <h1 className="text-3xl font-display font-bold mb-1">Solana Agent Marketplace</h1>
          <p className="text-muted-foreground">Discover and pay for Solana utilities and automation tools</p>
        </div>
      </div>

      <QuickActionsCard
        onSend={() => setShowWalletDialog(true)}
        onReceive={() => setShowWalletDialog(true)}
        onHistory={() => console.log('Navigate to history')}
        onConnect={() => setShowWalletDialog(true)}
      />

      <WalletRequiredDialog open={showWalletDialog} onOpenChange={setShowWalletDialog} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Spent"
          value="45.50 USDC"
          icon={ArrowUpRight}
          trend={{ value: "+8 uses", isPositive: true }}
        />
        <StatCard
          title="Services Used"
          value="24"
          icon={Zap}
          trend={{ value: "+3 this week", isPositive: true }}
        />
        <StatCard
          title="Favorite Tools"
          value="6"
          icon={ArrowDownLeft}
        />
        <StatCard
          title="Pending Requests"
          value={mockPendingActions.length.toString()}
          icon={Clock}
        />
      </div>

      {mockPendingActions.length > 0 && (
        <Card className="border-primary/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Pending Actions
            </CardTitle>
            <span className="text-sm text-muted-foreground">{mockPendingActions.length} items</span>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockPendingActions.map((action) => (
                <PendingActionCard
                  key={action.id}
                  {...action}
                  onApprove={() => handleApproveAction(action.id)}
                  onReject={() => handleRejectAction(action.id)}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Browse Solana Agents</CardTitle>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-agents"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40" data-testid="select-category">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="DeFi & Analytics">DeFi & Analytics</SelectItem>
                  <SelectItem value="NFT Tools">NFT Tools</SelectItem>
                  <SelectItem value="Trading Bots">Trading Bots</SelectItem>
                  <SelectItem value="Developer Tools">Developer Tools</SelectItem>
                  <SelectItem value="Network Tools">Network Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
              <TabsTrigger value="featured" data-testid="tab-featured">Featured</TabsTrigger>
              <TabsTrigger value="defi" data-testid="tab-defi">DeFi</TabsTrigger>
              <TabsTrigger value="nft" data-testid="tab-nft">NFT</TabsTrigger>
              <TabsTrigger value="trading" data-testid="tab-trading">Trading</TabsTrigger>
              <TabsTrigger value="dev" data-testid="tab-dev">Dev Tools</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAgents.map((agent) => (
              <MarketplaceAgentCard
                key={agent.id}
                agent={agent}
                onView={() => handleViewAgent(agent.name)}
                onQuickPay={() => handleQuickPay(agent.name)}
              />
            ))}
          </div>

          {filteredAgents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No agents found matching your criteria</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
