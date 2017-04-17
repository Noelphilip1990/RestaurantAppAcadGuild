import { Component, ElementRef,NgModule, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AgmCoreModule, MapsAPILoader } from 'angular2-google-maps/core';
import{ MapService } from './MapService';
import { Map } from './model/map';
import { RatingModule } from "ng2-rating";
import {Ng2PaginationModule} from 'ng2-pagination';
@Component({
  selector: 'my-map',
  styles: [`
    .sebm-google-map-container {
       height: 400px;
     }
     .ng2-pagination li
     {
       background-color:#C8C8C8;
     }
     .pagination-previous
     {
       background-color:green;
     }
  `],
  templateUrl: "MapComponentHTML.html"
})
export class MapApp implements OnInit {
  
  public latitude: number;
  public SearchPlaces: string="Edappally";
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  public type:string;
  public list: any[]=[];
  public rating: number[] = [];
  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private ms:MapService
  ) {}
  
  ngOnInit() {
    //set google maps defaults
    
    this.zoom = 15;
    this.latitude = 10.0236761;
    this.longitude = 76.3116235;
    this.loadMap();
    console.log(this.list);
    //this.type="restaurant";
    //create search FormControl
    this.searchControl = new FormControl();
    
    //set current position
    this.setCurrentPosition();
  
        //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();
        console.log("PLACE:"+place.name);
        //verify result
        this.SearchPlaces=place.name;
        if (place.geometry === undefined || place.geometry === null) {
          return;
        }

        //set latitude, longitude and zoom
        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.zoom = 15;
        this.list = [];
        this.rating = [];
        this.ms.getHotels(String(this.latitude), String(this.longitude))
           .subscribe(
             //adding data objects to lists.
             data => {
                for (let i = 0; i < data.length; i++) {
                   this.list.push(data[i]);
                   this.rating.push(data[i].rating);
                }
             },
             err => {
          console.log("Error in map:" + err);
         });
        });
      });
    });
  }

  loadMap()
  {
    this.ms.getHotels(String(this.latitude), String(this.longitude))
    .subscribe(
    data => { 
    for (let i = 0; i < data.length;i++)
    {
      this.list.push(data[i]);
    this.rating.push(data[i].rating);
  console.log(data[i].rating);
        }
     },
     // data=>this.list=data,
      err=>
      {
        console.log("Errormap:"+err);
      }
    )
}

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
        this.type ="restaurant";
      });
    }
  }
}