import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";
import { select, Store } from "@ngrx/store";
import { tap } from "rxjs/operators";

@Injectable()
export class AuthGuard implements CanActivate {
    
    constructor(private store: Store<AppState>,
        private router: Router){
    }

    canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot) :
    Observable<boolean>{
        return this.store.pipe(
            select(isLoggedIn),
            tap( loggedIn => {
                if(!loggedIn){
                    this.router.navigate(['login']);
                }
            })
        )
    }
    //tap used for side effects
}