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
	answerErrorMessage = '';
	areaValue: number;
	areaValueMessage = '';

	unitSelected: string ;
	selectedAnswerUnit: string ;

	constructor() {
		this.areaValue = 0;
		this.radiusFormValue = 0;
		this.unitSelected = 'm';
		this.selectedAnswerUnit = 'm'
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

	answerUnitsChanged() {
		if(this.areaValue > 0) { //Atleast the area have been calculated
			switch (this.selectedAnswerUnit) {
				case 'm':
					switch (this.unitSelected) {
						case 'cm':
							//We are converting the answer value from cm to m. 
							//It could be area or perimeter so we check operation
							console.log("Value changed to " + this.selectedAnswerUnit);
							if(this.operation === 'area') {
								//We are converting for area
								this.areaValue = this.areaValue/1000 ;
								this.selectedAnswerUnit = 'm';
								this.areaValueMessage = 'Tha area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.areaValue + ' ' + this.selectedAnswerUnit + ' sq';
							} else {
								//We are converting for perimeter
								//this.areaValue = this.areaValue/100 ;
								console.log("Inn the perimeter section");
								this.selectedAnswerUnit = 'm'
							}

							break;
						case 'm':
							//We are converting from meter to meter
							//Doesn't really make sense but users are crazy
							if(this.operation === 'area') {
								//We are converting for area
								this.areaValue = this.areaValue/1000 ;
								this.selectedAnswerUnit = 'm';
							} else {
								//We are converting for perimeter
								//this.areaValue = this.areaValue/100 ;
								this.selectedAnswerUnit = 'm'
							}
							break;
					
						default:
							break;
					}
					break;
			
				default:
					break;
			}
			
		} else {
			this.answerErrorMessage = 'Please first calculate the area or perimeter before converting.';
		}
		
	}

	calculateArea(fig:string) {
		if(fig === 'circle') {
			if(this.radiusFormValue > 0) {
				if(Number.isFinite(this.radiusFormValue)) {
					this.areaValue = Math.PI * this.radiusFormValue * this.radiusFormValue;
					this.areaValueMessage = 'Tha area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.areaValue + ' ' + this.unitSelected + ' sq'; 
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