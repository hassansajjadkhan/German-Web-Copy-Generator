import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'WORTGUT – German AI Website Copy Assistant',
  description:
    'Erstelle professionelle Website-Texte für deine Marke mit KI-Unterstützung. Deutsche Website-Texte, SEO-optimiert und markennah.',
  keywords: [
    'Website-Texte',
    'Copywriting',
    'KI',
    'Deutsch',
    'SEO',
    'Content',
    'Marketing',
  ],
  authors: [{ name: 'WORTGUT' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
