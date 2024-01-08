import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from './Contact';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ContactService {
    private readonly API_URL = 'http://localhost:3000/contacts';

    // Sources
    private contactAddedSource = new Subject<Contact>();
    private contactDeletedSource = new Subject<void>();
    private contactEditedSource = new Subject<Contact>();

    contactAdded$ = this.contactAddedSource.asObservable();
    contactDeleted$ = this.contactDeletedSource.asObservable();
    contactEdited$ = this.contactEditedSource.asObservable();

    constructor(private http: HttpClient) {}

    fetchAll(): Observable<Contact[]> {
        return this.http.get<Contact[]>(this.API_URL);
    }

    fetchById(id: number): Observable<Contact> {
        return this.http.get<Contact>(`${this.API_URL}/${id}`);
    }

    createContact(contact: Contact): void {
        this.http.post<Contact>(this.API_URL, contact).subscribe({
            next: (newContact: Contact) => {
                this.contactAddedSource.next(newContact);
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                console.log('Request completed successfully.');
            },
        });
    }

    editContact(id: number, contact: Contact): void {
        this.http.put<Contact>(`${this.API_URL}/${id}`, contact).subscribe({
            next: (newContact: Contact) => {
                this.contactEditedSource.next(newContact);
            },
            error: (error) => {
                console.error(error);
            },
            complete: () => {
                console.log('Request completed successfully.');
            },
        });
    }

    deletedContact(id: number): Observable<Contact> {
        return this.http.delete<Contact>(`${this.API_URL}/${id}`).pipe(
            tap(() => {
                this.contactDeletedSource.next();
            })
        );
    }
}
