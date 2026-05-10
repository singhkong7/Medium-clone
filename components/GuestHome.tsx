/* eslint-disable @next/next/no-img-element */
export default function GuestHome() {
  return (
    <div className="flex items-center justify-between bg-[#F7F4ED] border-y border-black py-10 lg:py-0">
      <div className="px-10 space-y-5 max-w-xl">
        <h1 className="text-7xl font-serif">
          Human stories & ideas
        </h1>

        <p className="text-xl text-gray-700">
          A place to read, write, and deepen your understanding
        </p>

        <button className="bg-black text-white px-6 py-3 rounded-full text-lg">
          Start reading
        </button>
      </div>

      <img
        className="hidden md:inline-flex h-96"
        src="https://miro.medium.com/v2/resize:fit:1400/1*7z4kK5r0bZp8V4Vw0F0l9A.png"
        alt=""
      />
    </div>
  );
}