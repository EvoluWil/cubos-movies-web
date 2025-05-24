import { api } from '@/config/api/api';
import { User } from '@/types/user.type';
import { signIn } from 'next-auth/react';

type SignInResponse = {
  user: User;
};

type Credentials = {
  email: string;
  password: string;
};

class AuthService {
  async signIn(credentials: Credentials) {
    const { data } = await api.post<SignInResponse>(
      '/auth/sign-in',
      credentials,
    );

    return data;
  }

  async signUp(signUpForm: any) {
    const { data } = await api.post<User>('/auth/sign-up', signUpForm);
    return data;
  }

  async credentials(credentials: Credentials) {
    const result = await signIn('credentials', {
      ...credentials,
      redirect: false,
    });

    return result;
  }

  async getMe() {
    const { data } = await api.get<User>('/auth/me');
    return data;
  }

  async recoveryPassword(token: string, recoveryPasswordFormData: any) {
    const { data } = await api.post(
      `/auth/recovery-password/${token}`,
      recoveryPasswordFormData,
    );

    return data;
  }

  async forgotPassword(email: string) {
    const { data } = await api.post('/auth/forgot-password', { email });

    return data;
  }

  async validateEmail(code: string, email: string) {
    const { data } = await api.post<{ token: string }>(
      `/auth/validate-code/${code}`,
      {
        email,
      },
    );

    return data;
  }

  async updatePassword(securityFormData: any) {
    const { data } = await api.put<User>(
      '/auth/update-password',
      securityFormData,
    );
    return data;
  }
}

export const authService = new AuthService();
