export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  phone?: string;
}

export interface AuthUser {
  id: number;
  email: string;
  name: string | null;
  role: string;
  phone: string | null;
  password?: string | null; 
}

export interface AuthResponse {
  user: AuthUser;
}
