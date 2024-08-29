import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): unknown {
    return new Intl.DateTimeFormat('pl').format(new Date(value));
  }

}
