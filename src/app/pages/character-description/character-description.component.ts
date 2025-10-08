import { ChangeDetectionStrategy, Component } from '@angular/core';

import { personajesBienObjetos, personajesMalObjetos, Character } from '../../Characters/Characters.component';

@Component({
  selector: 'character-description',
  standalone: true,
  imports: [],
  templateUrl: './character-description.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDescriptionComponent {

    personajesBien: Character[] = personajesBienObjetos;
    personajesMal: Character[] = personajesMalObjetos;

 }
