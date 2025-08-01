export interface User {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  password?: string;
  role: 'admin' | 'user';
}