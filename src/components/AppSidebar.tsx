"use client";

import {
  Settings,
  Search,
  User,
  LogOut,
  ChevronUp,
  Bot,
  Sparkles,
  Info,
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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menu items
const navigationItems = [
  {
    title: "Agente ITFolks",
    url: "/",
    icon: Search,
    tooltip: "Configure e execute buscas personalizadas",
  },
];

const userData = {
  name: "João Silva",
  email: "joao.silva@empresa.com",
  avatar: "",
  role: "Administrador",
  status: "online" as const,
};

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 px-2 py-3">
              <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ebff95] to-[#d4f564] shadow-lg">
                <Bot className="size-5 text-gray-800" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-lg">SearchBot</span>
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs text-muted-foreground">
                    Agente Inteligente
                  </span>
                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                    <Sparkles className="w-2.5 h-2.5 mr-1" />
                    AI
                  </Badge>
                </div>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
            Ferramentas
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton
                          asChild
                          className={`relative group transition-all duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-[#ebff95]/25 to-[#ebff95]/10 dark:from-[#ebff95]/15 dark:to-[#ebff95]/5 text-[#4a5d23] dark:text-[#ebff95] border border-[#ebff95]/40 dark:border-[#ebff95]/30 font-medium shadow-md"
                              : "hover:bg-accent/50 hover:shadow-sm"
                          }`}
                        >
                          <Link
                            href={item.url}
                            className="flex items-center gap-4 p-3 rounded-lg"
                          >
                            <div
                              className={`p-2 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? "bg-[#ebff95]/30 dark:bg-[#ebff95]/20 shadow-sm"
                                  : "bg-accent/20 group-hover:bg-accent/40"
                              }`}
                            >
                              <item.icon
                                className={`size-5 transition-colors ${
                                  isActive
                                    ? "text-[#4a5d23] dark:text-[#ebff95]"
                                    : "text-muted-foreground group-hover:text-foreground"
                                }`}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`text-sm font-semibold leading-tight ${
                                    isActive
                                      ? "text-[#4a5d23] dark:text-[#ebff95]"
                                      : "text-foreground"
                                  }`}
                                >
                                  {item.title}
                                </div>
                                <Info
                                  className={`size-3 transition-colors ${
                                    isActive
                                      ? "text-[#4a5d23]/60 dark:text-[#ebff95]/70"
                                      : "text-muted-foreground/60"
                                  }`}
                                />
                              </div>
                            </div>
                            {isActive && (
                              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#ebff95] dark:bg-[#ebff95] rounded-r-full shadow-sm" />
                            )}
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right" align="center">
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
            Configurações
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton className="p-4 hover:bg-accent/50 transition-all duration-200 h-auto">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Settings className="size-4 text-muted-foreground" />
                  </div>
                  <span className="text-sm font-medium">Preferências</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-accent/20">
                      <div className="size-3 rounded-full bg-gradient-to-r from-orange-400 to-purple-500 shadow-sm" />
                    </div>
                    <span className="text-sm font-medium">Tema</span>
                  </div>
                  <ModeToggle />
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40 pt-4 pb-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="p-4 hover:bg-accent/50 transition-all duration-200 h-auto">
                  <div className="flex items-center gap-4 flex-1 w-full">
                    <div className="relative flex-shrink-0">
                      <Avatar className="size-10 ring-2 ring-[#ebff95]/30 shadow-md">
                        <AvatarImage
                          src={userData.avatar}
                          alt={userData.name}
                        />
                        <AvatarFallback className="bg-gradient-to-br from-[#ebff95] to-[#d4f564] text-gray-800 font-semibold text-sm">
                          {userData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 size-3 rounded-full ring-2 ring-background shadow-sm ${
                          userData.status === "online"
                            ? "bg-green-500"
                            : "bg-gray-400"
                        }`}
                      />
                    </div>
                    <div className="flex-1 text-left overflow-hidden min-w-0">
                      <p className="text-sm font-medium leading-tight truncate">
                        {userData.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-1">
                        {userData.email}
                      </p>
                    </div>
                    <ChevronUp className="size-4 text-muted-foreground flex-shrink-0" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                align="end"
                className="w-64 p-2"
                sideOffset={8}
              >
                <div className="flex items-center gap-3 p-2 mb-2">
                  <Avatar className="size-10">
                    <AvatarImage src={userData.avatar} alt={userData.name} />
                    <AvatarFallback className="bg-gradient-to-br from-[#ebff95] to-[#d4f564] text-gray-800 font-semibold">
                      {userData.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{userData.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {userData.email}
                    </p>
                    <Badge variant="outline" className="text-xs mt-1">
                      {userData.role}
                    </Badge>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                  <User className="size-4" />
                  <span>Meu Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
                  <Settings className="size-4" />
                  <span>Configurações</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2 cursor-pointer text-red-600 dark:text-red-400">
                  <LogOut className="size-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Status indicator */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground bg-accent/20 rounded-lg p-3">
            <div className="size-2 bg-green-500 rounded-full animate-pulse shadow-sm" />
            <span className="font-medium">Sistema operacional</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
