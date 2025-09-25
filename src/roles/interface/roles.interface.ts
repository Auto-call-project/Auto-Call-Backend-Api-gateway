import { Observable } from 'rxjs';

// gRPC RolesService definition
export interface RolesService {
  CreateRole(request: CreateRoleDto): Observable<Role>;
  UpdateRole(request: UpdateRoleDto): Observable<Role>;
  FindOneRole(request: GetRoleById): Observable<Role>;
  FindAllRoles(request: Empty): Observable<RolesList>;
  DeleteRole(request: GetRoleById): Observable<DeleteResponse>;
}

// Role model
export interface Role {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  updatedAt: string; // ISO date string
  createdAt: string; // ISO date string
}

// Create Role request
export interface CreateRoleDto {
  name: string;
  description: string;
  isActive?: boolean; // optional, default: true
  roles?: number[]; // optional array of role IDs
}

// Update Role request
export interface UpdateRoleDto {
  id: number;
  name?: string;
  description?: string;
  isActive?: boolean;
}

// Helpers
export interface GetRoleById {
  id: number;
}

export interface RolesList {
  roles: Role[];
}

export interface DeleteResponse {
  message: string;
}

export interface Empty {}
