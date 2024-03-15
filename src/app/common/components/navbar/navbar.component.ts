import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AppStatusService } from '../../services/app-status.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'alten-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  loading = false;
  loadingInput = new FormControl(false)

  constructor(private appStatusService: AppStatusService) {

    this.appStatusService.getIsLoading().pipe(takeUntilDestroyed()).subscribe(val => {
      this.loading = val
    })
    
    this.loadingInput.valueChanges.pipe(takeUntilDestroyed()).subscribe(val => {
      this.appStatusService.setIsLoading(val!)
    })
  }
}
