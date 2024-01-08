import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
} from '@angular/core';
import { FormComponent } from '../ContactForm/form.component';

@Component({
    selector: 'app-form-modal',
    standalone: true,
    imports: [FormComponent],
    templateUrl: './form-modal.component.html',
    styleUrl: '../form.css',
})
export class FormModalComponent {
    @Input() isOpen!: boolean;
    @Output() closeModal = new EventEmitter();

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        if (
            event.target ===
            this.elementRef.nativeElement.querySelector(
                '.flex.items-center.justify-center'
            )
        ) {
            console.log('Clicked on the component element');
            this.onCancel();
        }
    }

    onCancel() {
        this.closeModal.emit();
    }

    constructor(private elementRef: ElementRef) {}
}
