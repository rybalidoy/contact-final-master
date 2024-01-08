import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-container',
    standalone: true,
    templateUrl: './container.component.html',
    styleUrl: '../../shared.css',
})
export class ContainerComponent {
    @Input() addClasses: string = '';
}
