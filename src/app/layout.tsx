import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Orbitron } from 'next/font/google';
import ReduxProvider from '@/providers/ReduxProvider';
import { ThemeProvider } from '@/contexts/ThemeContext';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Star Wars Movies - Explore the Galaxy',
  description: 'Discover all Star Wars movies with detailed information about characters, planets, and more from a galaxy far, far away.',
  keywords: ['Star Wars', 'Movies', 'Films', 'Jedi', 'Sith', 'Galaxy', 'Force'],
  authors: [{ name: 'Star Wars Explorer' }],
  openGraph: {
    title: 'Star Wars Movies - Explore the Galaxy',
    description: 'Discover all Star Wars movies with detailed information',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Star Wars Movies - Explore the Galaxy',
    description: 'Discover all Star Wars movies with detailed information',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <ReduxProvider>
            <ErrorBoundary>
              <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
                {children}
              </div>
            </ErrorBoundary>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
