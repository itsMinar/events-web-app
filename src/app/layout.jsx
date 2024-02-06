import Container from '@/components/Container';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Evento - Find events around you',
  description: 'Browse more than 10,000 events worldwide',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll bg-gray-950 text-white`}
      >
        <Container>
          <Header />
          {children}
          <Footer />
        </Container>
      </body>
    </html>
  );
}
