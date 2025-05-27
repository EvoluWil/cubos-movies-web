import { BgImageGradient } from '@/components/atoms/bg-image-gradient/bg-image-gradient';
import { Footer } from '@/components/organisms/footer/footer';
import { Header } from '@/components/organisms/header/header';
import AuthProvider from '@/providers/auth';
import type { Metadata } from 'next';
import { Inter, Montserrat, Roboto } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import '../../public/icons/style.css';
import './globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '700',
});

export const metadata: Metadata = {
  title: 'Cubos Movies',
  description: 'O melhor lugar para encontrar filmes e séries',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${roboto.variable} ${inter.variable} antialiased`}
    >
      <body className={`font-sans bg-mauve-10 flex flex-col min-h-screen`}>
        <AuthProvider>
          <ToastContainer />
          <Header />
          <div className="relative bg-mauve-10 mt-[72px]">
            <BgImageGradient />
            <div className="h-full relative">{children}</div>
          </div>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
