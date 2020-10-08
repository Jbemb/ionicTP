import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Question } from '../models/questions';
import { OpenTriviaService } from '../providers/openTrivia.provider';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public pseudo: string = 'Janet';
  public difficulty: string = 'easy';
  //validator
  public isStarted: boolean = false;
  public isAnswered: boolean = false;
  public questions = [];
  public questionNumber = 0;
  public questionDisplayed: Question;
  public answers = [];
  public score = 0;
  public isOver: boolean = false;
  public attempts: number = 0;
  public nomQuest = 5;

  constructor(private alertCtrl: AlertController, public toastCtrl: ToastController, private questionProvider: OpenTriviaService) { }

  //verifier champs
  public async start() {

    if (!this.pseudo || this.pseudo.length <= 3) {
      const alert = await this.alertCtrl.create({
        header: 'Missing information',
        message: "Enter a name longer than 3 characters",
        buttons: ["ok"]
      });
      alert.present();
      return;

    }

    if (this.difficulty === undefined) {
      const toast = await this.toastCtrl.create({
        message: 'Please choose a level of difficulty',
        duration: 3000,
        color: 'tertiary'
      });
      toast.present();
      return;
    }



    await this.loadQuestions();


    this.isStarted = true;

  }

  async loadQuestions() {
    this.isOver = false;
    this.isAnswered = false;
    this.attempts = 0;
    this.score = 0;
    this.questionNumber = 0;
    try {
      this.questions = await this.questionProvider.getQuestions(this.nomQuest, this.difficulty);
    } catch (error) {
      const alert = await this.alertCtrl.create({
        header: 'Erreur appele Service',
        message: 'Impossible to recouperate the questions',
        buttons: ['OK']
      });
      alert.present();
    }
    this.displayQuestion();
  }

  public questionAnswered(answer: string) {
    if (this.questionNumber == this.questions.length) {
      this.isOver = true;
    }
    this.isAnswered = true;
    if (answer == this.questionDisplayed.correct_answer && this.attempts == 0) {
      this.score++;
    }
    this.attempts++;
  }

  public nextQuestion() {
    this.attempts = 0;
    this.displayQuestion();
    this.isAnswered = false;
  }

  private getAnswers() {
    this.answers = this.questionDisplayed.incorrect_answers;
    this.answers.push(this.questionDisplayed.correct_answer);
    this.answers.sort(function () { return 0.5 - Math.random() })
    console.log(this.answers);
  }

  //correction shuffle answers
  shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i]
      array[i] = array[j]
      array[j] = temp;
    }
    return array;
  }

  private displayQuestion() {

    // this.questionDisplayed = this.questions[this.questionNumber];
    // this.questionDisplayed["answers"] = [];
    // for(let answer of this.questionDisplayed["incorrect_answers"]){
    //   this.questionDisplayed["answers"].push({
    //     answer : answer,
    //     correct : false
    //   });
    // }

    // this.questionDisplayed["answers"].push({
    //   answer : this.questionDisplayed["correct_answer"],
    //   correct : true
    // });

    if (this.questionNumber < this.questions.length) {
      this.questionDisplayed = this.questions[this.questionNumber];
      this.questionNumber++;
      this.getAnswers();
    } else {
      //end of game need to change for later
      this.isOver = true;

    }
  }
  public return() {
    this.isStarted = false;
    this.isOver = false;
    this.isOver = false;
    this.isAnswered = false;
    this.attempts = 0;
    this.questionNumber = 0;

  }

}
