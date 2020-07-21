import { Component,  Input, OnChanges, SimpleChanges,ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Homepage } from './homepage';
import { HomepageService} from './homepage.service';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [HomepageService]
})
export class HomepageComponent implements OnInit, OnChanges {
  @Input() subjectYear: any;
  lessons: any;
  subject: string;
  year: string;
  subscription;
  path: string;
  constructor(private route: ActivatedRoute, private homepageService: HomepageService) { }

  ngOnChanges(changes: SimpleChanges) {
         this.subject = changes.subjectYear.currentValue.subject;
         this.year = changes.subjectYear.currentValue.year;
         this.path = "/"+this.subject+"/"+this.subject+"_"+this.year+".json";
         this.loadData();
   }

  ngOnInit(): void {
     this.loadData();
  }

 loadData() {
    this.subscription = this.homepageService.getData(this.path).subscribe(
      res => (this.lessons = res),
      error => console.log(error),
    );
  }
}




   
