"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import Image from "next/image";
import { useState, useCallback } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

function HeaderComponent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  // Gunakan useCallback biar fungsi ini nggak bikin re-render tiap render ulang
  const handleCheckPayment = useCallback(() => {
    const lastId = localStorage.getItem("lastTransactionId");
    if (lastId) {
      router.push(`/payment-status/${lastId}`);
    } else {
      alert("Tidak ada transaksi yang ditemukan.");
    }
  }, [router]);

  const navLinks = [
    { href: "/home", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/gallery", label: "GALLERY" },
    { href: "/menu-catalog", label: "CATALOG MENU" },
    { href: "/reservation", label: "RESERVATION" },
    { onClick: handleCheckPayment, label: "CEK PEMBAYARAN" },
  ];

  return (
    <header className="w-full bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-3 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2 min-w-0">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={34}
            height={34}
            priority // biar load logo lebih cepat
            className="rounded-full min-w-[34px]"
          />
          <span className="font-bold text-lg lg:text-xl text-gray-700 truncate">
            RESTO
          </span>
        </div>

        {/* Navigation */}
        <nav className="hidden lg:flex gap-6 flex-1 justify-center">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                prefetch // aktifkan prefetch untuk load cepat
                className="hover:text-primary transition whitespace-nowrap cursor-pointer"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={link.onClick}
                className="hover:text-primary transition whitespace-nowrap cursor-pointer"
              >
                {link.label}
              </button>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-1 lg:gap-2">
          <Link
            href="/cart"
            prefetch
            className="p-2 rounded hover:bg-gray-100 transition relative cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <Link href="/login" prefetch className="hidden lg:block cursor-pointer">
            <Button variant="outline" size="sm">
              Login
            </Button>
          </Link>
          <Link href="/register" prefetch className="hidden lg:block cursor-pointer">
            <Button size="sm">Register</Button>
          </Link>
          <button
            className="lg:hidden ml-1 p-2 rounded hover:bg-gray-100 transition"
            aria-label="Buka menu navigasi"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <CloseIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={clsx(
          "lg:hidden bg-white shadow transition-all duration-300 overflow-hidden",
          mobileOpen ? "max-h-[500px] border-t" : "max-h-0 border-none"
        )}
        style={{ transitionProperty: "max-height" }}
      >
        <nav className="flex flex-col items-center gap-1 py-3">
          {navLinks.map((link) =>
            link.href ? (
              <Link
                key={link.label}
                href={link.href}
                prefetch
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2 text-base hover:bg-gray-50 rounded transition"
              >
                {link.label}
              </Link>
            ) : (
              <button
                key={link.label}
                onClick={() => {
                  setMobileOpen(false);
                  if (link.onClick) link.onClick();
                }}
                className="w-full text-center py-2 text-base hover:bg-gray-50 rounded transition "
              >
                {link.label}
              </button>
            )
          )}
          <div className="flex gap-2 mt-3">
            <Link href="/login" prefetch>
              <Button variant="outline" size="sm" className="w-20 cursor-pointer">
                Login
              </Button>
            </Link>
            <Link href="/register" prefetch>
              <Button size="sm" className="w-20 cursor-pointer">
                Register
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Bungkus pakai memo untuk menghindari re-render berlebihan
export const Header = React.memo(HeaderComponent);
export default Header;
