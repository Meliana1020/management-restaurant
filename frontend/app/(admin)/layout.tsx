import Sidebar from "@/components/fragments/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 p-4">{children}</main>
    </div>
  );
}