import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  userActivated = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.activatedEmitter.subscribe(
      (value: boolean) => {
        this.userActivated = value;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
