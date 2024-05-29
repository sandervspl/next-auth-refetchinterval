'use client';

import * as React from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: React.ReactNode;
};

export const Providers: React.FC<Props> = ({ children }) => {
  return <SessionProvider refetchInterval={5}>{children}</SessionProvider>;
};
