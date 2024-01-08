import { Component } from '@angular/core';
import { Contact } from '../shared/Contact';
import { ContactService } from '../shared/contact.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IconButtonComponent } from '../shared/components/IconButton/icon-button.component';
import { PhoneFormatter } from '../shared/pipes/phone-format.pipe';
import { LocationStrategy } from '@angular/common';

@Component({
    selector: 'app-details-page',
    standalone: true,
    imports: [IconButtonComponent, PhoneFormatter],
    templateUrl: './details.component.html',
    styleUrl: '../app.component.css',
})
export class DetailsPageComponent {
    private data!: Observable<Contact>;
    contact!: Contact;
    private id: string | null = null;

    constructor(
        private contactService: ContactService,
        private route: ActivatedRoute,
        private locationStrategy: LocationStrategy
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        if (this.id !== null) {
            this.data = this.contactService.fetchById(parseInt(this.id));
            if (this.data !== undefined) {
                this.data.subscribe((data) => {
                    this.contact = data;
                });
            }
        }
    }

    goBack() {
        this.locationStrategy.back();
    }

    backArrowIcon: string = '/assets/icons/arrow_back.png';
}
