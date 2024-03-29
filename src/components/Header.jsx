'use client';

import Logo from '@/assets/images/evento.png';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserProfile from './UserProfile';
import AdminProfile from './admin/AdminProfile';

export default function Header() {
  const activePathname = usePathname();
  const session = useSession();
  const role = session.data?.role;

  return (
    <header className="flex h-14 items-center justify-between border-b border-white/10 px-3 sm:px-9">
      <Link href="/">
        <Image src={Logo} alt="EVENTO logo" width={53} height={12} />
      </Link>

      <nav className="h-full">
        <ul className="flex h-full gap-x-6 text-sm">
          {routes.map((route) => (
            <li
              key={route.path}
              className={cn(
                'relative flex items-center transition hover:text-white',
                {
                  'text-white': activePathname === route.path,
                  'text-white/50': activePathname !== route.path,
                }
              )}
            >
              <Link href={route.path}>{route.name}</Link>

              {activePathname === route.path && (
                <motion.div
                  layoutId="header-active-link"
                  className="absolute bottom-0 h-1 w-full bg-accentOg"
                ></motion.div>
              )}
            </li>
          ))}

          {session.status === 'unauthenticated' ? (
            <li
              className={cn(
                'relative flex items-center transition hover:text-white',
                {
                  'text-white': activePathname === '/login',
                  'text-white/50': activePathname !== '/login',
                }
              )}
            >
              <Link href="/login">Log In</Link>

              {activePathname === '/login' && (
                <motion.div
                  layoutId="header-active-link"
                  className="absolute bottom-0 h-1 w-full bg-accentOg"
                ></motion.div>
              )}
            </li>
          ) : role === 'user' ? (
            <li className="relative flex items-center transition hover:text-white">
              <UserProfile
                fullName={session.data?.fullname}
                email={session.data?.email}
              />
            </li>
          ) : (
            <li className="relative flex items-center transition hover:text-white">
              <AdminProfile
                fullName={session.data?.fullname}
                email={session.data?.email}
              />
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
