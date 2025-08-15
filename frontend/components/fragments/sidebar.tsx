"use client"

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import {
  Home,
  List,
  Users,
  FileText,
  ClipboardList,
  BarChart2,
  LogOut,
  Menu as MenuIcon
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

const menu = [
  { label: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
  { label: "Menu Catalog", href: "/menu", icon: <List size={20} /> },
  { label: "Transaksi", href: "/transaksi", icon: <FileText size={20} /> },
  { label: "Reservasi", href: "/reservasi", icon: <ClipboardList size={20} /> },
  { label: "Laporan", href: "/laporan", icon: <BarChart2 size={20} /> },
  { label: "Employee", href: "/employee", icon: <Users size={20} /> },
];

export default function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile trigger */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="rounded-md p-2 bg-blue-600/80 text-white shadow" aria-label="Open sidebar">
              <MenuIcon />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-white">
            <SheetHeader>
              <SheetTitle>Menu Admin</SheetTitle>
              <SheetDescription>Silakan pilih menu navigasi admin di sini.</SheetDescription>
            </SheetHeader>
            <SidebarMenu pathname={pathname} onClick={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white border-r shadow-sm z-40">
        <div className="px-6 py-6 border-b font-bold text-lg tracking-wide text-blue-700">ADMIN PANEL</div>
        <SidebarMenu pathname={pathname} />
      </aside>
    </>
  )
}

function SidebarMenu({ pathname, onClick }: { pathname: string, onClick?: () => void }) {
  return (
    <nav className="flex flex-col gap-1 py-4 px-2">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-all
            ${
              pathname.startsWith(item.href)
                ? "bg-blue-100 text-blue-700"
                : "text-gray-700 hover:bg-blue-50"
            }`}
          style={{
            fontWeight: pathname.startsWith(item.href) ? 600 : 500,
            letterSpacing: "0.01em",
          }}
          onClick={onClick}
        >
          <span className={`${pathname.startsWith(item.href) ? "text-blue-600" : "text-gray-400"}`}>
            {item.icon}
          </span>
          {item.label}
        </Link>
      ))}
      <button
        className="flex items-center gap-3 px-4 py-2 rounded-md font-medium mt-7 bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 transition-all"
        onClick={() => { /* TODO: implement logout logic */ alert("Logout clicked"); if(onClick) onClick(); }}
        style={{ fontWeight: 600 }}
      >
        <LogOut size={20} />
        Logout
      </button>
    </nav>
  )
}