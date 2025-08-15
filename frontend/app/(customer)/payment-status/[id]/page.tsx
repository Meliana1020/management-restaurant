"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Transaksi = {
  id: number;
  kode: string;
  total: number;
  status: string;
  metodePembayaran?: string;
  buktiPembayaran?: string;
  // tambahkan field lain sesuai response backend
};

export default function PaymentStatusPage() {
  // useParams di Nextjs App Router bisa dikembalikan sebagai unknown shape,
  // cast ke object yang kita harapkan.
  const params = useParams() as { id?: string };
  const id = params?.id;
  const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

  // data bisa Transaksi atau object error
  const [data, setData] = useState<Transaksi | { error: true; message: string } | null>(null);

  useEffect(() => {
    if (!id) return;

    let mounted = true;
    async function fetchStatus() {
      try {
        const res = await fetch(`${API}/transaksi/${id}`);
        if (!res.ok) {
          // ambil body supaya pesan backend terlihat di UI
          const text = await res.text();
          throw new Error(`HTTP ${res.status} - ${text}`);
        }
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err: unknown) {
        console.error("Fetch transaksi error:", err);
        const message = err instanceof Error ? err.message : String(err);
        if (mounted) setData({ error: true, message });
      }
    }

    fetchStatus();

    return () => {
      mounted = false;
    };
  }, [id, API]);

  if (!id) return <div className="p-6 text-center">ID transaksi tidak ditemukan.</div>;
  if (!data) return <div className="p-6 text-center">Memuat status...</div>;
  if ("error" in data) return <div className="p-6 text-center text-red-600">Error: {data.message}</div>;

  // render detail transaksi
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Status Pembayaran</h1>
      <p><strong>Kode:</strong> {data.kode}</p>
      <p><strong>Status:</strong> {data.status}</p>
      <p><strong>Metode:</strong> {data.metodePembayaran}</p>
      <p><strong>Total:</strong> Rp {data.total?.toLocaleString()}</p>

      {data.buktiPembayaran && (
        <div className="mt-4">
          <p><strong>Bukti Pembayaran:</strong></p>
          <img src={`${API}${data.buktiPembayaran}`} alt="Bukti" className="w-64 mt-2 rounded shadow" />
        </div>
      )}
    </div>
  );
}
