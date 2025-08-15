"use client";

import HeroSection from "@/components/fragments/hero";
import GallerySection from "@/app/(customer)/gallery/page";
import MenuCatalog from "@/app/(customer)/menu-catalog/page";
import ReservationForm from "@/app/(customer)/reservarion/page";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <GallerySection />
      <MenuCatalog />
      <ReservationForm />
    </div>
  );
}
