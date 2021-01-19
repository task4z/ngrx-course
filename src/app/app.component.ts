import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map, distinct} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { logout, login } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;

    public isLoggedIn$: Observable<boolean>;
    public isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>) {

    }

    ngOnInit() {

      const userProfile = localStorage.getItem('user');

      if(userProfile) {
        this.store.dispatch(login({user:JSON.parse(userProfile)}))
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
      );
        //select === distinctUntilChanged remove duplicados
        // selector serve para não repetir chamadas se o input nao mudar
      this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut)
      );

      this.store.subscribe(state => console.log("Store value", state));
    }

    logout() {
      this.store.dispatch(logout());
    }

}
