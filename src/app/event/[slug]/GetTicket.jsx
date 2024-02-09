'use client';

import TicketIcon from '@/assets/images/ticket.png';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function GetTicket({ availableTickets }) {
  const router = useRouter();
  const session = useSession();
  const role = session.data?.role;

  const handleGetTicket = () => {
    if (session.status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (role === 'admin') {
      toast.info('Admin can not buy Ticket.', {
        position: 'top-center',
      });
      return;
    }

    toast.info('This Feature will be Added soon.');
  };

  return availableTickets > 0 ? (
    <div className="mt-5 flex gap-4">
      <button
        onClick={handleGetTicket}
        className="bg-blur state-effects w-[95vw] rounded-md border-2 border-white/10 bg-white/20 py-2 text-lg capitalize sm:w-full lg:mt-auto"
      >
        Get tickets
      </button>
      <div className="flex items-center justify-center gap-2 rounded-md bg-white/20 px-4 py-2">
        <Image src={TicketIcon} alt="ticket" className="h-8 w-8" />
        <span>{availableTickets}</span>
      </div>
    </div>
  ) : (
    <button
      disabled
      className="bg-blur mt-5 w-[95vw] rounded-md border-2 border-red-400 bg-red-400 py-2 text-lg capitalize sm:w-full lg:mt-auto"
    >
      Sold all tickets
    </button>
  );
}
