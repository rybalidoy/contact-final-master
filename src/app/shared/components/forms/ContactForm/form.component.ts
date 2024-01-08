import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../Button/button.component';
import { PhoneFormatter } from '../../../pipes/phone-format.pipe';
import { ContactService } from '../../../contact.service';
import { Contact } from '../../../Contact';
// Imports should coupled
// Modules -- similar components
// Bunch

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ButtonComponent,
        PhoneFormatter,
    ],
    templateUrl: './form.component.html',
    styleUrl: '../form.css',
})
export class FormComponent implements OnInit {
    @Input() isEdit!: boolean;
    @Input() selectedId: number | null = null;
    @Output() closeModal = new EventEmitter();
    @Output() toastSuccess = new EventEmitter();

    /** Toast Output  */
    @Output() crudEvent = new EventEmitter();

    constructor(private contactService: ContactService) {}

    contact!: Contact;

    //Create
    contactForm = new FormGroup({
        name: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
            Validators.required,
            Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
            Validators.pattern(/^([0-9]{11})$/),
        ]),
    });

    ngOnInit(): void {
        if (this.selectedId) {
            console.log(this.selectedId);
            this.contactService.fetchById(this.selectedId).subscribe((data) => {
                this.contact = data;

                this.contactForm = new FormGroup({
                    name: new FormControl(this.contact.name, [
                        Validators.required,
                        Validators.minLength(4),
                    ]),
                    email: new FormControl(this.contact.email, [
                        Validators.required,
                        Validators.email,
                    ]),
                    phone: new FormControl(this.contact.phone, [
                        Validators.required,
                        Validators.pattern(/^(\+?\d{1,3}[- ]?)?\d{10}$/),
                        Validators.pattern(/^([0-9]{11})$/),
                    ]),
                });
            });
        }
    }

    onSubmit() {
        if (this.isEdit && !this.isFormInvalid()) {
            this.editContact();
            this.toastSuccess.emit('Edit');
            this.onCancel();
        } else if (!this.isEdit && !this.isFormInvalid()) {
            this.createContact();
            this.toastSuccess.emit('Create');
            this.onCancel();
        } else {
        }
    }

    onCancel() {
        this.closeModal.emit();
        this.isEdit = false;
    }

    private editContact() {
        if (this.contactForm.invalid) {
            // Handle invalid form
        } else {
            const newContact: Contact = {
                id: this.contact.id,
                name: this.contactForm.value.name || '',
                email: this.contactForm.value.email || '',
                phone: this.contactForm.value.phone || '',
            };

            // Handle valid form
            if (this.contact.id !== null) {
                this.contactService.editContact(this.contact.id, newContact);
            }
            this.crudEvent.emit('Changes Saved');
        }
    }

    private createContact() {
        if (this.contactForm.invalid) {
            // Handle invalid form
        } else {
            const newContact: Contact = {
                id: null,
                name: this.contactForm.value.name || '',
                email: this.contactForm.value.email || '',
                phone: this.contactForm.value.phone || '',
            };

            console.log(this.contactForm.value.phone);

            // Handle valid form
            this.contactService.createContact(newContact);
            this.crudEvent.emit('Successfully added contact');
            // -- Should have the toast here since we need to wait for the data to be successfully saved
            // -- In the database before showing the success message
            // -- Chances that data will be concurrent/inconsistent
        }
    }
    isFormInvalid() {
        return this.contactForm.invalid;
    }
}
