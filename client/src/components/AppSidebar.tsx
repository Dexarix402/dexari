import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, ArrowUpRight, ArrowDownLeft, History, Zap, Activity } from "lucide-react";
import { AgentAvatar } from "./AgentAvatar";

interface AppSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const mainNav = [
  { title: "Dashboard", url: "/", icon: Home },
  { title: "Live Monitor", url: "/live", icon: Activity },
  { title: "Send Payment", url: "/send", icon: ArrowUpRight },
  { title: "Request Payment", url: "/request", icon: ArrowDownLeft },
  { title: "History", url: "/history", icon: History },
];

export function AppSidebar({ currentPath, onNavigate }: AppSidebarProps) {
  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src="/logo-white.png" 
            alt="DXRI Logo" 
            className="h-8 dark:block hidden"
          />
          <img 
            src="/logo-black.png" 
            alt="DXRI Logo" 
            className="h-8 dark:hidden block"
          />
          <div>
            <h2 className="font-display font-bold text-lg">$DXRI</h2>
            <p className="text-xs text-muted-foreground">Agent Payments</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNav.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onNavigate(item.url)}
                    isActive={currentPath === item.url}
                    data-testid={`nav-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 p-2 rounded-md hover-elevate cursor-pointer" data-testid="user-profile">
          <AgentAvatar 
            address="9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM" 
            name="My Wallet" 
            size="sm"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">My Wallet</p>
            <p className="text-xs text-muted-foreground truncate">9WzD...AWWM</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
