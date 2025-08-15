import Header from "@/components/fragments/header";
import Footer from "@/components/fragments/footer";
import { CartProvider } from "@/hooks/useCart";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <CartProvider>
            {children}
        </CartProvider>
      </main>
      <Footer />
    </div>
  );
}