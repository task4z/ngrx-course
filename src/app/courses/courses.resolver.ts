import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadAllCourses } from './course.actions';
import { AppState } from 'app/reducers/index';
import { finalize, first, tap } from 'rxjs/operators';

@Injectable()
export class CoursesResolver implements Resolve<any>{
    loading = false;
    constructor(private store: Store<AppState>){}

    resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot): Observable<any> {
        return this.store.pipe(
            tap( () =>{
                if(!this.loading){
                    this.loading = true;
                    this.store.dispatch(loadAllCourses());
                }
            }),
            first(),
            finalize(() => this.loading = false)
        );
    }

    //tap used for side effect
    //first complete the observable
    //finalize quando completa ou erra faz reset da flag
}