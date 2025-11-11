import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Copy, QrCode, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WalletRequiredDialog } from "@/components/WalletRequiredDialog";

export default function RequestPaymentPage() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [copied, setCopied] = useState(false);
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const { toast } = useToast();
  
  const myAddress = "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM";

  const copyAddress = () => {
    navigator.clipboard.writeText(myAddress);
    setCopied(true);
    toast({
      title: "Address copied",
      description: "Solana wallet address copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const generateRequest = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }
    
    setShowWalletDialog(true);
    console.log('Generating payment request:', { amount, description });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6" data-testid="page-request-payment">
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
          <h1 className="text-3xl font-display font-bold mb-1">Request Payment</h1>
          <p className="text-muted-foreground">Generate a payment request for other agents</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Agent Address</CardTitle>
            <CardDescription>Share this address to receive payments</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
            <div className="flex items-center justify-center p-8 bg-muted rounded-md">
              <div className="p-6 bg-white rounded-md">
                <QrCode className="h-32 w-32 text-black" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Address</Label>
              <div className="flex gap-2">
                <Input
                  value={myAddress}
                  readOnly
                  className="font-mono text-sm"
                  data-testid="input-address"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyAddress}
                  data-testid="button-copy-address"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Payment Request</CardTitle>
            <CardDescription>Specify amount and details for your request</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="request-amount">Amount (USDC)</Label>
              <Input
                id="request-amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                data-testid="input-request-amount"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Payment for..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                data-testid="input-description"
              />
            </div>

            <Button 
              className="w-full" 
              onClick={generateRequest}
              disabled={!amount}
              data-testid="button-generate-request"
            >
              Generate Request
            </Button>

            {amount && (
              <div className="p-4 bg-muted rounded-md space-y-2">
                <p className="text-sm text-muted-foreground">Request Summary</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Amount</span>
                  <span className="font-display font-semibold">{amount} USDC</span>
                </div>
                {description && (
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-sm text-muted-foreground">For</span>
                    <span className="text-sm text-right flex-1">{description}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Payment Requests</CardTitle>
          <CardDescription>Your pending payment requests</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          <div className="text-center py-8 text-muted-foreground">
            No active payment requests
          </div>
        </CardContent>
      </Card>

      <WalletRequiredDialog open={showWalletDialog} onOpenChange={setShowWalletDialog} />
    </div>
  );
}
