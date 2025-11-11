import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface WalletRequiredDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WalletRequiredDialog({ open, onOpenChange }: WalletRequiredDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent data-testid="dialog-wallet-required">
        <AlertDialogHeader>
          <AlertDialogTitle>Connect Wallet Required</AlertDialogTitle>
          <AlertDialogDescription>
            Please connect your Solana wallet to perform this action. Wallet connection feature is coming soon.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={() => onOpenChange(false)} data-testid="button-close-wallet-dialog">
            Got it
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
