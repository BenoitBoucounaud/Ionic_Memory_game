import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-memory-game',
  templateUrl: 'memory-game.html',
})
export class MemoryGamePage {

 
  public cardList: Array<{ img: string, name: string, revealed: boolean }> = [];

  public numberOfCards: number = 8;

  //Url de la carte "?"
  private questionMarkUrl = "/assets/imgs/memory-game/question-mark.png";


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.generateCards();
  }

  //Methode qui genere nos carte
  private generateCards() {
    for (let i = 0; i < this.numberOfCards; i++) {
      let imgUrl = "/assets/imgs/memory-game/cards/" + i + ".png";
      this.cardList.push({ img: this.questionMarkUrl, name: imgUrl, revealed: false });
      this.cardList.push({ img: this.questionMarkUrl, name: imgUrl, revealed: false });
    }

    //Appelle melanger les cartes 
    this.shuffleCards();
  }

  //Fonction melanger les cartes
  shuffleCards(): any {
    this.cardList.forEach(
      (item, index, deck) => {
        let newPosition = Math.ceil(Math.random() * (this.cardList.length - 1));
        deck[index] = deck[newPosition];
        deck[newPosition] = item;
      }
    );
  }

  //temps de show de la carte (en ms)
  private cardHindingTimeout = 500;

  //Variable qui permet de savoir si une carte est montrée ou non
  private isShowingCard = false;

  //Methode pour retourner, reveler les cartes
  flipCard(card, pos) {
    if (!card.revealed && this.isShowingCard == false) {
      //tourne la carte
      card.img = card.name;
      card.revealed = true;

      //carte montrée
      this.isShowingCard = true;

      //On compte les moves
      this.numberOfMoves++;

      //retourne la carte et check si la carte precedente est la même, on a extraite la methode pour que ce sois plus lisible et plus pratique
      this.checkCard(card, pos);
    }
  }

  //carte precedament cliquée
  private previousCard;

  //Position précedente, va permettre d'eviter la reussite en cas de double clique
  private previousPosition;


  //condition de win, il faut que la carte precedement retourner ai le meme attribut name que celle retournée mtn
  private checkCard(card: any, pos) {

    //Si this.previousCard n est pas null et que ...
    if (this.previousCard && this.previousCard.name == card.name
      //Demande de position differente
      && pos != this.previousPosition) {

      //Rappel: img= question-mark && name= logo 

      //Si les 2 cartes sont les memes, les deux cartes seront revelée et donc c est win
      this.previousCard.img = card.name;
      this.previousCard.revealed = true;
      this.isShowingCard = false;

      //On compte le nombre de carte trouvées
      this.foundCards++;

    } else {
      //sinon les cartes se retournes car c est perdus
      setTimeout(
        () => {
          card.img = this.questionMarkUrl;
          card.revealed = false;
          
          //Permet de laisser en memoire card.name sur previousCard
          this.previousCard = card;

          //Defini la position precédente pour empecher le double clique
          this.previousPosition = pos;
          //Dis qu il n y a pas de carte qui est montré en ce moment
          this.isShowingCard = false;
        },
        //Temps ou on montre le logo
        this.cardHindingTimeout);
    }

  }


  //Petit hud pour le score
  public foundCards = 0;
  public numberOfMoves = 0;

  //Methode replay
  replay() {
    //On remet les variables à 0
    this.numberOfMoves = 0;
    this.foundCards = 0;
    this.previousCard=null;
    this.previousPosition=null;
    //On remelange les cartes et on les retournes en leurs réinitialisant leurs boolean revealed
    this.shuffleCards();
    this.cardList.map(item => {
    item.img = this.questionMarkUrl;
      item.revealed = false;
    });

  }

}
