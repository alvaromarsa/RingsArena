import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RandomNumberService } from '../Services/RandomNumber.service';

@Component({
  selector: 'view-combat',
  standalone: true,
  imports: [],
  templateUrl: './ViewCombat.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewCombatComponent {

  private RandomNumberInyect =inject(RandomNumberService);
  randomNumber = this.RandomNumberInyect.eleccionDanio();


 }
