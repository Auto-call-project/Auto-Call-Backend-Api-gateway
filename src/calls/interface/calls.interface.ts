import { Observable } from "rxjs";


export interface CallRequest {
  hello: string;
}

export interface CallResponse {
  success: boolean;
  message: string;
}

export interface CallsService {
  MakeCall(data: CallRequest): Observable<CallResponse>;
}
