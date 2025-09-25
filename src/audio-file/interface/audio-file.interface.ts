// audio-file.interface.ts
import { Observable } from 'rxjs';

export interface AudioFile {
  id: number;
  userId: number;
  fileName: string;
  originalName: string;
  filePath: string;
  durationSec: number;
  format: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AudioFileList {
  items: AudioFile[];
}

export interface CreateAudioFileDto {
  userId: number;
  fileName: string;
  originalName: string;
  filePath: string;
  durationSec: number;
  format: string;
  fileSize: number
}

export interface FindOneRequest {
  id: number;
}

export interface RemoveRequest {
  id: number;
}

export interface RemoveResponse {
  success: boolean;
  message: string;
}

export interface Empty {}

export interface AudioFileService {
  Create(request: CreateAudioFileDto): Observable<AudioFile>;
  FindAll(request: Empty): Observable<AudioFileList>;
  FindOne(request: FindOneRequest): Observable<AudioFile>;
  Remove(request: RemoveRequest): Observable<RemoveResponse>;
}
