import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AuthProvider from '@/providers/AuthProvider';
import { getServerSession } from 'next-auth';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import { authOptions } from './api/auth/[...nextauth]/route';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Evento - Find events around you',
  description: 'Browse more than 10,000 events worldwide',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className='dark'>
      <body
        className={`${inter.className} overflow-y-scroll bg-gray-950 text-white`}
      >
        <AuthProvider session={session}>
          <Container>
            <Header />
            {children}
            <Footer />
          </Container>
          <Toaster richColors closeButton invert />
        </AuthProvider>
      </body>
    </html>
  );
}
