import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Hero } from '../../models/Hero';
import { Observable, ReplaySubject, map } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { HeroesService } from '../../services/heroes.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../../common/components/dialog/dialog.component';
import { ConfirmationDialogComponent } from '../../../common/components/confirmation-dialog/confirmation-dialog.component';
import { HeroesEditComponent } from '../heroes-edit/heroes-edit.component';

@Component({
  selector: 'alten-heroes-table',
  templateUrl: './heroes-table.component.html',
  styleUrl: './heroes-table.component.scss'
})
export class HeroesTableComponent {
  @Input() heroesObervable: Observable<Hero[]>

  displayedColumns: string[] = ['img', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<Hero>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private heroesService: HeroesService,
    private dialog: MatDialog
    ) {}

  ngOnInit() {
    this.heroesObervable.subscribe(heroes => {
        this.dataSource.data = heroes ? heroes : [];
        this.dataSource.paginator = this.paginator;
    });
  }

  editHero(hero: Hero) {
    this.dialog.open(HeroesEditComponent, {data: {hero: hero}, disableClose: true})
  }


  deleteHero(heroId: number) {
    this.dialog.open(ConfirmationDialogComponent, {data: {title: "Delete Hero", content: "Are you sure you want to delete the hero?"}})
      .afterClosed().subscribe(res =>  {
        if (res) this.heroesService.deleteHero(heroId)
      })
    
  }

}