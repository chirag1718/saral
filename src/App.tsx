import Navbar from './components/layout/Navbar'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from './components/layout/Sidebar'
import Dashboard from './components/features/dashboard/Dashboard'
import { TooltipProvider } from './components/ui/tooltip'


const App = () => {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className='flex h-screen w-full bg-white'>
          {/* sidebar */}
          <AppSidebar />
          <div className='flex flex-col flex-1 overflow-hidden w-full'>
            {/* navbar */}
            <Navbar />
            {/* dashboard */}
            <main className='h-full w-full flex items-start justify-center overflow-y-auto'>
              <Dashboard />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  )
}

export default App