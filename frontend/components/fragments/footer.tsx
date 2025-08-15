export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-10">
      <div className="container flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="font-semibold">Alamat:</div>
          Jl. Makan No. 1, Jakarta<br />
          Telp: (021) 123-4567
        </div>
        <div>
          <div className="font-semibold">Sosial Media:</div>
          <a href="https://instagram.com" className="hover:text-white mr-2">Instagram</a>
          <a href="https://facebook.com" className="hover:text-white mr-2">Facebook</a>
          <a href="https://tiktok.com" className="hover:text-white">TikTok</a>
        </div>
      </div>
    </footer>
  );
}