
import { 
  LayoutDashboard, 
  CodeSquare, 
  LineChart, 
  FileText, 
  Settings, 
  BookOpen, 
  Calculator,
  Triangle,
  Compass,
  Square,
  Infinity
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
    icon: CodeSquare,
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

const geometryItems = [
  {
    title: "Sacred Geometry",
    icon: Triangle,
    path: "/sacred-geometry"
  },
  {
    title: "Euclidean Geometry",
    icon: Compass,
    path: "/euclidean-geometry"
  },
  {
    title: "2D Geometry",
    icon: Square,
    path: "/2d-geometry"
  },
  {
    title: "Non-Euclidean Geometry",
    icon: Infinity,
    path: "/non-euclidean-geometry"
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
          <SidebarGroupLabel>Geometry</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {geometryItems.map((item) => (
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
