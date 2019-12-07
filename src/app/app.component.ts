import { Component, OnInit } from '@angular/core';
import {BackService} from './back.service';
import {ListComponent} from './list/list.component';
declare var google;

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
      zoom: 10
  };
  this.backService.costLabel();
  this.mapItems  = this.backService.positionMap(this.backService.dataJson)
  this.overlays = [];
  this.overlaysHandler();
  this.backService.hotelList = this.backService.positionList(this.backService.dataJson);
  console.log(this.backService.hotelList[0]);
  }

  overlaysHandler = () => {
    let allArray = this.mapItems.map((x)=>{
      return new google.maps.Marker(x);
    });
    this.overlays=allArray;
    console.log(this.mapItems);
  }

  //all in one sorter
  sorter=(keyVal,bool)=>{
    let data = this.backService.getSort(keyVal,bool);
    this.backService.hotelList= this.backService.positionList(data);
  }

  //map marker click function
  mapMarkerClick(event)
  {
    console.log("map marker was clicked",event.overlay.title);
    this.backService.hotelDetails = this.backService.dataJson.filter((x)=>{
      if(x.name == event.overlay.title)
      {
        return x;
      } 
    })
    console.log(this.backService.hotelDetails);
    this.backService.detailsSection=true;
  }

  goBack()
  {
    this.backService.detailsSection=false;
  }

}
