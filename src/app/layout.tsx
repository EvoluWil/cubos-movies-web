import { Footer } from '@/components/organisms/footer/footer';
import { Header } from '@/components/organisms/header.tsx/header';
import { THEME_STORAGE_KEY, ThemeEnum } from '@/constants/theme';
import type { Metadata } from 'next';
import { Inter, Montserrat, Roboto } from 'next/font/google';
import { cookies } from 'next/headers';
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
  const cookieStore = await cookies();
  const theme = cookieStore.get(THEME_STORAGE_KEY)?.value || ThemeEnum.DARK;

  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${roboto.variable} ${inter.variable} antialiased`}
    >
      <body
        className={`font-sans bg-mauve-10 ${theme} flex flex-col min-h-screen`}
      >
        <Header />
        <div className="container">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
