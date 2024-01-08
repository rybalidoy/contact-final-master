import { Component } from '@angular/core';

@Component({
    selector: 'app-error-page',
    standalone: true,
    imports: [],
    templateUrl: './error.component.html',
    styleUrl: '../app.component.css',
})
export class ErrorPageComponent {
    warningIcon: string = '/assets/icons/warning.png';
}
