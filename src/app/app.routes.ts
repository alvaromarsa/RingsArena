import { Routes } from '@angular/router';
import { ViewCombatComponent } from './ViewCombat/ViewCombat.component';
import { CharacterDescriptionComponent } from './pages/character-description/character-description.component';
import { MenuComponent } from './pages/menu/menu.component';

export const routes: Routes = [

  { path: '',
    component: MenuComponent,
  },
  { path: 'descriptions',
    component: CharacterDescriptionComponent,
  },
  { path: 'viewCombat',
    component: ViewCombatComponent,
  }




];
