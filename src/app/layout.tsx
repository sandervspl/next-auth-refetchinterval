import 'styles/globals.css';

import { Metadata } from 'next';

import { SITE_URL } from 'services/utils';
import Logo from 'vectors/logo.svg';
import { SizeIndicator } from 'common/SizeIndicator';

import { Providers } from './Providers';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL || 'http://localhost:3000'),
  manifest: '/manifest.json',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en" className="h-dvh bg-white antialiased">
      <body className="h-full min-h-full">
        <Providers>
          <header className="mb-12 grid place-items-center bg-black px-2 py-12">
            <Logo className="w-64" />
          </header>
          {children}
          {process.env.NODE_ENV !== 'production' && <SizeIndicator />}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
