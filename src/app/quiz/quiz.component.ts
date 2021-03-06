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
  questionType: string;
  icon: any;
  iconIndex: number;
  totalIcons: number;
  leftNumber: number;
  rightNumber: number;
  numbers: any = []; 
  random20numbers: any = [];
  icons: any;
  quizkey: string;
  ip: string;
  subject: string;
  questionfilename: string;
  questions: any;
  shuffledQuestions: any = [] ;
  cardType: string = "questionCard";
  totalcorrect: number = 0;
  correct: string = "";
  mistakes: number = 0;
  answer: string = "";
  answerint: number = 3;
  subscription;
  letterchoices: any = ['A', 'B', 'C', 'D'];
  questionNumber: number = 0;
  congrats: any = ["correct", "excellent", "awesome", "well done", "great job", "fantastic", "all right!", "exactly right", "exceptional", "sensational", "wonderful", "fabulous", "outstanding", "You're learning fast", "perfect", "You're doing well", "Unbelievable", "Way to go", "Marvelous", "Good for you", "That's great"];
  constructor(private quizService: QuizService, private route: ActivatedRoute) { 
 
  }

  ngOnInit(): void {

     this.route.paramMap.subscribe(params => { 
          this.ip = params.get('ipvalue');
          this.quizkey = params.get('subjectletter') + params.get('year') + params.get('letter').toLowerCase() + params.get('number');
          this.subject = params.get('subject').toLowerCase();
          this.questionfilename = params.get('subject').toLowerCase() + "_questions.json";
          this.loadData(this.ip, this.subject, params.get('title'), params.get('topic'), params.get('year'), params.get('letter').toLowerCase(),params.get('number'));
          




          
     });

     


  }

  getRandomNumberBetween(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }

  setIcon(){
     this.iconIndex = this.getRandomNumberBetween(0, this.totalIcons-1);
     this.icon = this.icons[this.iconIndex];
  }

 loadData(ip, subject, title, topic, year, letter, number) {
    this.subscription = this.quizService.getData(ip, subject, title, topic, year, letter, number).subscribe(
      res => (this.questions = res[this.quizkey]["questions"], this.getNumbers(), this.getRandomNumbers(),  this.shuffleChoices(), this.icons = res["icons"], this.totalIcons = res["icons"].length, this.iconIndex = this.getRandomNumberBetween(0, res["icons"].length-1), this.icon = this.icons[this.iconIndex], this.questionType = res[this.quizkey]["type"],  this.getShuffledQuestions(), this.questions = this.shuffledQuestions, this.correct = this.getCorrectAnswer(), this.setCorrectAnswer()), 
      error => console.log(error),
    );
  }

  setCorrectAnswer(){
    this.correct = this.questions[this.questionNumber].answer;
    //this.answerint = Number(this.correct);
    console.log("correctanswer: " + this.correct);
    
  }

  getCorrectAnswer(){
    this.correct = this.questions[this.questionNumber].answer;
    return this.correct;
  }

  setAnswer(event){
     this.answer = event;
     console.log("user answer :" + this.answer);

  }

  getNumberOfImages(){
     return Number(this.correct);
  }
   
  getNumbers(){
     for (var x=0; x<this.questions.length; x++){
      this.numbers.push(x);
     }
  }

  getRandomNumbers(){
     for (var x=0; x<20; x++){
      var numberindex = this.getRandomNumberBetween(0,this.numbers.length-1);
      var selectedNumber = this.numbers[numberindex];
      this.random20numbers.push(selectedNumber);
      this.numbers.splice(numberindex,1);
     }
  }
  
  shuffleChoices(){
      console.log(this.questions);
      for (var x=0; x<this.questions.length; x++){
         this.questions[x].choices = this.shuffle(this.questions[x].choices);
      }
  }

  getShuffledQuestions(){

      for (var x=0; x<20; x++){
          var questionindex = this.random20numbers[x];
          this.shuffledQuestions.push(this.questions[questionindex]);
      }
  }

 



  onSubmit(){
    this.setIcon();
    if (this.questionNumber==19){
        this.cardType = "scoreCard";
    }
    if (this.answer==null){
	  console.log("your answer is: " + this.answer);	
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
