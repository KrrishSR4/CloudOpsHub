import { useState } from "react";
import {
  LayoutDashboard,
  GitBranch,
  Box,
  Server,
  Activity,
  FileText,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { label: "Overview", icon: LayoutDashboard, href: "/", active: true },
  { label: "CI/CD", icon: GitBranch, href: "/cicd" },
  { label: "Kubernetes", icon: Box, href: "/kubernetes" },
  { label: "Infrastructure", icon: Server, href: "/infrastructure" },
  { label: "Monitoring", icon: Activity, href: "/monitoring" },
  { label: "Logs", icon: FileText, href: "/logs" },
  { label: "Alerts", icon: Bell, href: "/alerts" },
  { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-200",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className="h-14 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-base font-semibold text-foreground">
            CloudOpsHub
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded hover:bg-sidebar-accent text-sidebar-foreground"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={cn(
              "sidebar-nav-item",
              item.active && "sidebar-nav-item-active"
            )}
          >
            <item.icon size={18} />
            {!collapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        {!collapsed && (
          <div className="text-xs text-muted-foreground">
            v2.4.1
          </div>
        )}
      </div>
    </aside>
  );
}
