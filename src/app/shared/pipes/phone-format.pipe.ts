import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'PhoneFormatter',
})
export class PhoneFormatter implements PipeTransform {
    transform(value: string, format: number): string {
        let formattedValue: string = '';

        if (format === 1) {
            formattedValue = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
        } else if (format === 2) {
            formattedValue = value.replace(
                /(\d{4})(\d{3})(\d{2})(\d{2})/,
                '$1-$2-$3-$4'
            );
        } else {
            formattedValue = value.replace(/(\d{4})(\d{3})(\d{3})/, '$1-$2-$3');
        }
        return formattedValue;
    }
}

// /(\d{4})(\d{3})(\d{4})/,'$1-$2-$3'
// /(\d{4})(\d{3})(\d{2})(\d{2})/,'$1-$2-$3-$4'
