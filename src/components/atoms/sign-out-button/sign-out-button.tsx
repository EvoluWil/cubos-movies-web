'use client';

import { Button } from '@/components/molecules/button/button';
import { signOut } from 'next-auth/react';

export const SignOutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
