import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TransactionCard } from "@/components/TransactionCard";
import { EmptyState } from "@/components/EmptyState";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, Inbox } from "lucide-react";

export default function TransactionHistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const mockTransactions = [
    {
      id: "1",
      type: "sent" as const,
      agent: { address: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM", name: "Solana Token Analyzer" },
      amount: "250.00",
      currency: "USDC",
      status: "confirmed" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "2",
      type: "received" as const,
      agent: { address: "HN7cABqLq46Es1jh92dQQisAq662SmxELLLsHHe4YWrH", name: "NFT Collection Scanner" },
      amount: "500.00",
      currency: "USDC",
      status: "confirmed" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: "3",
      type: "sent" as const,
      agent: { address: "JUP4Fb2cqiRUcaTHdrPC8h2gNsA2ETXiPDD33WcGuJB" },
      amount: "100.50",
      currency: "USDC",
      status: "processing" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "4",
      type: "received" as const,
      agent: { address: "C6kYXcaRUMqeBF5fhg165RWU7AnpT9z92fvKNoMqjmz6", name: "Wallet Activity Monitor" },
      amount: "75.25",
      currency: "USDC",
      status: "confirmed" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: "5",
      type: "sent" as const,
      agent: { address: "TRDwq3BN4mP68GSFjvYJUmEtFLN6gvjRDvjU8YwZqeL" },
      amount: "200.00",
      currency: "USDC",
      status: "failed" as const,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ];

  const filteredTransactions = mockTransactions.filter(tx => {
    const matchesSearch = searchQuery === "" || 
      tx.agent.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.agent.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || tx.status === statusFilter;
    const matchesType = typeFilter === "all" || tx.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6" data-testid="page-transaction-history">
      <div className="flex items-center justify-between gap-4 flex-wrap">
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
            <h1 className="text-3xl font-display font-bold mb-1">Transaction History</h1>
            <p className="text-muted-foreground">View and filter all your payment transactions</p>
          </div>
        </div>
        <Button variant="outline" className="gap-2" data-testid="button-export">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by agent name or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
                data-testid="input-search"
              />
            </div>
            <div className="flex gap-2">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32" data-testid="select-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-36" data-testid="select-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((tx) => (
              <TransactionCard
                key={tx.id}
                {...tx}
                onClick={() => console.log('Transaction details:', tx.id)}
              />
            ))
          ) : (
            <EmptyState
              icon={Inbox}
              title="No transactions found"
              description="Try adjusting your search or filter criteria"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
