import { Observable } from 'rxjs';

// --- Requests ---
export interface SignUpRequest {
  fullname?: string;
  username: string;
  email: string;
  phone?: string;
  password: string;
  roles: number[];
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

export interface SignOutRequest {
  refreshToken: string;
}

// --- Responses ---
export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  id: number;
  failed_login_attempts: number;
}

export interface SignUpResponse {
  id: string;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  refresh_token_hash: string;
  failed_login_attempts: number;
  last_login_at: string;
  createdAt: string;
  updatedAt: string;
}

export interface SignOutResponse {
  message: string;
}

// --- gRPC Service ---
export interface AuthService {
  signUp(request: SignUpRequest): Observable<SignUpResponse>;
  signIn(request: SignInRequest): Observable<AuthResponse>;
  signOut(request: SignOutRequest): Observable<SignOutResponse>;
  refreshToken(request: RefreshRequest): Observable<AuthResponse>;
}
