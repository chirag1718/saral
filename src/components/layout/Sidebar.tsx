import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    useSidebar,
} from "@/components/ui/sidebar"
import { Home, Brain, BriefcaseBusiness, ClipboardList, Wallet, User } from "lucide-react"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Insights", icon: Brain, href: "/" },
    { label: "Gamification", icon: BriefcaseBusiness, href: "/" },
    { label: "Applications", icon: ClipboardList, href: "/" },
    { label: "Payments", icon: Wallet, href: "/" },
]

export function AppSidebar() {
    const { state } = useSidebar()
    const isCollapsed = state === "collapsed"

    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div
                    className={`flex items-center justify-normal ${isCollapsed ? "" : "gap-4"
                        }`}
                >
                    <Avatar className="size-8!">
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {!isCollapsed && (
                        <p className="text-lg font-semibold shrink-0">Chirag Sonar</p>
                    )}
                </div>
            </SidebarHeader>
            <Separator className="bg-primary/20 h-1 w-full" />
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navItems.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={item.label === "Gamification"}
                                        className="focus:ring-1 focus:ring-primary/30 focus:text-primary focus:bg-white transition-colors duration-150"
                                    >
                                        <a
                                            href={item.href}
                                            className={
                                                isCollapsed
                                                    ? "flex items-center justify-center"
                                                    : "flex items-center gap-2"
                                            }
                                        >
                                            <item.icon className="size-4!" />
                                            {!isCollapsed && (
                                                <span className="text-sm">{item.label}</span>
                                            )}
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            <Separator className="bg-primary/20 h-1 w-full" />
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="focus:ring-1 focus:ring-accent">
                            <a
                                href="/"
                                className={
                                    isCollapsed
                                        ? "flex items-center justify-center"
                                        : "flex items-center gap-2"
                                }
                            >
                                <User />
                                {!isCollapsed && <span>Settings</span>}
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}