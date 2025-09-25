// excel-file.interface.ts
import { Observable } from 'rxjs';

export interface ExcelFile {
  id: number;
  userId: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  totalNumbers: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ExcelFileList {
  items: ExcelFile[];
}

export interface CreateExcelFileDto {
  userId: number;
  fileName: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  totalNumbers: number;
}

export interface FindOneRequest {
  id: number;
}

export interface RemoveRequest {
  id: number;
}

export interface RemoveResponse {
  success: boolean;
}

export interface Empty {}

export interface ExcelFileService {
  Create(request: CreateExcelFileDto): Observable<ExcelFile>;
  FindAll(request: Empty): Observable<ExcelFileList>;
  FindOne(request: FindOneRequest): Observable<ExcelFile>;
  Remove(request: RemoveRequest): Observable<RemoveResponse>;
}
