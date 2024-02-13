import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <div class="my-auto text-center">
      <h1 class="mb-4 text-6xl font-semibold text-red-500">404</h1>
      <p class="mb-4 text-2xl font-medium text-gray-600">
        Oops! Looks like you&apos;re lost.
      </p>
      <div class="animate-bounce">
        <svg
          class="mx-auto h-16 w-16 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
          ></path>
        </svg>
      </div>
      <p class="mt-4 text-2xl font-medium text-gray-600">
        Let&apos;s get you back{' '}
        <Link href="/" class="text-blue-500">
          Home
        </Link>
        .
      </p>
    </div>
  );
}
