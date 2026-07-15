"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Ship,
  PlusCircle,
  BarChart3,
  Users,
  LogOut,
} from "lucide-react";

import { useSession } from "@/hooks/use-session";

const menus = [
  {
    nome: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    nome: "Estoque",
    href: "/estoque",
    icon: Ship,
  },
  {
    nome: "Adicionar Navio",
    href: "/adicionar-navio",
    icon: PlusCircle,
  },
  {
    nome: "Auditoria",
    href: "/auditoria",
    icon: BarChart3,
  },
  {
    nome: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const { data: usuario } = useSession();

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  const menusVisiveis = menus.filter((menu) => {
    if (menu.href === "/usuarios") {
      return usuario?.nivel?.toLowerCase() === "master";
    }

    return true;
  });

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950">
      <div className="flex h-20 items-center justify-center border-b border-slate-800">
        <h1 className="text-xl font-bold text-white">
          ⚓ Porto Digital
        </h1>
      </div>

      <nav className="flex-1 space-y-2 px-4 py-6">
        {menusVisiveis.map((menu) => {
          const Icon = menu.icon;

          const ativo =
            pathname === menu.href ||
            pathname.startsWith(`${menu.href}/`);

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`flex items-center gap-3 rounded-lg p-3 text-sm font-medium transition ${
                ativo
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-slate-300 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              {menu.nome}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-sm font-medium text-slate-300 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={18} />
          Sair
        </button>
      </div>
    </aside>
  );
}