import Link from 'next/link';

/* eslint-disable @next/next/no-img-element */
export default function UnderDevelopment() {
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <img
        src="https://www.svgrepo.com/show/426192/cogs-settings.svg"
        alt="Logo"
        className="mb-8 h-40"
      />
      <h1 className="mb-4 text-center text-4xl font-bold text-gray-700 md:text-5xl lg:text-6xl">
        Under Development...
      </h1>
      <div className="flex space-x-4">
        <Link
          href="/"
          className="rounded bg-gray-800 px-6 py-3 font-bold text-white hover:bg-gray-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
