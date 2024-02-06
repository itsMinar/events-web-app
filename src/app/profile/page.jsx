'use client';

import UnderDevelopment from '@/components/UnderDevelopment';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });

    router.replace('/');
  };

  return (
    <div>
      <button
        className="ml-4 mt-4 rounded-lg bg-red-500 px-2 py-1"
        onClick={handleLogout}
      >
        Logout
      </button>

      <UnderDevelopment />
    </div>
  );
}
