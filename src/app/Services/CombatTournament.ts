import { inject, Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs';


import { CharacterSelectionService } from './CharacterSelection.service';
import { Character, Pareja } from '../Characters/Characters.component';
import { RandomNumberService } from './RandomNumber.service';
import { CombateLog } from '../Characters/Characters.component';


@Injectable({
  providedIn: 'root'
})
export class CombatTournamentService {

  combateIniciado = false;
  characterSelection = inject(CharacterSelectionService);
  estaMuerto$ = new Subject<string>();
  public resultadosArray: string[] = [];
  public resultados$ = new Subject<string[]>();
  public selectedClones: Character[] = [];

public startCombat(p1: Character, p2: Character): Observable<CombateLog> {

    // 1. Crear el Subject LOCAL para este combate
    const combateSubject = new Subject<CombateLog>();

    const combateID: any = setInterval(() => {


      if (p1.hp <= 0 || p2.hp <= 0) {

            clearInterval(combateID); // Doble seguridad
            combateSubject.complete();
            return;
      }
        let whoAttacks = this.randomNumberService.eleccionDanio();
        let dodgeRandom: number = Number((Math.random()).toFixed(2));
        let ataqueConectado = true;

        // Determinar atacante y defensor
        let atacante = whoAttacks === 1 ? p1 : p2;
        let defensor = whoAttacks === 1 ? p2 : p1;


        // --- LÓGICA DE ESQUIVA (Tu lógica original) ---
        if (defensor.dodge !== undefined && dodgeRandom <= defensor.dodge) {

          ataqueConectado = false;
            const logLine = `${defensor.name} ha esquivado el ataque de ${atacante.name}`;

            combateSubject.next({ progreso: logLine, final: null });
            return;

        }
        if (ataqueConectado) {

            // 3. Ataque: Llamar a la lógica de daño
            const resultadoMuerte = this.applyDamage(atacante, defensor, combateID);

            // 5. Si hay muerte, emitir el mensaje final y CERRAR el Subject
            if (resultadoMuerte.muerte) {

              const mensajeCompletoLog = `${resultadoMuerte.log}. ${resultadoMuerte.muerte}`;

              combateSubject.next({ progreso: resultadoMuerte.log, final: null });
                // Emitir línea de muerte
                combateSubject.next({
                    progreso: resultadoMuerte.muerte, // El log completo para la lista
                    final: resultadoMuerte.muerte // ✅ CLAVE: Marcador de fin de combate
                });

                combateSubject.complete(); // 🛑 Detiene la emisión y el flujo del Observable
            }
            else {

                // 2. Si no hay muerte, se mantiene la emisión de daño normal
                combateSubject.next({ progreso: resultadoMuerte.log, final: null });
            }
        }

    }, 3000);

    // 6. Devolver el Observable local
    return combateSubject.asObservable();
}


private applyDamage(atacante: Character, defensor: Character, interval: number): { log: string, muerte: string | null } {

    // 1. Aplicar el daño
    defensor.hp = defensor.hp - atacante.damage;

    // 2. Crear la línea de log
    const logLine = `${atacante.name} ha causado ${atacante.damage} puntos de daño a ${defensor.name}.`;

    let mensajeMuerte: string | null = null;

    // 3. Verificar la muerte (Tu lógica original de if (p2.hp <= 0))
    if (defensor.hp <= 0) {
        defensor.isAlive = false;
        mensajeMuerte = `${defensor.name} ha muerto`;

        // Detener el intervalo cuando el defensor muere
        clearInterval(interval);
    }

    // 4. Devolver el resultado
    return { log: logLine, muerte: mensajeMuerte };
}



  public cleanCombatText (): void{
    this.resultados$.next([]);

    // Limpia el mensaje de muerte
    this.estaMuerto$.next('');

    // (Opcional) Reinicia la bandera de combate si es necesario
    this.combateIniciado = false;

  }
  constructor(private randomNumberService : RandomNumberService) { }

}
