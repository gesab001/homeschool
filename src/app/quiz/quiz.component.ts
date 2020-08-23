import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService} from './quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})
export class QuizComponent implements OnInit {
  quizkey: string;
  questions: any;
  shuffledQuestions: any;
  cardType: string = "questionCard";
  totalcorrect: number = 0;
  correct: string = "";
  mistakes: number = 0;
  answer: string = "";
  subscription;
  letterchoices: any = ['A', 'B', 'C', 'D'];
  questionNumber: number = 0;
  congrats: any = ["correct", "excellent", "awesome", "well done", "great job", "fantastic", "all right!", "exactly right", "exceptional", "sensational", "wonderful", "fabulous", "outstanding", "You're learning fast", "perfect", "You're doing well", "Unbelievable", "Way to go", "Marvelous", "Good for you", "That's great"];
  constructor(private quizService: QuizService, private route: ActivatedRoute) { }

  ngOnInit(): void {
     this.loadData();
     this.route.paramMap.subscribe(params => { this.quizkey = params.get('subject') + params.get('year') + params.get('letter').toLowerCase() + params.get('number');});
     this.shuffleChoices();
     this.setCorrectAnswer();
  }

 loadData() {
    this.subscription = this.quizService.getData().subscribe(
      res => (this.questions = res[this.quizkey]["questions"]),
      error => console.log(error),
    );
  }

  setCorrectAnswer(){
    this.correct = this.questions[this.questionNumber].answer;
  }

  setAnswer(event){
     this.answer = event;
  }
  
  shuffleChoices(){
      for (var x=0; x<this.questions.length; x++){
         this.questions[x].choices = this.shuffle(this.questions[x].choices);
      }
  }

 

  getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

  onSubmit(){
    if (this.questionNumber==19){
        this.cardType = "scoreCard";
    }
    if (this.answer==""){
      alert("please choose an answer");
    }else{
        if(this.questions[this.questionNumber].answer  ==  this.answer){
            let congratsMessage = this.congrats[this.getRandomNumberBetween(0,this.congrats.length-1)];
            this.playAudio("correct2.mp3");
            alert(congratsMessage);
            this.shuffleChoices();
            
            this.questionNumber = this.questionNumber + 1;
            this.answer = "";
            this.setCorrectAnswer();
        }else{
           this.playAudio("wrong2.mp3");
           alert("wrong answer");

           this.mistakes = this.mistakes + 1;
           
        }
    }

  }

  startAgain(){
    this.cardType = "questionCard";
    this.questionNumber = 0;
  } 

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
  }

 playAudio(filename: string){
  let audio = new Audio();
  audio.src = "https://gesab001.github.io/assets/soundeffects/"+filename;
  audio.load();
  audio.play();
 }
}
