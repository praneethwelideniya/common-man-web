import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Hi, Welcome to my website
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Please check my portfolio
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/portfolio"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
          >
            Portfolio
          </Link>
        </div>
      </div>
    </main>
  );
}
