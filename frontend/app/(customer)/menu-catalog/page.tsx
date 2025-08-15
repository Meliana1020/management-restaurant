"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";

type Menu = {
  id: number;
  nama: string;
  harga: number;
  gambar: string;
  deskripsi: string;
  kategori: string;
  stok: number;
};

export default function MenuCatalogPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [selected, setSelected] = useState<Menu | null>(null);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/menu")
      .then((res) => res.json())
      .then(setMenus);
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Katalog Menu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menus.map((menu) => (
          <Dialog
            key={menu.id}
            onOpenChange={(open) => {
              if (!open) setSelected(null);
            }}
          >
            <DialogTrigger asChild>
              <div className="rounded-lg shadow hover:shadow-lg border cursor-pointer p-3 bg-white flex flex-col items-center">
                <Image
                  src={
                    menu.gambar
                      ? menu.gambar.startsWith("http")
                        ? menu.gambar
                        : `${process.env.NEXT_PUBLIC_API_URL}${menu.gambar}`
                      : "/placeholder.jpg"
                  }
                  alt={menu.nama}
                  width={200}
                  height={140}
                  className="rounded w-full h-36 object-cover mb-2"
                />

                <div className="font-bold">{menu.nama}</div>
                <div className="text-primary font-semibold">
                  Rp {menu.harga.toLocaleString()}
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <DialogTitle>{menu.nama}</DialogTitle>
              <DialogDescription asChild>
                <div>
                  <Image
                    src={
                      menu.gambar
                        ? menu.gambar.startsWith("http")
                          ? menu.gambar
                          : `${process.env.NEXT_PUBLIC_API_URL}${menu.gambar}`
                        : "/no-image.jpg"
                    }
                    alt={menu.nama}
                    width={340}
                    height={200}
                    className="rounded w-full h-48 object-cover mb-3"
                  />

                  <div className="mb-2">{menu.deskripsi}</div>
                  <div className="text-sm mb-2">Kategori: {menu.kategori}</div>
                  <div className="mb-2 font-semibold">
                    Harga: Rp {menu.harga.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-2 my-3">
                    <span>Jumlah:</span>
                    <input
                      type="number"
                      min={1}
                      max={menu.stok}
                      value={selected?.id === menu.id ? qty : 1}
                      onChange={(e) =>
                        setQty(
                          Math.max(
                            1,
                            Math.min(menu.stok, Number(e.target.value))
                          )
                        )
                      }
                      className="w-16 border rounded px-2 py-1"
                    />
                    <span className="text-xs text-gray-500">
                      (Stok: {menu.stok})
                    </span>
                  </div>
                </div>
              </DialogDescription>

              <DialogFooter>
                <Button
                  onClick={() => {
                    addToCart(
                      {
                        id: menu.id,
                        nama: menu.nama,
                        harga: menu.harga,
                        gambar: menu.gambar,
                      },
                      qty
                    );
                    setSelected(null);
                  }}
                  disabled={menu.stok < 1}
                >
                  Masukkan ke Keranjang
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Tutup</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
