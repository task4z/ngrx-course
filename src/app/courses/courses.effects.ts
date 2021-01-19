import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { concatMap, map } from 'rxjs/operators';
import { CourseActions } from '../courses/action-types'
import { allCoursesLoaded } from './course.actions';
import { CoursesHttpService } from './services/courses-http.service';

@Injectable()
export class CoursesEffects {

    loadeCourses$ = createEffect(
        () => this.actions$.pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => 
                this.courses.findAllCourses()),
            map(courses => allCoursesLoaded({courses}))
            )
    );

    constructor(private actions$: Actions,
        private courses: CoursesHttpService){}
}