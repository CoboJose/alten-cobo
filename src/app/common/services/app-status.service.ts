import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppStatusService {

    private loading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

    getIsLoading(): Observable<boolean> {
        return this.loading.asObservable()
    }

    setIsLoading(isLoading: boolean) {
        this.loading.next(isLoading)
    }

}
