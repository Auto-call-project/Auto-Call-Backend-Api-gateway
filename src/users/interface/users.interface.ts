import { Observable } from "rxjs";


export interface UsersRequest {
  fullName?: string; // optional → foydalanuvchi to‘liq ismi
  username: string; // majburiy, unique
  email: string; // majburiy, unique
  phone?: string; // optional → foydalanuvchi raqami
  password: string; // majburiy, plain password (hash DBda saqlanadi)
  roles: number[]; // majburiy, role id lar array ko‘rinishida
}

export interface UsersResponse {
   id: number;
  fullname: string;
  username: string;
  email: string;
  phone: string;
  password_hash: string;
  is_active: boolean;
  refresh_token_hash: string;
  last_login_at: Date;
  failed_login_attempts: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface updateUserRequest {
  id: number;
  fullName?: string; // optional → foydalanuvchi to‘liq ismi
  username?: string; // majburiy, unique
  email?: string; // majburiy, unique
  phone?: string; // optional → foydalanuvchi raqami
}

export interface UsersService {
  signUpUsers(data: UsersRequest): Observable<UsersResponse>;
  findAllUsers({}): Observable<{ users: UsersResponse[] }>;
  findOneUser(data: {id: number}): Observable<{ user: UsersResponse }>;
  deleteOneUser(data: {id: number}): Observable<{ user: UsersResponse }>;
  updateUser(data: updateUserRequest): Observable<{ user: UsersResponse }>;
}