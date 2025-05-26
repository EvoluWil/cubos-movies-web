import { ResetPasswordFormDto } from '@/app/(auth-routes)/auth/reset-password/[token]/reset-password.schema';
import { SignUpFormDto } from '@/app/(auth-routes)/auth/sign-up/sign-up.schema';
import { api } from '@/config/api/api';
import { User } from '@/types/user.type';
import { signIn } from 'next-auth/react';

type SignInResponse = {
  user: User;
  token: string;
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

  async signUp(signUpFormDto: SignUpFormDto) {
    const { data } = await api.post<User>('/auth/sign-up', signUpFormDto);
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

  async resetPassword(
    token: string,
    resetPasswordFormDto: ResetPasswordFormDto,
  ) {
    const { data } = await api.post(
      `/auth/reset-password/${token}`,
      resetPasswordFormDto,
    );

    return data;
  }

  async forgotPassword(email: string) {
    const { data } = await api.post('/auth/forgot-password', { email });

    return data;
  }

  async validateCode(code: string, email: string) {
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
