import { Component, OnInit } from '@angular/core';
import {BackService} from './back.service';
import {ListComponent} from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'mapapp';
  options: any;
  overlays: any[];
  dialogVisible: boolean;
  markerTitle: string;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean;
  mapItems:any=[];
  hotelList:any=[];
  constructor(private backService:BackService){}

  ngOnInit()
  {
    this.options = {
      center: {lat: 28.437868, lng: 77.0435},
      zoom: 7
  };
  this.mapItems  = this.backService.positionMap()
  this.overlays = [];
  this.overlaysHandler();
  this.backService.hotelList = this.backService.positionList();
  console.log(this.backService.hotelList[0]);
  }

  overlaysHandler = () => {
    let allArray = this.mapItems.map((x)=>{
      return new google.maps.Marker(x);
    });
    this.overlays=allArray;
    console.log(allArray);
  }
}
