"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[500px] md:h-[650px]">
  <Image
    src="/gallery1.jpg"
    alt="Hero Background"
    fill
    priority
    className="object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
  <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
    <div>
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg">
        Selamat Datang di RESTO
      </h1>
      <p className="text-lg text-white max-w-xl mx-auto drop-shadow-md">
        Restoran keluarga dengan menu terbaik, suasana nyaman, dan pelayanan
        ramah. Nikmati pengalaman kuliner istimewa bersama kami!
      </p>
    </div>
  </div>
</section>
  );
}
