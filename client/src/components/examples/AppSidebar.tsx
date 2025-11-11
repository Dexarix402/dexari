import { AppSidebar } from '../AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useState } from 'react'

export default function AppSidebarExample() {
  const [currentPath, setCurrentPath] = useState('/')
  
  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  }

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar currentPath={currentPath} onNavigate={setCurrentPath} />
        <div className="flex-1 p-8">
          <p className="text-muted-foreground">Current path: {currentPath}</p>
        </div>
      </div>
    </SidebarProvider>
  )
}
