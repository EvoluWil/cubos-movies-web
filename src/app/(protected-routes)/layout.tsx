import { authOptions } from '@/config/auth/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default async function PrivateLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/auth/sign-in');
  }

  return <div>{children}</div>;
}
