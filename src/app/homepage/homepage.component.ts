import { Component, OnInit } from '@angular/core';
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
  subscription;
  constructor(private route: ActivatedRoute, private homepageService: HomepageService) { }

  ngOnInit(): void {
     this.loadData();
  }

 loadData() {
    this.subscription = this.homepageService.getData().subscribe(
      res => (this.lessons = res),
      error => console.log(error),
    );
  }
}
