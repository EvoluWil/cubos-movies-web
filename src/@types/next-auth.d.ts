import { User as UserType } from '@/types/user.type';
import 'next-auth';

declare module 'next-auth' {
  interface User extends UserType {
    token: string;
  }
  interface Session {
    user: User;
  }
}
