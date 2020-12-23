import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false,
})
export class SortPipe implements PipeTransform {

  transform(value: [], propName: string, isAscending: boolean): any {
    if (value.length <= 0) {
      return value;
    }

    return value.sort((a, b) => {
      if (a[propName] > b[propName]) {
        return isAscending ? 1 : -1;
      } else if (a[propName] < b[propName]) {
        return isAscending ? -1 : 1;
      } else {
        return 0;
      }
    });
  }

}
