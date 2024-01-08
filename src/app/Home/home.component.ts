import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    Observable,
    Subscription,
    distinctUntilChanged,
    fromEvent,
    map,
    shareReplay,
    startWith,
    take,
} from 'rxjs';
import { Contact } from '../shared/Contact';
import { ContactService } from '../shared/contact.service';
import { ButtonComponent } from '../shared/components/Button/button.component';
import { IconButtonComponent } from '../shared/components/IconButton/icon-button.component';
import { ContainerComponent } from '../shared/components/Container/container.component';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from '../shared/components/Card/card.component';
import { TableComponent } from '../shared/components/Table/table.component';
import { FormModalComponent } from '../shared/components/forms/FormModal/form-modal.component';
import { FormComponent } from '../shared/components/forms/ContactForm/form.component';
import { ScrollService } from '../shared/scroll.service';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        CommonModule,
        ButtonComponent,
        IconButtonComponent,
        ContainerComponent,
        CardComponent,
        TableComponent,
        FormModalComponent,
        FormComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: '../app.component.css',
})
export class HomePageComponent implements OnInit, OnDestroy {
    /** Icons */
    backIcon: string = '/assets/icons/arrow_back.png';
    tileIcon: string = '/assets/icons/icon-view-tile.png';
    tableIcon: string = '/assets/icons/icon-view-table.png';

    contacts$!: Observable<Contact[]>;
    contactAddedSubscription!: Subscription;
    contactDeletedSubscription!: Subscription;
    contactEditedSubscription!: Subscription;

    scrollPosition = 0;

    constructor(
        private contactService: ContactService,
        private toastr: ToastrService,
        private scrollService: ScrollService
    ) {}

    // Toast
    showSuccess(action: string) {
        switch (action) {
            case 'Create':
                this.toastr.success('Successfully added a new contact');
                return;
            case 'Edit':
                this.toastr.success('Changes Saved');
        }
    }

    // showToaster(action: string) {
    //     this.toastr
    //         .success()
    //         .onTap.pipe(take(1))
    //         .subscribe(() => {
    //             this.showSuccess();
    //         });
    // }

    /** Scroll position */
    // scrollPosition$ = fromEvent(window, 'scroll').pipe(
    //     map(() => window.scrollY),
    //     startWith(window.scrollY),
    //     distinctUntilChanged(),
    //     shareReplay(1)
    // );

    ngOnInit() {
        //Refreshes the data when requests are made
        this.contacts$ = this.contactService.fetchAll();
        this.contactAddedSubscription =
            this.contactService.contactAdded$.subscribe(() => {
                this.contacts$ = this.contactService.fetchAll();
            });
        this.contactEditedSubscription =
            this.contactService.contactEdited$.subscribe(() => {
                this.contacts$ = this.contactService.fetchAll();
            });
        this.contactDeletedSubscription =
            this.contactService.contactDeleted$.subscribe(() => {
                this.contacts$ = this.contactService.fetchAll();
            });

        // this.scrollPosition$.subscribe((position) => {
        //     console.log('Current scroll position:', position);
        // });
        this.applyScrollPosition();
    }

    applyScrollPosition() {
        this.scrollService.scrollPosition$.subscribe((position) => {
            this.scrollPosition = position;
        });
    }

    ngOnDestroy(): void {
        this.contactAddedSubscription.unsubscribe();
        this.contactDeletedSubscription.unsubscribe();
        this.contactEditedSubscription.unsubscribe();
    }

    /** Condition for Layout */
    private isGrid: boolean = true;

    /** Set View */
    setIsGrid(state: boolean) {
        this.isGrid = state;
        localStorage.setItem('isGrid', JSON.stringify(state));
    }

    getIsGrid(): boolean {
        const state = localStorage.getItem('isGrid');
        return state ? JSON.parse(state) : this.isGrid;
    }

    isModalOpen: boolean = false;
    isEdit: boolean = false;
    selectedId: number | null = null;

    /** Set Modal state */
    toggleModal() {
        this.isModalOpen = !this.isModalOpen;
        this.isEdit = false;
        this.selectedId = null;
    }

    /** Actions */
    handleDelete(id: number): void {
        this.contactService.deletedContact(id).subscribe();
    }

    handleEdit(id: number): void {
        if (id !== null) {
            this.toggleModal();
            this.selectedId = id;
            this.isEdit = true;
        }
    }

    getSelectedId() {
        return this.selectedId;
    }
}
