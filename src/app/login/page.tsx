'use client';

import * as React from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();
  const session = useSession();

  React.useEffect(() => {
    if (session.data) {
      router.push('/');
    }
  }, [session.data]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get('username') as string;

        await signIn('credentials', {
          username,
        }).catch((err) => {
          console.error(err);
        });
      }}
      className="flex flex-col items-center justify-center gap-4 p-4"
    >
      <input type="text" placeholder="Username" className="rounded-md border border-gray-300 p-2" />
      <button type="submit" className="min-w-32 rounded-md border border-gray-300 bg-gray-100 p-2">
        Login
      </button>
    </form>
  );
};

export default Page;
