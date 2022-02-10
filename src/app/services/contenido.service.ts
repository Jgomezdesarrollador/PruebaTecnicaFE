import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContenidoService {
  private myAppUrl = "http://localhost:27023/";
  private myApiUrl = "api/Catalogo/";

  constructor(private http: HttpClient) { }

  getListContenido(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteContenido(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id);
  }

  saveContenido(contenido: any): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl,contenido);
  }

  updateContenido(id:number, contenido:any):Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, contenido)
  }

}
