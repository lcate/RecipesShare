import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../Environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  public upload(formData: FormData) {
    return this.httpClient.post(`${this.baseUrl}/api/file/upload`, formData, {
        reportProgress: true,
        observe: 'events',
    });
  }

  public download(fileUrl: string) {
    return this.httpClient.get(`${this.baseUrl}/api/file/download?fileUrl=${fileUrl}`, {
        reportProgress: true,
        responseType: 'blob',
    });
  }
}
