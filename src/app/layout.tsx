import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ReduxProvider from '@/providers/ReduxProvider';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Star Wars Movies - Explore the Galaxy',
  description: 'Discover all Star Wars movies with detailed information about characters, planets, and more from a galaxy far, far away.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        <ReduxProvider>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </ReduxProvider>
      </body>
    </html>
  );
}
