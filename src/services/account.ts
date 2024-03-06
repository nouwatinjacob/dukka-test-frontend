import { createRequest } from './http';
import { User } from '../../types/user';

type AuthResponse = {
  message: string;
  access_token: string;
  refresh_token: string;
};

export const login = async (data: Partial<User>): Promise<AuthResponse> =>
  await createRequest({ url: '/login/', method: 'POST', data }).then(
    (response) => response.data,
  );

export const register = async (data: Partial<User>): Promise<AuthResponse> =>
  await createRequest({
    url: '/register/',
    method: 'POST',
    data,
  }).then((response) => response.data);

export const getAccount = async (): Promise<User> =>
  await createRequest({ url: '/account/' }).then(
    (response) => response.data.data,
  );

export const logout = async (): Promise<unknown> =>
  await createRequest({ url: '/logout/', method: 'POST' }).then(
    (response) => response.data,
  );
