import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CapitalizePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  /**
   * Takes a value and makes it capitalzed.
   */

  transform(value: string, ...args) {
    if (args[0]) {
      return value.split(" ")
      
        .map((item, rng) => {
          console.log(rng + ":" + item)
          return this.capitalizeWord(item);
        })
        .join(" ");
    } else {
      return this.capitalizeWord(value);
    }
  }

  private capitalizeWord(word) {
    return word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  }


}
