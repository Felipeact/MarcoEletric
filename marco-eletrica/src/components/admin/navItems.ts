import {
  LayoutDashboard,
  Users,
  Wrench,
  FileText,
  Tag,
  Receipt,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  shortLabel?: string;
  icon: LucideIcon;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/servicos", label: "Serviços", icon: Wrench },
  { href: "/admin/orcamentos", label: "Orçamentos", icon: FileText },
  {
    href: "/admin/precos",
    label: "Tabela de preços",
    shortLabel: "Preços",
    icon: Tag,
  },
  { href: "/admin/despesas", label: "Despesas", icon: Receipt },
];
