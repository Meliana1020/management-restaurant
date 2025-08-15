"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";

export default function ReservationForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    // TODO: Implement submit ke backend
    alert("Reservasi berhasil dikirim!\n" + JSON.stringify(data, null, 2));
  };

  return (
    <section className="py-10 bg-gray-50" id="reservation">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Reservasi</h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input {...register("nama", { required: true })} className="w-full border p-2 rounded" placeholder="Nama" />
          <input {...register("tanggal", { required: true })} type="datetime-local" className="w-full border p-2 rounded" />
          <input {...register("orang", { required: true, min: 1 })} type="number" min={1} className="w-full border p-2 rounded" placeholder="Jumlah Orang" />
          <input {...register("telp", { required: true })} className="w-full border p-2 rounded" placeholder="No. Telepon" />
          <Button type="submit" className="w-full">Reservasi</Button>
        </form>
      </div>
    </section>
  );
}