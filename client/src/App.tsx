import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ConnectWalletButton } from "@/components/ConnectWalletButton";
import DashboardHome from "@/pages/DashboardHome";
import LiveMonitorPage from "@/pages/LiveMonitorPage";
import SendPaymentPage from "@/pages/SendPaymentPage";
import RequestPaymentPage from "@/pages/RequestPaymentPage";
import TransactionHistoryPage from "@/pages/TransactionHistoryPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardHome} />
      <Route path="/live" component={LiveMonitorPage} />
      <Route path="/send" component={SendPaymentPage} />
      <Route path="/request" component={RequestPaymentPage} />
      <Route path="/history" component={TransactionHistoryPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location, setLocation] = useLocation();

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SidebarProvider style={style as React.CSSProperties}>
          <div className="flex h-screen w-full">
            <AppSidebar currentPath={location} onNavigate={setLocation} />
            <div className="flex flex-col flex-1 overflow-hidden">
              <header className="flex items-center justify-between gap-3 p-4 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <div className="flex items-center gap-3">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <img 
                    src="/logo-black.png" 
                    alt="DXRI Logo" 
                    className="h-6 dark:hidden block"
                  />
                  <img 
                    src="/logo-white.png" 
                    alt="DXRI Logo" 
                    className="h-6 dark:block hidden"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <ConnectWalletButton variant="default" size="sm" />
                  <ThemeToggle />
                </div>
              </header>
              <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                <Router />
              </main>
            </div>
          </div>
        </SidebarProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
