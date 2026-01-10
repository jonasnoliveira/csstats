import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CS2 Stats | Track Your Performance',
  description: 'Advanced CS2 Statistics, Tier Lists, and Performance Analysis.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <main className="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
