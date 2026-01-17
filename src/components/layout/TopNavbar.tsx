import { Bell, ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const environments = ["Production", "Staging", "Development"];
const projects = ["cloudops-api", "frontend-app", "data-pipeline"];

export function TopNavbar() {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {/* Project Selector */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-secondary rounded hover:bg-accent transition-colors">
            <span>cloudops-api</span>
            <ChevronDown size={14} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {projects.map((project) => (
              <DropdownMenuItem key={project} className="text-sm">
                {project}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Environment Selector */}
        <div className="flex items-center gap-1 bg-secondary rounded p-0.5">
          {environments.map((env, index) => (
            <button
              key={env}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                index === 0
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {env === "Production" ? "Prod" : env === "Development" ? "Dev" : env}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 p-1 rounded hover:bg-secondary transition-colors">
            <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
              <User size={16} className="text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">john@company.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm">Account Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-sm">Team</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-sm text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
