import Image from "next/image";

const images = [
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg",
  "/gallery1.jpg",
  "/gallery2.jpg",
  "/gallery3.jpg"
];

export default function GallerySection() {
  return (
    <section className="bg-gray-50 py-8" id="gallery">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {images.map((img, i) => (
            <div key={i} className="w-[400px]">
              <Image
                src={img}
                alt={`gallery-${i}`}
                width={500}
                height={200}
                className="rounded-lg object-cover w-full h-48"
                loading="lazy"
                placeholder="blur"
                blurDataURL="/blur-placeholder.jpg"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
