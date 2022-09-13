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
	radiusFormValue = '';
	errorMessage = '';
	areaValue = '';

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

	calculateArea(fig:string) {
		if(fig === 'circle') {
			console.log("Wandafut 343");
			if(this.radiusFormValue && this.radiusFormValue.length > 0) {
				if(Number.isFinite(this.radiusFormValue)) {
					this.areaValue = 'Tha area of your circle with radius ' + this.radiusFormValue + ' is: ' + this.areaValue 
				} else {
					this.errorMessage = 'Please supply a valid value for the radius.';
				}
			} else {
				this.errorMessage = 'Please supply a value for the radius.';
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