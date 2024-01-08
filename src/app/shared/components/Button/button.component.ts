import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button',
    standalone: true,
    templateUrl: './button.component.html',
    styleUrl: '../../shared.css',
})
export class ButtonComponent {
    @Input() buttonType: string = 'text';
    @Input() props: string = '';
    @Input() addClasses: string = '';
}
