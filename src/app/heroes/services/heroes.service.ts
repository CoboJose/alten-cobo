import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, Subject, of, throwError } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Hero } from '../models/Hero';


@Injectable({ providedIn: 'root' })
export class HeroesService {

    private heroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([])
    private filteredHeroes: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([])

    constructor() {
        this.createInitialData()
    }

    getHeroes(): Observable<Hero[]> {
        return this.heroes.asObservable()
    }

    getFilteredHeroes(): Observable<Hero[]> {
        return this.filteredHeroes.asObservable()
    }

    getHeroById(id: number): Observable<Hero> {
        const hero = this.heroes.value.find(h => h.id === id);

        if (!hero) {
            throw throwError(() => new Error("Hero not found"))
        }

        return of(hero)
    }


    saveHero(hero: Hero): Observable<boolean> {
        return hero.id ? this.updateHero(hero) : this.createHero(hero)
    }

    createHero(hero: Hero): Observable<boolean> {
        hero.id = (new Date()).getTime()
        const heroesArray = this.heroes.value.concat(hero)

        this.updateHeroesArrays(heroesArray)

        return of(true)
    }

    updateHero(hero: Hero): Observable<boolean> {
        const heroesArray = this.heroes.value
        const heroIndex = heroesArray.findIndex(h => h.id == hero.id)
        heroesArray[heroIndex] = hero

        this.updateHeroesArrays(heroesArray)

        return of(true)
    }


    deleteHero(id: number): Observable<boolean> {
        const heroesArray = this.heroes.value.filter(h => h.id !== id)
        this.updateHeroesArrays(heroesArray)
        return of(true);
    }


    setSearchText(searchText: string | null) {
        searchText = searchText ? searchText.trim().toUpperCase() : null
        this.filteredHeroes.next(this.heroes.value.filter(h => searchText ? h.name.toUpperCase().includes(searchText) : true))
    }

    private updateHeroesArrays(heroes: Hero[]) {
        this.heroes.next(heroes)
        this.filteredHeroes.next(heroes)
    }

    private createInitialData() {
        const data = [
            {
                id: 1, 
                name: "BATMAN",
                description: "The bat hero of Gotham City",
                avatarImg: "batman"
            },
            {
                id: 2,
                name: "SPIDERMAN",
                description: "Your friend and neighbour from New York",  
                avatarImg: "spiderman"
            },
            {
                id: 3,
                name: "SUPERMAN",
                description: "Flying in Metropolis",  
                avatarImg: "superman"
            },
            {
                id: 4,
                name: "STARLIGHT",
                description: "Rebecca Anne Annie January",  
                avatarImg: null
            },
            {
                id: 5,
                name: "DEADPOOL",
                description: "Large text to test Large text to test Large text to test Large text to test Large text to test Large text to test Large text to test Large text to test Large text to test",  
                avatarImg: null
            }
        ]

        this.heroes.next(data)
        this.filteredHeroes.next(data)
    }
}
