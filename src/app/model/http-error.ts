import { HttpErrorResponse as NgHttpErrorResponse } from '@angular/common/http';

export interface HttpError {
  sqlErrono?: number;
  sqlMessage?: string;
  message: string;
  status: number;
  error?: string;
}

export interface HttpErrorResponse extends NgHttpErrorResponse {
  error: HttpError;
}
