import * as React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home',
};

const Page = async () => {
  return (
    <main>
      <section className="grid place-items-center px-2">
        <Link
          href="/login"
          className="flex min-w-32 items-center justify-center gap-2 rounded-md border-2 border-gray-600 bg-gray-100 px-4 py-3 font-bold shadow-lg"
        >
          Login
        </Link>
      </section>
    </main>
  );
};

export default Page;
