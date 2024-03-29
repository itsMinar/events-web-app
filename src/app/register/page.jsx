'use client';

import InputWithLabel from '@/components/InputWithLabel';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function RegistrationPage() {
  const [userInfo, setUserInfo] = useState({
    fullname: '',
    email: '',
    password: '',
  });
  const [pending, setPending] = useState(false);

  const router = useRouter();
  const session = useSession();
  if (session.status === 'authenticated') {
    router.push('/');
  }

  const handleInputChange = (e) => {
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userInfo.fullname | !userInfo.email | !userInfo.password) {
      toast.error('Please fill all the fields!');
      return;
    }

    try {
      setPending(true);
      const res = await fetch('api/v1/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      const response = await res.json();

      const form = e.target;

      if (response.success) {
        form.reset();
        toast.success(response.message);
        router.push('/login');
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0 dark:border dark:border-gray-700 dark:bg-gray-800">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an Account
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <InputWithLabel
                label="Full Name"
                inputName="fullname"
                value={userInfo.fullname}
                onChange={handleInputChange}
              />
              <InputWithLabel
                label="Email"
                inputName="email"
                type="email"
                value={userInfo.email}
                onChange={handleInputChange}
              />
              <InputWithLabel
                label="Password"
                inputName="password"
                type="password"
                value={userInfo.password}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {pending ? 'Registering...' : 'Register'}
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
