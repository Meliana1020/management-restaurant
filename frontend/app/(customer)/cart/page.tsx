"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, removeFromCart, updateQty, clearCart } = useCart();
  const router = useRouter();
  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Keranjang Belanja</h1>
      {cart.length === 0 ? (
        <div className="text-center text-gray-500">
          Keranjang kosong.{" "}
          <Link href="/menu-catalog" className="text-primary underline">
            Lihat Menu
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 border rounded p-2"
              >
                <Image
                  src={
                    item.gambar
                      ? item.gambar.startsWith("http")
                        ? item.gambar
                        : `${process.env.NEXT_PUBLIC_API_URL}${item.gambar}`
                      : "/placeholder.jpg"
                  }
                  alt={item.nama || "Produk"}
                  width={70}
                  height={70}
                  className="rounded object-cover"
                />

                <div className="flex-1">
                  <div className="font-bold">{item.nama}</div>
                  <div className="text-sm text-gray-600">
                    Rp {item.harga.toLocaleString()} x {item.qty}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() =>
                        updateQty(item.id, Math.max(item.qty - 1, 1))
                      }
                      className="px-2 border rounded"
                    >
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.id, item.qty + 1)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 text-xs underline"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
                <div className="font-semibold">
                  Rp {(item.harga * item.qty).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center mt-6">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-lg text-primary">
              Rp {total.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={clearCart}>
              Kosongkan Keranjang
            </Button>
            <Button onClick={() => router.push("/payment")}>
              Bayar Sekarang
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
