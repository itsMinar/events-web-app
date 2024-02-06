import InputWithLabel from '@/components/InputWithLabel';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login to your Account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <InputWithLabel label="Email" inputName="email" type="email" />
              <InputWithLabel
                label="Password"
                inputName="password"
                type="password"
              />

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
