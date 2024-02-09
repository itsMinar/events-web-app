'use client';

import Logo from '@/assets/images/evento.png';
import { adminRoutes, publicRoutes, userRoutes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const activePathname = usePathname();
  const session = useSession();
  const role = session.data?.role;

  let routes = publicRoutes;
  if (session.status === 'authenticated') {
    role === 'admin' ? (routes = adminRoutes) : (routes = userRoutes);
  }

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
                  className="bg-accentOg absolute bottom-0 h-1 w-full"
                ></motion.div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
