import { Injectable } from '@angular/core';
import { Hero } from '../models/Hero';
import { FormControl, FormGroup, Validators } from '@angular/forms';


export enum HERO_CONTROLS {
    NAME = "name",
    DESCRIPTION = "description",
    AVATAR = "avatar"
}

export enum AVATAR_OPTIONS {
    batman = "batman",
    spiderman = "spiderman",
    superman = "superman"
}

@Injectable({ providedIn: 'root' })
export class HeroesFormService {

    public hero: Hero
    public form: FormGroup

    public init(hero: Hero | null): FormGroup {
        this.hero = hero ? hero : new Hero()
        this.initForm()

        return this.form;
    }

    private initForm(): void {
        this.form = new FormGroup({
            name: new FormControl(this.hero.name, Validators.required),
            description: new FormControl(this.hero.description, Validators.required),
            avatar: new FormControl(this.hero.avatarImg),
        })
    }

    public isFormValid(): boolean {
        this.form.markAllAsTouched();
        return this.form.valid;
    }

    public getHeroFromForm(): Hero {
        return {
            id: this.hero.id,
            name: this.form.get(HERO_CONTROLS.NAME)?.value.trim().toUpperCase(),
            description: this.form.get(HERO_CONTROLS.DESCRIPTION)?.value,
            avatarImg: this.form.get(HERO_CONTROLS.AVATAR)?.value,
        }
    }

}
