export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-65px)] px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6">
        Elevate your <span className="text-gray-400 italic">DRIP</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-2xl mb-8">
        The intelligent fashion operating system that understands who you are, what you own, and what suits you.
      </p>
      <div className="flex gap-4">
        <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:opacity-80 transition-opacity">
          Get Started
        </button>
        <button className="border border-black px-8 py-3 rounded-full font-bold hover:bg-black hover:text-white transition-all">
          Explore Search
        </button>
      </div>
    </div>
  );
}
