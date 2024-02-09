import SearchForm from '@/components/SearchForm';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-3 pt-36">
      <h1 className="text-3xl font-bold tracking-tight lg:text-6xl">
        Find events around you
      </h1>

      <p className="mb-12 mt-7 text-2xl opacity-75 lg:text-3xl">
        Browse more than{' '}
        <span className="text-accentOg font-bold italic underline">
          10,000 events
        </span>{' '}
        around you
      </p>

      <SearchForm />

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular:</p>
        <div className="space-x-2 font-semibold">
          <Link href="/events/dhaka">Dhaka</Link>
          <Link href="/events/khulna">Khulna</Link>
        </div>
      </section>
    </main>
  );
}
