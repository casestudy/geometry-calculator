import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
	selector: 'app-welcome-page',
	templateUrl: './welcome-page.component.html',
	styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

	figure = 'circle';
	operation = 'area';
	radiusFormValue: number;
	errorMessage = '';
	areaValue: number;
	areaValueMessage = '';

	constructor() {
		this.areaValue = 0;
		this.radiusFormValue = 0;
	}

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

	calculateArea(fig:string) {
		if(fig === 'circle') {
			if(this.radiusFormValue > 0) {
				console.log(this.radiusFormValue);
				if(Number.isFinite(this.radiusFormValue)) {
					this.areaValue = Math.PI * this.radiusFormValue * this.radiusFormValue;
					this.areaValueMessage = 'Tha area of your circle with radius ' + this.radiusFormValue + ' is: ' + this.areaValue 
				} else {
					this.errorMessage = 'Please supply a valid value for the radius.'; //Value is not a number
				}
			} else {
				this.errorMessage = 'Please supply a value for the radius.'; //radius cannot be negative or zero
			}	
		} else {
			console.log("Wandafut");
		}
	}
} //acceptableSubmittion

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
	  const isSubmitted = form && form.submitted;
	  return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}
}

export class InputErrorStateMatcher {
	radiusFormValue = new FormControl('', [Validators.required]);
  
	matcher = new MyErrorStateMatcher();
}