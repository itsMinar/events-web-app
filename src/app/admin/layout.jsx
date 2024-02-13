import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';

export const metadata = {
  title: 'Admin Panel',
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  const role = session?.role;

  if (role !== 'admin') redirect('/');

  return children
}
