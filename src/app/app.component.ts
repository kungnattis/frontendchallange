import { Component, OnInit   } from '@angular/core'
import { CommonModule } from '@angular/common';  
import { RouterOutlet } from '@angular/router'

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TimeoutConfig } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInputModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent{
  DATE_KEY = "event-date";
  NAME_KEY = "event-name";

  title = 'FrontendChallenge'
  name?:string;
  nameStr?:string;
  theDate?:string;
  dateStr?:string;

  _showName:boolean = true;
  _showDate:boolean = true;

  nameResizeInterval?:any;
  dateResizeInterval?:any;

  ngOnInit(): void {  
    this.setupTexts();
  }

  setupTexts(){
    this.name = this.getName();
    if(this.name != undefined)
      this.nameBlur();

    this.theDate = this.getDate();
    if(this.theDate != undefined)
      this.dateBlur();
  }

  dateBlur(){
    let text = document.getElementById("textDate");
    if(text)
      text!.style.color = "transparent";

    this.dateStr = this.makeDateString();
    this.saveDate();

    this.resizeText("textDate", "container", this._showDate, "black", this.dateResizeInterval)
  }

  nameBlur(){
    let text = document.getElementById("textName");
    if(text)
      text!.style.color = "transparent";

    this.nameStr = this.name;
    this.saveName();

    if(this.nameStr)
      this.resizeText("textName", "container", this._showName, "purple", this.nameResizeInterval)
  }

  makeDateString(){
    let date = new Date(this.theDate!);
    let now = new Date();
    var diff = Math.floor((date.getTime() - now.getTime())/1000);
    let days = Math.floor(diff/60/60/24);

    diff -= days*24*60*60;
    let hours = Math.floor(diff/60/60);

    diff -= hours*60*60;
    let minutes = Math.floor(diff/60);

    diff -= minutes*60;

    let dayStr = days > 1 ? "days" : "day"

    return `${days} ${dayStr}, ${hours} h, ${minutes} m, ${diff} s`
  }

  resizeText(_text:string, _container:string, _showVar:boolean, _color:string, interval:any) {
    return new Promise<void>((resolve) => {
      let container = document.getElementById(_container);
      var fontSize = 20;
      

      interval = setInterval(() => {
        _showVar = true;
        fontSize += 5;

        // Try a bigger font, timeout and interval is to give it time to render for correct measurements
        // when the font is too big, go with the size before that
        setTimeout(() => {
          let text = document.getElementById(_text);

          text!.style.fontSize = `${fontSize}px`;

          if(text!.clientWidth <= container!.clientWidth)
            _showVar = false;
          else{
            clearInterval(interval);
            fontSize -= 10;
            text!.style.fontSize = `${fontSize}px`;
            text!.style.color = _color

            resolve();
          }
          
        }, 50)
      }, 100)
    });
  }


  getName(){
    var name = sessionStorage.getItem(this.NAME_KEY)

    if(name != null)
      return name;
    else
      return undefined;
  }

  getDate(){
    var date = sessionStorage.getItem(this.DATE_KEY)

    if(date != null)
      return date;
    else
      return undefined;
  }

  saveDate(){
    sessionStorage.setItem(this.DATE_KEY, this.theDate!)
  }

  saveName(){
    sessionStorage.setItem(this.NAME_KEY, this.name!)
  }

}
