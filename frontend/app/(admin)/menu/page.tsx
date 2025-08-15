"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type Menu = {
  id: number;
  nama: string;
  kategori: string;
  harga: number;
  stok: number;
  deskripsi: string;
  gambar: string;
};

export default function AdminMenuCatalog() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [form, setForm] = useState<Partial<Menu>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // Fetch data menu dari backend
  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/menu")
      .then((res) => res.json())
      .then(setMenus);
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    let gambarUrl = form.gambar || "";
    // Upload gambar jika ada file baru
    if (file) {
      const data = new FormData();
      data.append("file", file);
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/menu/upload",
        {
          method: "POST",
          body: data,
        }
      );
      if (res.ok) {
        const result = await res.json();
        gambarUrl = result.url || result.path;
      } else {
        setMessage("Gagal upload gambar.");
        return;
      }
    }

    const menuData = { ...form, gambar: gambarUrl };
    if (editingId) {
      // Update menu
      fetch(process.env.NEXT_PUBLIC_API_URL + `/menu/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      })
        .then((res) => res.json())
        .then((updated) => {
          setMenus((prev) =>
            prev.map((m) => (m.id === editingId ? updated : m))
          );
          setForm({});
          setEditingId(null);
          setFile(null);
          setPreview(null);
          setMessage("Menu berhasil diupdate.");
        });
    } else {
      // Create menu
      fetch(process.env.NEXT_PUBLIC_API_URL + "/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(menuData),
      })
        .then((res) => res.json())
        .then((created) => {
          setMenus((prev) => [...prev, created]);
          setForm({});
          setFile(null);
          setPreview(null);
          setMessage("Menu berhasil ditambah.");
        });
    }
  }

  function handleEdit(menu: Menu) {
    setForm(menu);
    setEditingId(menu.id);
    setPreview(menu.gambar ? menu.gambar : null);
    setFile(null);
    setMessage(null);
  }

  function handleDelete(id: number) {
    if (confirm("Yakin ingin menghapus menu ini?")) {
      fetch(process.env.NEXT_PUBLIC_API_URL + `/menu/${id}`, {
        method: "DELETE",
      }).then(() => {
        setMenus((prev) => prev.filter((m) => m.id !== id));
        setMessage("Menu dihapus.");
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Kelola Menu Catalog</h1>
      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded text-sm border border-green-300">
          {message}
        </div>
      )}
      <Card className="mb-8">
        <CardContent className="p-6">
          <form className="grid gap-4" onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="nama">Nama</Label>
              <Input
                id="nama"
                name="nama"
                value={form.nama || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="kategori">Kategori</Label>
              <Input
                id="kategori"
                name="kategori"
                value={form.kategori || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="harga">Harga</Label>
              <Input
                id="harga"
                name="harga"
                type="number"
                value={form.harga || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stok">Stok</Label>
              <Input
                id="stok"
                name="stok"
                type="number"
                value={form.stok || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="deskripsi">Deskripsi</Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                value={form.deskripsi || ""}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gambar">Gambar Menu</Label>
              <Input
                id="gambar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="h-24 mt-2 rounded"
                />
              )}
            </div>
            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? "Update Menu" : "Tambah Menu"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setForm({});
                    setEditingId(null);
                    setFile(null);
                    setPreview(null);
                    setMessage(null);
                  }}
                >
                  Batal
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Harga</TableHead>
                <TableHead>Stok</TableHead>
                <TableHead>Gambar</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menus.map((menu, index) => (
                <TableRow key={menu.id ?? `menu-${index}`}>
                  <TableCell>{menu.nama}</TableCell>
                  <TableCell>{menu.kategori}</TableCell>
                  <TableCell>Rp {menu.harga?.toLocaleString()}</TableCell>
                  <TableCell>{menu.stok}</TableCell>
                  <TableCell>
                    {menu.gambar && (
                      <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}${menu.gambar}`}
                        alt={menu.nama}
                        className="h-10 rounded"
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(menu)}
                      className="mr-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(menu.id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
