import { Observable } from 'rxjs';

// PhoneNumber modeli (proto bilan bir xil)
export interface PhoneNumber {
  excelFileId: number;
  phoneNumber: string;
  fullname: string;
  additionalInfo: string;
  rowNumber: number;
  countryCode: string;
  isValid: boolean;
}

// Request DTO
export interface CreateManyPhoneNumbersRequest {
  phoneNumbers: PhoneNumber[];
}

// Response DTO
export interface CreateManyPhoneNumbersResponse {
  phoneNumbers: PhoneNumber[];
}

// gRPC service interface
export interface PhoneNumberServiceClient {
  createMany( // 👈 method nomi kichkina harf bilan
    request: CreateManyPhoneNumbersRequest,
  ): Observable<CreateManyPhoneNumbersResponse>;
}
