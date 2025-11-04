import { Component, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';


import { CharacterSelectionService } from '../../Services/CharacterSelection.service';
import { Character, CombateLog, Pareja } from '../../Characters/Characters.component';
import { RandomNumberService } from '../../Services/RandomNumber.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { CombatTournamentService } from '../../Services/CombatTournament';



@Component({
  selector: 'tournament',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './tournament.component.html',

})
export class TournamentComponent {

  private goodCharacterService = inject(CharacterSelectionService);
  private RandomNumberService = inject(RandomNumberService);
  combatService = inject(CombatTournamentService);

  combate = this.combatService.combateIniciado

  muerte = this.combatService.estaMuerto$;

  resultado2 = this.combatService.resultados$

  goodCharacters$: Observable<Character[]> = this.goodCharacterService.getClonedGoodCharacters();
  evilCharacters$: Observable<Character[]> = this.goodCharacterService.getClonedEvilCharacters();

  personajesBuenos: Character[] = [];
  personajesMalos: Character[] = [];

  parejasDeBatalla: Pareja[] = [];

  combateActivo: Pareja | null = null;
  logDeCombate$: Observable<CombateLog> | null = null;
  combateSubscription: Subscription | null = null;

  ngOnInit(): void {
    // Suscribirse a los personajes del Bien

}

  characterSelectionTournament():void {

    this.parejasDeBatalla = [];
    this.ganadoresRonda1 = [];
    this.finalWinner = null;
    this.tournamentFinished = false;
    this.combateActivo = null;

    this.goodCharacters$.subscribe(clones => {
        this.personajesBuenos = clones;
        console.log('Clon de personajes buenos cargado. Total:', this.personajesBuenos.length);

    });

    // Suscribirse a los personajes del Mal
    this.evilCharacters$.subscribe(clones => {
        this.personajesMalos = clones;
        console.log('Clon de personajes malos cargado. Total:', this.personajesMalos.length);
    });

    if (this.personajesBuenos.length === 0 || this.personajesMalos.length === 0) {
      console.warn("No quedan personajes suficientes para un emparejamiento.");
      return;
    }

    const numeroPersonajes : number = this.personajesBuenos.length;

    for(let i = 0; i < numeroPersonajes; i++){

    const indiceBuenPersonaje = this.RandomNumberService.obtenerIndiceAleatorio(this.personajesBuenos);
    const indiceMalPersonaje = this.RandomNumberService.obtenerIndiceAleatorio(this.personajesMalos);

      const personajeBuenoExtraido: Character = this.personajesBuenos.splice(indiceBuenPersonaje, 1)[0];
      const personajeMaloExtraido: Character = this.personajesMalos.splice(indiceMalPersonaje, 1)[0];

      const nuevaPareja: Pareja = {
        bueno: personajeBuenoExtraido,
        malo: personajeMaloExtraido,
        logCombate: [],
        resultadoFinal: '',
        combateTerminado: false,
        nombreGanador: ''
      };

      this.parejasDeBatalla.push(nuevaPareja);

    };

  };

   ganadoresRonda1: Character[] = [];
   numeroCombates: number = 0;

  characterSendCombat(pareja:Pareja):void {

    // 🛑 GUARDA ESTRICTA 1: Evitar iniciar si faltan combatientes
  if (!pareja.bueno || !pareja.malo) {
      console.warn("GUARDA: Intento de iniciar combate sin pareja completa.");
      return;
  }

  // 🛑 GUARDA ESTRICTA 2: Si esta pareja ya está activa y luchando, ignora la llamada.
  if (this.combateActivo === pareja && !pareja.combateTerminado) {
      console.warn("GUARDA: Combate ya en curso para esta pareja.");
      return;
  }

  pareja.logCombate = [];
  pareja.resultadoFinal = '';
  pareja.combateTerminado = false;
  pareja.nombreGanador = null;

  if (this.combateSubscription) {
    this.combateSubscription.unsubscribe();
  }
  // 1. Asignar la pareja activa para que el HTML sepa qué log mostrar
  this.combateActivo = pareja;

  // 2. Iniciar el combate en el servicio, lo que devuelve el Observable local
  this.logDeCombate$ = this.combatService.startCombat(pareja.bueno, pareja.malo);

  // 3. Suscribirse para actualizar el estado del modelo (pareja)
  this.combateSubscription = this.logDeCombate$.subscribe({
    next: (log) => {
      // ⚠️ El log solo se acumula en el modelo Pareja, el Observable 'logDeCombate$'
      //    es el que usa el HTML.
      if (log.progreso) {
        pareja.logCombate.push(log.progreso);
      }
      if (log.final) {
        pareja.resultadoFinal = log.final;
        pareja.combateTerminado = true;

        const nombrePerdedor = this.obtenerNombreDeMensajeMuerte(log.final);
        if (nombrePerdedor) {
          // El ganador es el otro personaje de la pareja
          pareja.nombreGanador = (pareja.bueno.name === nombrePerdedor) ? pareja.malo.name : pareja.bueno.name;

          const ganadorCharacter: Character = (pareja.bueno.name === pareja.nombreGanador)
            ? pareja.bueno
            : pareja.malo;

          // 3. ✅ HACER PUSH DEL OBJETO CHARACTER COMPLETO
          this.ganadoresRonda1.push(ganadorCharacter);

          this.numeroCombates += 1;
        }
      }
    },


    complete: () => {

      this.combateSubscription = null;
      this.combateActivo = null;
    }
  });


  }

  private obtenerNombreDeMensajeMuerte(mensaje: string): string | null {
  // Ej: "¡Gandalf ha muerto!" -> Queremos obtener "Gandalf"
  const match = mensaje.replace('¡', '').match(/(.+) ha muerto/i);
  return match && match.length > 1 ? match[1].trim() : null;
}

finalWinner: Character | null = null;
tournamentFinished: boolean = false;

// Lógica para crear las parejas de la Ronda 2 (en el componente controlador del torneo)
public asignacionRonda(): void{

  this.numeroCombates = 0;

  this.ganadoresRonda1.forEach(personaje => {
        // Usa una propiedad si existe, si no, usa un valor fijo como 100
        // Ejemplo asumiendo que el valor máximo es 100
        personaje.hp = personaje.maxhp;
  });

    const combatientes = [...this.ganadoresRonda1];
    this.barajarArray(combatientes); // ✅ NECESITAS IMPLEMENTAR barajarArray si aún no existe

    if (combatientes.length === 1) {
        this.finalWinner = combatientes[0];
        this.tournamentFinished = true; // Establecer el estado del torneo como finalizado
        this.parejasDeBatalla = [];// Limpiar la vista de combates
     }

    const nuevasParejas: Pareja[] = [];

    // Recorremos el array de dos en dos
    for (let i = 0; i < combatientes.length; i += 2) {

        // Asignamos las posiciones de la interfaz Pareja.
        // No importa si son 'buenos' o 'malos' aquí, solo son Combatiente A y B.
        const combatienteA: Character = combatientes[i];
        const combatienteB: Character = combatientes[i + 1];

        // 🛑 CLAVE: Creamos la nueva Pareja, rellenando todos los campos necesarios.
        nuevasParejas.push({
            bueno: combatienteA, // Posición 1: Combatiente A
            malo: combatienteB,  // Posición 2: Combatiente B
            logCombate: [],
            resultadoFinal: '',
            combateTerminado: false,
            nombreGanador: null
        });
    }

    // 🏆 Reemplazar la lista de batallas actual con la nueva ronda
    this.parejasDeBatalla = nuevasParejas;
    this.ganadoresRonda1 = []; // Limpiamos la lista de ganadores para la siguiente ronda (si aplica)


}


private barajarArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


}
