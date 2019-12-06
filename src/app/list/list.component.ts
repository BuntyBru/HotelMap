import { Component, OnInit } from '@angular/core';
import {BackService} from '../back.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private backService:BackService) { }

  ngOnInit() {
  }

}
