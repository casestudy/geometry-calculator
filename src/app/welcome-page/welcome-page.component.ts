import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

	figure = 'circle';
	operation = 'area';

	constructor() { }

	ngOnInit(): void {
	}

	area() {
		console.log("Calculating the area now");
	}

	perimeter() {
		console.log("Calculating the perimeter now");
	}

	setFigureParams(fig: string, op: string) {
		this.figure = fig;
		this.operation = op;
	}

	getFigureName() {
		return this.figure;
	}

	getFigureOp() {
		return this.operation;
	}
}
