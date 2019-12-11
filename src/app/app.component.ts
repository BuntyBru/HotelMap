import { Component, OnInit } from '@angular/core';
import {BackService} from './back.service';
import {ListComponent} from './list/list.component';
declare var google;
declare var map;

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
  mapCurrent:any;
  
  constructor(private backService:BackService){}

  ngOnInit()
  {
    this.options = {
      center: {lat: 28.437868, lng: 77.0435},
      zoom: 13,
      scrollwheel: false
  };
  this.backService.costLabel(this.backService.dataJson);
  //this.backService.mapItems  = this.backService.positionMap(this.backService.dataJson)
  //this.backService.overlays = this.backService.overlaysHandler();
  this.backService.hotelList = this.backService.positionList(this.backService.dataJson);
  console.log(this.backService.hotelList[0]);
  }

  overlaysHandler = () => {
    let allArray = this.backService.mapItems.map((x)=>{
      return new google.maps.Marker(x);
    });
    this.overlays=allArray;
    console.log(this.backService.mapItems);
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

  //going to the normal interface from the details part
  goBack()
  {
    this.backService.detailsSection=false;
  }

  //function for finding the bounds()
  boundFind()
  {
    this.backService.bounds = this.mapCurrent.getBounds();
    this.backService.ne = this.backService.bounds.getNorthEast(); // LatLng of the north-east corner
    this.backService.sw = this.backService.bounds.getSouthWest(); // LatLng of the south-west corder
    console.log("this is it.......");
    console.log("Center====>",this.mapCurrent.center.lat(),this.mapCurrent.center.lng());
    console.log("NE====>",this.backService.ne.lat(),this.backService.ne.lng());
    console.log("SW==>",this.backService.sw.lat(),this.backService.sw.lng());
    this.backService.newEntries(this.mapCurrent.center, this.backService.ne, this.backService.sw,this.mapCurrent.zoom);
  }


  //function to handle the map Ready event in Gmaps
  seeIT(event)
  {
    console.log("CCDDFFF",event.map);
    this.mapCurrent = event.map;
    setTimeout(()=>{
    this.backService.bounds = event.map.getBounds();
    this.backService.ne = this.backService.bounds.getNorthEast(); // LatLng of the north-east corner
    this.backService.sw = this.backService.bounds.getSouthWest(); // LatLng of the south-west corder
    console.log("this is it.......",this.mapCurrent.center.lat(), this.mapCurrent.center.lng());
    console.log("NE====>",this.backService.ne.lat(),this.backService.ne.lng());
    console.log("SW==>",this.backService.sw.lat(),this.backService.sw.lng());
    this.backService.newEntries(this.mapCurrent.center, this.backService.ne, this.backService.sw,this.mapCurrent.zoom);
    } ,1000);
  }

  handleMapClick(event,gmap) {
    console.log("map was dragged ==>",this.options.center);
   this.boundFind();
 }

 onMapZoom(event)
 {
   console.log("map was zoomed ==>",this.options.center,this.mapCurrent.zoom);
   this.boundFind();
 }


}
