import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../models/Hero';
import { AVATAR_OPTIONS, HeroesFormService } from '../../services/heroes-form.service';
import { FormGroup } from '@angular/forms';
import { HERO_CONTROLS } from '../../services/heroes-form.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroes-edit',
  templateUrl: './heroes-edit.component.html',
  styleUrl: './heroes-edit.component.scss'
})
export class HeroesEditComponent {

  heroForm: FormGroup
  HERO_CONTROLS = HERO_CONTROLS
  readonly AVATARS = Object.values(AVATAR_OPTIONS);

  constructor(
    private dialog: MatDialogRef<HeroesEditComponent>,
    private heroFormService: HeroesFormService,
    private heroService: HeroesService,
    @Inject(MAT_DIALOG_DATA) public data: {hero: Hero | null}
  ) {

    this.heroForm = this.heroFormService.init(data.hero);
  }

  cancel() {
    this.dialog.close()
  }

  save() {
    if (this.heroFormService.isFormValid()) {
      this.heroService.saveHero(this.heroFormService.getHeroFromForm()).subscribe(res => {
        this.dialog.close(res)
      })
    }
  }


}
