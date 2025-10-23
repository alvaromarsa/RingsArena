import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, map } from 'rxjs';

import { ApiResponse } from './../Characters/Characters.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private readonly API_KEY = 'kW0Io8TJppQDAia_6N9d';
  private readonly BASE_URL = 'https://the-one-api.dev/v2';
  private readonly CHARACTER_ENDPOINT = '/character';

  constructor(private http: HttpClient) { }

  getCharactersByName(name: string): Observable<ApiResponse> {
        // 1. Unir los nombres con comas para el filtro 'include' de la API
        const encodedName = encodeURIComponent(name);

        // 2. Configurar los encabezados y la URL con el filtro
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${this.API_KEY}`
        });

        // ⚠️ El filtro se añade a la URL: ?name=Nombre1,Nombre2
        const url = `${this.BASE_URL}${this.CHARACTER_ENDPOINT}?name=${encodedName}`;

        // 3. Hacer la petición GET

        return this.http.get<ApiResponse>(url, { headers: headers }).pipe(
          map(response => {
            // Puedes agregar una pequeña comprobación aquí si quieres:
            if (!response || !response.docs) {
                console.warn('Respuesta inesperada de la API:', response);
                throw new Error('Respuesta de API inválida');
            }
            return response;
        }),
    catchError(error => {
        // Log el error completo aquí para verlo en la consola
        console.error('API Error:', error);
        return throwError(() => new Error('Error de conexión o API: ' + error.statusText));
        })
      );
    }

}
