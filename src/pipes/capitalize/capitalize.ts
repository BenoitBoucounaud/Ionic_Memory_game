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

   /*
  transform(value: string) {

    //Ma méthode simple mais gourmande et limité
    let wordByWord = value.split(" ");
    let final: string = "";
    for (var i = 0; i < wordByWord.length; i++) {
      final += wordByWord[i].substr(0, 1).toLocaleUpperCase() + wordByWord[i].substr(1, wordByWord[i].length - 1).toLowerCase() + " ";
    }
    return final;
  }
*/


  //La méthode de Sébastien, plus utile plus precise et moins gourmande, dans le html il faudra note | capitalize:true
  //args correspond a tous les arguments qu on va mettre quand on va se servir de la fonctoin dans le html
  
  transform(value: string, ...args) {
    if (args[0]) {
      return value.split(" ")

      //map permet de faire une boucle sur le tableau, synthaxe plus compacte que for 
      //le "=>" est une fonction anonyme de parametre (item, rng)
      
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
