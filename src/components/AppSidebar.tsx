
import { 
  LayoutDashboard, 
  Function, 
  LineChart, 
  FileText, 
  Settings, 
  BookOpen, 
  Calculator
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger
} from "@/components/ui/sidebar";

import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/"
  },
  {
    title: "Equation Editor",
    icon: Function,
    path: "/equation-editor"
  },
  {
    title: "Function Plotter",
    icon: LineChart,
    path: "/function-plotter"
  },
  {
    title: "Notes",
    icon: FileText,
    path: "/notes"
  },
  {
    title: "Calculator",
    icon: Calculator,
    path: "/calculator"
  }
];

const resourceItems = [
  {
    title: "Documentation",
    icon: BookOpen,
    path: "/documentation"
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings"
  }
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-3">
        <h2 className="text-xl font-bold text-math-primary">Math Forge</h2>
        <p className="text-xs text-muted-foreground">Mathematical Framework</p>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        cn("flex items-center gap-2", isActive && "text-math-primary font-medium")
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Resources</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {resourceItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        cn("flex items-center gap-2", isActive && "text-math-primary font-medium")
                      }
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">v1.0.0</span>
          <SidebarTrigger className="p-1 rounded-sm hover:bg-accent">
            <span className="sr-only">Toggle Sidebar</span>
          </SidebarTrigger>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
