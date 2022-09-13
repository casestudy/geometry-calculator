import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() fig !: string ; //This area file will receive the figure as a parameter

}
