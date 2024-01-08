import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContactService } from '../../contact.service';
import { Contact } from '../../Contact';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IconButtonComponent } from '../IconButton/icon-button.component';
import { PhoneFormatter } from '../../pipes/phone-format.pipe';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [CommonModule, RouterLink, IconButtonComponent, PhoneFormatter],
    templateUrl: './table.component.html',
    styleUrl: '../../shared.css',
})
export class TableComponent {
    @Input() contacts!: Contact[] | null;
    @Input() handleDelete!: (id: number) => void;
    @Output() handleEdit = new EventEmitter();

    dataKeys: string[] = [];

    constructor(private contactService: ContactService) {}

    onDelete(id: number | null) {
        if (id !== null) {
            this.handleDelete(id);
        }
    }

    onEdit(id: number | null) {
        if (id !== null) {
            this.handleEdit.emit(id);
        }
    }

    trashIcon: string = '/assets/icons/trash_outline.png';
    editIcon: string = '/assets/icons/edit_icon.png';
}
