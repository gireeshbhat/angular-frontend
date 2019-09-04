import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlights'
})
export class HighlightSearch implements PipeTransform {
  transform(value: any, args: any): any {
    if (args.length < 3 || args === '') {
      return value;
    }
    if (value) {
      const re = new RegExp(args, 'gi');
      return value.replace(re, '<mark>' + args + '</mark>');
    }
  }
}

@Pipe({
    name: 'highlightArray'
})

export class HighlightCases implements PipeTransform {

    transform(value: any, args: any): any {
        if (args.length < 3 || args === '') {
            return value;
        }
        if (value) {
            const keywordArray = '(^|\\b)(' + args.join('|') + ')';
            const re = new RegExp(keywordArray, 'gi'); ;
            const result = value.replace(re, '<mark>$2</mark>');
            return result;
        }
    }
}
