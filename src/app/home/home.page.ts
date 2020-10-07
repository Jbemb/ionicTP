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
  
  public pseudo : string = 'Janet';
  public difficulty : string = 'easy';
  //validator
  public isStarted : boolean = false;
  public isAnswered : boolean = false;
  public questions = [];
  public questionNumber = 0;
  public questionDisplayed : Question;
  public answers = [];
  public score = 0;
  public isOver : boolean = false;

  constructor(private alertCtrl : AlertController, public toastCtrl: ToastController, private questionProvider : OpenTriviaService) {}
  
  //verifier champs
  public async start(){
   
    if(!this.pseudo || this.pseudo.length <= 3){
      const alert = await this.alertCtrl.create({
        header : 'Missing information',
        message : "Enter a name longer than 3 characters",
        buttons : ["ok"]
      });
        alert.present();
        return;
    }
    
    if(this.difficulty === undefined){
      const toast = await this.toastCtrl.create({
        message : 'Please choose a level of difficulty',
        duration : 3000,
        color : 'tertiary'
      });
        toast.present();
        return;
    }

    this.isStarted=true;

    await this.listOfQuestions();
    this.displayQuestion();
    
  }
  
  private listOfQuestions(){
    this.questionProvider.getQuestions(2, this.difficulty)
    .then((result)=> {
      this.questions = result;
    })
    .catch(async (err)=>{
      const alert = await this.alertCtrl.create({
        header: 'Erreur appele Service',
        message: 'Impossible to recouperate the questions',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  public questionAnswered(answer : string){
    this.isAnswered = true;
    if(answer == this.questionDisplayed.correct_answer){
      this.score ++;
    }
  }
  
  public nextQuestion(){
    this.displayQuestion();
    this.isAnswered = false;
  }

  private getAnswers(){
    this.answers = this.questionDisplayed.incorrect_answers;
    this.answers.push(this.questionDisplayed.correct_answer);
    this.answers.sort(function () { return 0.5 - Math.random() })
    console.log(this.answers);
  }

  private displayQuestion(){
      if(this.questionNumber<this.questions.length){
        this.questionDisplayed = this.questions[this.questionNumber];
        this.questionNumber ++;
        this.getAnswers();
      }else{
        //end of game need to change for later
        this.isOver = true;
        
      }
  }

}
