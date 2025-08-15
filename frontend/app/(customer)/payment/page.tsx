"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

export default function PaymentPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [method, setMethod] = useState("QRIS");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const total = cart.reduce((sum, item) => sum + item.harga * item.qty, 0);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFile(e.target.files?.[0] ?? null);
  }

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (cart.length === 0) {
      alert("Keranjang kosong.");
      return;
    }
    setLoading(true);

    // generate kode transaksi unik
    const kode = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // siapkan detail item untuk backend (DetailTransaksi)
    const items = cart.map((c) => ({
      menuId: c.id,
      qty: c.qty,
      subtotal: c.qty * c.harga,
    }));

    try {
      const formData = new FormData();
      formData.append("kode", kode);
      formData.append("tanggal", new Date().toISOString());
      formData.append("total", `${total}`);
      formData.append("dibayar", `${total}`); // full paid
      formData.append("metodePembayaran", method);
      formData.append("status", "LUNAS"); // atau "DP" jika partial
      formData.append("items", JSON.stringify(items));

      // file must be named "buktiPembayaran" sesuai middleware upload.single('buktiPembayaran')
      if (file) formData.append("buktiPembayaran", file);

      const res = await fetch(`${API}/transaksi`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let err;
        try {
          err = await res.json();
        } catch (e) {
          err = { message: res.statusText };
        }
        console.error("Error response:", err);
        alert("Gagal memproses pembayaran: " + (err.message || JSON.stringify(err)));
        setLoading(false);
        return;
      }

      const data = await res.json();

      // Simpan ID transaksi terakhir ke localStorage
      localStorage.setItem("lastTransactionId", data.id);

      clearCart();
      router.push(`/payment-status/${data.id}`);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pembayaran</h1>

      <div className="border rounded p-4 mb-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.nama} x {item.qty}
            </span>
            <span>Rp {(item.harga * item.qty).toLocaleString()}</span>
          </div>
        ))}
        <hr className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>Rp {total.toLocaleString()}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Metode Pembayaran</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="QRIS">QRIS</option>
            <option value="Transfer Bank">Transfer Bank</option>
            <option value="COD">COD (Bayar di Tempat)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Upload Bukti Pembayaran (opsional)</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              clearCart();
              router.push("/menu-catalog");
            }}
          >
            Batal
          </Button>
          <Button type="submit" disabled={loading} className="ml-auto">
            {loading ? "Memproses..." : "Konfirmasi & Bayar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
