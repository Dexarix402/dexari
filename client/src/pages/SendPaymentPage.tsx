import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AgentAvatar } from "@/components/AgentAvatar";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { WalletRequiredDialog } from "@/components/WalletRequiredDialog";

type Step = "enter" | "confirm" | "processing" | "success";

export default function SendPaymentPage() {
  const [step, setStep] = useState<Step>("enter");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [showWalletDialog, setShowWalletDialog] = useState(false);

  const handleSend = () => {
    setShowWalletDialog(true);
    console.log('Sending payment:', { recipient, amount, note });
  };

  const getProgress = () => {
    switch (step) {
      case "enter": return 33;
      case "confirm": return 66;
      case "processing": return 90;
      case "success": return 100;
      default: return 0;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6" data-testid="page-send-payment">
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
          <h1 className="text-3xl font-display font-bold mb-1">Send Payment</h1>
          <p className="text-muted-foreground">Transfer funds to another agent on the network</p>
        </div>
      </div>

      <Progress value={getProgress()} className="h-1" />

      <Card>
        <CardHeader>
          <CardTitle>
            {step === "enter" && "Enter Details"}
            {step === "confirm" && "Confirm Payment"}
            {step === "processing" && "Processing..."}
            {step === "success" && "Payment Sent!"}
          </CardTitle>
          <CardDescription>
            {step === "enter" && "Enter the recipient address and amount"}
            {step === "confirm" && "Review your payment details"}
            {step === "processing" && "Confirming transaction on-chain"}
            {step === "success" && "Your payment has been successfully sent"}
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
          {step === "enter" && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Address</Label>
                <Input
                  id="recipient"
                  placeholder="0x..."
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  data-testid="input-recipient"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (USDC)</Label>
                <div className="flex gap-2">
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    data-testid="input-amount"
                  />
                  <Button variant="outline" onClick={() => setAmount("100")} data-testid="button-quick-100">
                    100
                  </Button>
                  <Button variant="outline" onClick={() => setAmount("500")} data-testid="button-quick-500">
                    500
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Note (optional)</Label>
                <Input
                  id="note"
                  placeholder="Payment for..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  data-testid="input-note"
                />
              </div>

              <Button 
                className="w-full gap-2" 
                onClick={() => setStep("confirm")}
                disabled={!recipient || !amount}
                data-testid="button-continue"
              >
                Continue
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {step === "confirm" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-muted rounded-md">
                <AgentAvatar address={recipient} size="lg" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Sending to</p>
                  <p className="font-mono text-sm">{recipient}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Amount</span>
                  <span className="font-display font-semibold text-2xl">{amount} USDC</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span>~0.50 USDC</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-display font-bold text-xl">{parseFloat(amount) + 0.5} USDC</span>
                </div>
              </div>

              {note && (
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm text-muted-foreground">Note</p>
                  <p className="text-sm">{note}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep("enter")} className="flex-1" data-testid="button-back">
                  Back
                </Button>
                <Button onClick={handleSend} className="flex-1 gap-2" data-testid="button-confirm">
                  Send Payment
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          {step === "processing" && (
            <div className="py-12 text-center">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Processing Payment</h3>
              <p className="text-muted-foreground">Confirming transaction on the blockchain...</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-12 text-center space-y-6">
              <div className="inline-flex p-4 bg-primary/10 rounded-full">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Payment Successful!</h3>
                <p className="text-muted-foreground mb-4">Your payment of {amount} USDC has been sent</p>
                <p className="text-sm text-muted-foreground font-mono">
                  TX: 0x1234...5678
                </p>
              </div>
              <Button onClick={() => {
                setStep("enter");
                setRecipient("");
                setAmount("");
                setNote("");
              }} data-testid="button-new-payment">
                Send Another Payment
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <WalletRequiredDialog open={showWalletDialog} onOpenChange={setShowWalletDialog} />
    </div>
  );
}
