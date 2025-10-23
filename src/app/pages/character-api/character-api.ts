import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../../Services/ApiService';
import { ActivatedRoute } from '@angular/router';

import { ApiResponse, ApiCharacter } from '../../Characters/Characters.component';
import { Observable, switchMap, tap } from 'rxjs';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'character-api',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './character-api.html',
})
export class CharacterApi implements OnInit{


  //private lotrApi = inject(ApiService);

  nombrePersonaje: string | null = null;
  datosApi: ApiCharacter | null = null;
  cargando: boolean = true;
  error: string | null = null;


  constructor(
    private route: ActivatedRoute, // Para leer la URL
    private lotrService: ApiService, // Para la API
  ) { }

 ngOnInit(): void {
        this.cargando = true; // Inicia la carga

        this.route.paramMap.pipe(
            // 1. Obtiene el parámetro 'name' de la URL
            tap(params => {
                this.nombrePersonaje = params.get('name');
            }),
            // 2. switchMap: Llama al servicio con el nombre obtenido.
            // Esto anida la llamada a la API dentro del observable de la ruta.
            switchMap(params => {
                const name = params.get('name');
                if (!name) {
                    // Si no hay nombre, devuelve un Observable vacío para no proceder
                    this.error = 'No se encontró el parámetro de nombre en la URL.';
                    this.cargando = false;

                    return new Observable<ApiResponse>();
                }
                console.log(`Llamando a la API con nombre: ${name}`);
                return this.lotrService.getCharactersByName(name);
            })
        ).subscribe({
            next: (response: ApiResponse) => {

                // Se ejecuta cuando la llamada a la API termina (200 OK)
                if (response.docs && response.docs.length > 0) {

                    this.datosApi = response.docs[0];
                    this.error = null;
                } else {

                    this.datosApi = null;
                    this.error = `Personaje "${this.nombrePersonaje}" no encontrado o nombre inexacto.`;
                }

                this.cargando = false; // 🛑 Detiene la carga
            },
            error: (err) => {
                // Se ejecuta si hay error HTTP (ej., 401) o error de RxJS
                this.error = 'Error al cargar los datos. Revisa la consola para detalles de la API.';
                this.cargando = false; // 🛑 Detiene la carga
                console.error('Error final en suscripción:', err);
            }
        });
    }

 }
