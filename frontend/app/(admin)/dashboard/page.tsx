"use client";
import { useEffect, useState } from "react";

type Stats = {
  totalMenu: number;
  totalEmployee: number;
  totalReservation: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalMenu: 0,
    totalEmployee: 0,
    totalReservation: 0,
  });

  useEffect(() => {
    // Ganti endpoint berikut dengan API-mu sendiri
    fetch(process.env.NEXT_PUBLIC_API_URL + "/admin/dashboard-stats")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard Admin</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-lg shadow p-4 bg-white text-center">
          <div className="text-lg font-semibold">Total Menu</div>
          <div className="text-3xl font-bold">{stats.totalMenu}</div>
        </div>
        <div className="rounded-lg shadow p-4 bg-white text-center">
          <div className="text-lg font-semibold">Total Karyawan</div>
          <div className="text-3xl font-bold">{stats.totalEmployee}</div>
        </div>
        <div className="rounded-lg shadow p-4 bg-white text-center">
          <div className="text-lg font-semibold">Total Reservasi</div>
          <div className="text-3xl font-bold">{stats.totalReservation}</div>
        </div>
      </div>
    </div>
  );
}