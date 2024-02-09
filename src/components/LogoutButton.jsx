'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({
      redirect: false,
    });
    toast.success('Successfully Logged out', { duration: 2000 });
    router.replace('/');
  };

  return (
    <button
      className="ml-4 mt-4 rounded-lg bg-red-500 px-2 py-1"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
