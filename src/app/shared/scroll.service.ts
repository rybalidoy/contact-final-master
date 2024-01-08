import { Injectable } from '@angular/core';
import {
    Observable,
    distinctUntilChanged,
    fromEvent,
    map,
    shareReplay,
    startWith,
} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ScrollService {
    public scrollPosition$: Observable<number> = fromEvent(
        window,
        'scroll'
    ).pipe(
        map(() => window.scrollY),
        startWith(window.scrollY),
        distinctUntilChanged(),
        shareReplay(1)
    );
}
