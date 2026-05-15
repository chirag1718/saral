"use client"

import {
    Bell,
    Check,
    Clock,
    AlertCircle,
    Info,
    Trash2,
    CheckCheck,
} from "lucide-react"

import {
    Button,
} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Notification {
    id: string
    title: string
    message: string
    type: "success" | "pending" | "error" | "info"
    timestamp: string
    read: boolean
}

const SAMPLE_NOTIFICATIONS: Notification[] = [
    {
        id: "1",
        title: "Upload Complete",
        message: "Your document has been successfully uploaded",
        type: "success",
        timestamp: "2 minutes ago",
        read: false,
    },
    {
        id: "2",
        title: "Processing",
        message: "Your request is being processed",
        type: "pending",
        timestamp: "15 minutes ago",
        read: false,
    },
    {
        id: "3",
        title: "System Alert",
        message: "Scheduled maintenance tonight at 2 AM",
        type: "info",
        timestamp: "1 hour ago",
        read: true,
    },
]

function NotificationIcon({ type }: { type: Notification["type"] }) {
    switch (type) {
        case "success":
            return <Check className="h-4 w-4 text-green-600" />
        case "pending":
            return <Clock className="h-4 w-4 text-yellow-600" />
        case "error":
            return <AlertCircle className="h-4 w-4 text-red-600" />
        case "info":
            return <Info className="h-4 w-4 text-blue-600" />
    }
}

export default function NotificationDropdown() {
    const unreadCount = SAMPLE_NOTIFICATIONS.filter(
        (n) => !n.read
    ).length

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative size-8 shrink-0 cursor-pointer">
                    <Bell className="size-4.5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 text-[0.5rem]/1.5 bg-red-500 text-white rounded-full p-0.75">
                            {unreadCount}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-80 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="flex items-center justify-between px-2 py-1.5">
                    <span className="font-semibold">Notifications</span>
                    {unreadCount > 0 && (
                        <span className="text-xs bg-primary/10 text-primary rounded-full px-2 py-1">
                            {unreadCount} new
                        </span>
                    )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <div className="max-h-96 overflow-y-auto">
                    {SAMPLE_NOTIFICATIONS.length > 0 ? (
                        <DropdownMenuGroup className="space-y-1">
                            {SAMPLE_NOTIFICATIONS.map((notification) => (
                                <DropdownMenuItem
                                    key={notification.id}
                                    className={`flex flex-col gap-1 px-3 py-2.5 cursor-pointer rounded-none hover:bg-secondary/50 ${!notification.read ? "bg-primary/5" : ""
                                        }`}
                                >
                                    <div className="flex items-start gap-2 w-full">
                                        <div className="shrink-0 mt-0.5">
                                            <NotificationIcon type={notification.type} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <p className="text-sm font-medium truncate">
                                                    {notification.title}
                                                </p>
                                                {!notification.read && (
                                                    <div className="shrink-0 w-2 h-2 bg-primary rounded-full mt-1.5" />
                                                )}
                                            </div>
                                            <p className="text-xs text-muted-foreground line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-xs text-muted-foreground/70 mt-1">
                                                {notification.timestamp}
                                            </p>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-muted-foreground">
                                No notifications yet
                            </p>
                        </div>
                    )}
                </div>

                <DropdownMenuSeparator />

                <DropdownMenuGroup className="*:cursor-pointer">
                    <DropdownMenuItem className="text-xs">
                        <CheckCheck className="h-4 w-4" />
                        Mark all as read
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                        Clear all
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}