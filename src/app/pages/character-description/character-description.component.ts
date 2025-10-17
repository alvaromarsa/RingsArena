import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { personajesBienObjetos, personajesMalObjetos, Character } from '../../Characters/Characters.component';
import { NavbarComponent } from "../navbar/navbar.component";
import { CharacterStateService } from '../../Services/CharacterState.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'character-description',
  standalone: true,
  imports: [NavbarComponent, AsyncPipe],
  templateUrl: './character-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDescriptionComponent {
  private characterStateService = inject(CharacterStateService);

  goodCharacters$: Observable<Character[]> = this.characterStateService.goodCharacters$;
  evilCharacters$: Observable<Character[]> = this.characterStateService.evilCharacters$;

  /*
    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;
  */
 }
