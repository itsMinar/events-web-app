'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function GetTicket() {
  const router = useRouter();
  const session = useSession();

  const handleGetTicket = () => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    toast.info('This Feature will be Added soon.');
  };

  return (
    <button
      onClick={handleGetTicket}
      className="bg-blur state-effects mt-5 w-[95vw] rounded-md border-2 border-white/10 bg-white/20 py-2 text-lg capitalize sm:w-full lg:mt-auto"
    >
      Get tickets
    </button>
  );
}
