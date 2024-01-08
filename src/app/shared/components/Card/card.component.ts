import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconButtonComponent } from '../IconButton/icon-button.component';
import { RouterLink } from '@angular/router';
import { Contact } from '../../Contact';
import { ContactService } from '../../contact.service';
import { PhoneFormatter } from '../../pipes/phone-format.pipe';

@Component({
    selector: 'app-card',
    standalone: true,
    imports: [IconButtonComponent, RouterLink, PhoneFormatter],
    templateUrl: './card.component.html',
    styleUrl: '../../shared.css',
})
export class CardComponent {
    @Input() data!: Contact;
    @Output() handleEdit = new EventEmitter();
    // Is not two-way binding since I only use emit to pass id then load data from home component
    // then is passed on the model as data
    // Since data is not being edited here in the card same with the table view

    @Input() handleDelete!: (id: number) => void;

    constructor(private contactService: ContactService) {}

    onDelete(id: number | null) {
        if (id !== null) {
            this.handleDelete(id); //Triggering the method
        }
    }
    //Stick to one procedure for uniformity
    onEdit(id: number | null) {
        if (id !== null) {
            this.handleEdit.emit(id); //Passing
        }
    }

    //Icons
    trashIcon: string = '/assets/icons/trash_outline.png';
    editIcon: string = '/assets/icons/edit_icon.png';
}
