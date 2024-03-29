import api from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../types';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>('/login', { email, password });
  }

  static async registration(
    name: string,
    number: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>(
      '/registration',
      {
        name,
        number,
        email,
        password,
      },
      { withCredentials: true }
    );
  }

  static async logout(): Promise<void> {
    return api.post('/logout');
  }
}
