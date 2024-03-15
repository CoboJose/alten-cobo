import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, sampleTime, throttleTime } from 'rxjs';
import { Hero } from '../../models/Hero';
import { HeroesService } from '../../services/heroes.service';
import { HeroesEditComponent } from '../heroes-edit/heroes-edit.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'alten-heroes-dashboard',
  templateUrl: './heroes-dashboard.component.html',
  styleUrl: './heroes-dashboard.component.scss'
})
export class HeroesDashboardComponent {

  searchInput = new FormControl("")
  tableHeroes: Observable<Hero[]>

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog
  ) {
    this.tableHeroes = this.heroesService.getFilteredHeroes()
    this.searchHeroesUpdates()

  }

  searchHeroesUpdates() {
    this.searchInput.valueChanges
      .pipe(
        takeUntilDestroyed(),
        sampleTime(200)
        )
      .subscribe(searchText => {
        this.heroesService.setSearchText(searchText)
      })
  }

  createHero() {
    this.dialog.open(HeroesEditComponent, {data: {hero: null}, disableClose: true})
  }

}
