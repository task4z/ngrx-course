import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { AuthActions } from "./action-types";
import { tap } from "rxjs/operators";
import { Router } from "@angular/router";


@Injectable()
export class AuthEffects {

  //trata o erro e faz o subscribe
  login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.login),
        tap( action => localStorage.setItem('user', JSON.stringify(action.user)))
    ),
    {dispatch: false}
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap( action => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    ),
    {dispatch: false}
  );

  constructor(private actions$: Actions,
      private router: Router) {
      //  this.actions$.pipe(
      //     ofType(AuthActions.login),
      //     tap( action => {
      //         localStorage.setItem('user', JSON.stringify(action.user));
      //     })
      // );
      // login$.subscribe();

      // actions$.subscribe( action =>{

      //     if(action.type === '[Login Page] User Login') {
      //         localStorage.setItem('user', JSON.stringify(action['user']));
      //     }
      // });
  }
}