import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface ConnectWalletButtonProps {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function ConnectWalletButton({ variant = "default", size = "default", className }: ConnectWalletButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button 
        variant={variant}
        size={size}
        className={className}
        onClick={() => setShowDialog(true)}
        data-testid="button-connect-wallet"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent data-testid="dialog-coming-soon">
          <AlertDialogHeader>
            <AlertDialogTitle>Coming Soon</AlertDialogTitle>
            <AlertDialogDescription>
              Wallet connection feature is coming soon. This will allow you to connect your Solana wallet to interact with agents and make payments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button onClick={() => setShowDialog(false)} data-testid="button-close-dialog">
              Got it
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
