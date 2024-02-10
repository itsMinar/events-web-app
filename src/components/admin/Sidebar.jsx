'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdAssignmentAdd } from 'react-icons/md';
import { RxDashboard } from 'react-icons/rx';
import { SlCalender } from 'react-icons/sl';
import LogoutButton from '../LogoutButton';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="h-full bg-gray-900">
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          <div>
            <ul className="flex flex-col gap-1.5">
              <li>
                <Link
                  href="/admin/dashboard"
                  className={`text-bodydark1 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-800 ${
                    pathname.includes('admin/dashboard') && 'bg-gray-950'
                  }`}
                >
                  <RxDashboard />
                  Dasboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/events"
                  className={`text-bodydark1 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-800 ${
                    pathname.includes('admin/events') && 'bg-gray-950'
                  }`}
                >
                  <SlCalender />
                  Event List
                </Link>
              </li>

              <li>
                <Link
                  href="/admin/add-events"
                  className={`text-bodydark1 group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium duration-300 ease-in-out hover:bg-gray-800 ${
                    pathname.includes('admin/add-events') && 'bg-gray-950'
                  }`}
                >
                  <MdAssignmentAdd />
                  Add Events
                </Link>
              </li>

              <li className="mx-auto mt-14">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
