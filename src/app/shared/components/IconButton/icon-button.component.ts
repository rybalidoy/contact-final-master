import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-icon-button',
    standalone: true,
    templateUrl: './icon-button.component.html',
    styleUrl: '../../shared.css',
})
export class IconButtonComponent {
    @Input() addClasses: string = '';
}
