'use client';

import { buyTickets } from '@/actions';
import TicketIcon from '@/assets/images/ticket.png';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function GetTicket({ slug, availableTickets }) {
  const router = useRouter();
  const session = useSession();
  const role = session.data?.role;

  const [ticketCount, setTicketCount] = useState(1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [pending, setPending] = useState(false);

  const handleOpenDrawer = () => {
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

    setIsDrawerOpen(true);
  };

  const handleGetTicket = async () => {
    try {
      setPending(true);
      const res = await buyTickets(slug, ticketCount);

      if (res.success) {
        setIsDrawerOpen(false);
        toast.info(`You have successfully bought ${ticketCount} tickets.`, {
          duration: 3000,
        });
        setTicketCount(1);
      } else {
        toast.error(res.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { duration: 2000 });
    } finally {
      setPending(false);
    }
  };

  return availableTickets > 0 ? (
    <div className="mt-5 flex gap-4">
      <Drawer open={isDrawerOpen}>
        <DrawerTrigger asChild>
          <button
            onClick={handleOpenDrawer}
            className="bg-blur state-effects w-[95vw] rounded-md border-2 border-white/10 bg-white/20 py-2 text-lg capitalize sm:w-full lg:mt-auto"
          >
            Get tickets
          </button>
        </DrawerTrigger>
        <DrawerContent className="mx-auto w-2/3 items-center bg-gray-950">
          <DrawerHeader>
            <DrawerTitle>How many tickets do you want to Buy?</DrawerTitle>
          </DrawerHeader>
          <div className="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => setTicketCount((prevCount) => prevCount - 1)}
              disabled={ticketCount <= 1}
            >
              -<span className="sr-only">Decrease</span>
            </Button>
            <div className="flex-1 text-center">
              <div className="text-7xl font-bold tracking-tighter">
                {ticketCount}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 shrink-0 rounded-full"
              onClick={() => setTicketCount((prevCount) => prevCount + 21)}
              disabled={ticketCount >= availableTickets}
            >
              +<span className="sr-only">Increase</span>
            </Button>
          </div>
          <DrawerFooter>
            <Button onClick={handleGetTicket} disabled={pending}>
              {pending ? 'Buying...' : 'Buy Now'}
            </Button>
            <DrawerClose>
              <Button onClick={() => setIsDrawerOpen(false)} variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

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
