import { SidebarTrigger } from "../ui/sidebar"
import NavUserProfile from "../shared/NavUserProfile"
import NotificationDropdown from "../shared/NotificationDropdown"

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-center pl-2 pr-4 sm:pr-5">
      {/* Sidebar Trigger */}
      <SidebarTrigger className="mr-4 text-sidebar-foreground data-[state=open]:text-primary data-[state=open]:bg-secondary hover:text-primary hover:bg-secondary cursor-pointer" />

      <div className="h-full w-full py-2 flex items-center justify-between gap-3 mx-auto">
        {/* Route title */}
        <p className="text-base sm:text-lg font-semibold truncate">Gamification</p>
        <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
          {/* Notification Dropdown */}
          <NotificationDropdown />

          {/* User profile */}
          <NavUserProfile user={{ name: "Chirag Sonar", email: "chirag@getsaral.com", avatar: "https://github.com/shadcn.png" }} />
        </div>
      </div>
    </nav>
  )
}

export default Navbar