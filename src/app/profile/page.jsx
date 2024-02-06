'use client';

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
      <h2>ProfilePage</h2>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
