import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Forge Champions | Fundación Forge',
  description:
    'Transformá tu experiencia corporativa en impacto social. Liderá una masterclass en vivo, conectá con el talento del futuro y posicioná a tu empresa como un actor de cambio real.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth bg-white">
      <body className="antialiased bg-white text-[#1D1D1F] selection:bg-[#00A896] selection:text-white">
        {children}
      </body>
    </html>
  );
}
