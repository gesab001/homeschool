import { Component,  Input, ViewChild, OnInit } from '@angular/core';
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
export class HomepageComponent implements OnInit {

  lessons: any;
  ip: string;
  subject: string;
  subjectletter: string;
  year: string;
  yearnumber: string;
  subscription;
  path: string;
  constructor(private route: ActivatedRoute, private homepageService: HomepageService) { }

  ngOnInit(): void {
     this.route.paramMap.subscribe(params => { 
          this.ip = params.get('ipvalue').toLowerCase();
          this.subject = params.get('subject').toLowerCase();
          this.subjectletter = this.subject.charAt(0).toLowerCase();
          this.year = params.get('year');
          this.yearnumber = this.year.split("_")[1];
          this.path = "/"+this.subject+"/"+this.subject+"_"+this.year+".json";
          this.loadData();
       }
     );

  }

 loadData() {
    this.subscription = this.homepageService.getData(this.ip, this.subject, this.yearnumber).subscribe(
      res => (this.lessons = res),
      error => console.log(error),
    );
  }


}




   
