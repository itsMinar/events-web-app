'use client';

import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Button } from './ui/button';

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
    <Button
      variant="destructive"
      className="bg-red-700 px-4 py-1"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
