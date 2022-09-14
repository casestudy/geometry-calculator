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
	answerValue: number;
	answerValueMessage = '';

	perimeterValue: number;

	unitSelected: string ;
	selectedAnswerUnit: string ;

	constructor() {
		this.answerValue = 0;
		this.radiusFormValue = 0;
		this.unitSelected = 'm';
		this.selectedAnswerUnit = 'm'

		this.perimeterValue = 0;
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
		if(this.answerValue > 0) { //Atleast the area have been calculated
			switch (this.selectedAnswerUnit) {
				case 'm':
					switch (this.unitSelected) {
						case 'cm':
							//We are converting the answer value from cm to m. 
							//It could be area or perimeter so we check operation
							console.log("Value changed to " + this.selectedAnswerUnit);
							if(this.operation === 'area') {
								//We are converting for area
								this.answerValue = this.answerValue/1000 ;
								this.selectedAnswerUnit = 'm';
								this.answerValueMessage = 'The area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq';
							} else {
								//We are converting for perimeter
								this.answerValue = this.answerValue/100 ;
								this.selectedAnswerUnit = 'm'
								this.answerValueMessage = 'The perimeter of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq'; 
							}

							break;
						case 'm':
							//We are converting from meter to meter
							//Doesn't really make sense but users are crazy
							if(this.operation === 'area') {
								//We are converting for area
								this.answerValue = this.answerValue ;
								this.selectedAnswerUnit = 'm';
							} else {
								//We are converting for perimeter
								//this.answerValue = this.answerValue/100 ;
								this.selectedAnswerUnit = 'm'
							}
							break;
					
						default:
							break;
					}
					break;
				case 'cm':
					switch (this.unitSelected) {
						case 'cm':
							//We are converting the answer value from cm to cm. 
							//Doesnt really make sense
							console.log("Value changed to " + this.selectedAnswerUnit);
							if(this.operation === 'area') {
								//We are converting for area
								this.selectedAnswerUnit = 'cm';
								this.answerValueMessage = 'The area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq';
							} else {
								//We are converting for perimeter
								this.selectedAnswerUnit = 'cm';
								this.answerValueMessage = 'The area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq';
							}

							break;
						case 'm':
							//We are converting from meter to cm
							//Doesn't really make sense but users are crazy
							if(this.operation === 'area') {
								//We are converting for area
								this.answerValue = this.answerValue * 1000 ;
								this.selectedAnswerUnit = 'cm';
								this.answerValueMessage = 'The area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq';
							} else {
								//We are converting for perimeter
								this.answerValue = this.answerValue*100 ;
								this.selectedAnswerUnit = 'cm'
								this.answerValueMessage = 'The perimeter of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.selectedAnswerUnit + ' sq';
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
					this.answerValue = Math.PI * this.radiusFormValue * this.radiusFormValue;
					this.answerValueMessage = 'Tha area of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.unitSelected + ' sq'; 
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

	calculatePerimeter(fig:string) {
		if(fig === 'circle') {
			if(this.radiusFormValue > 0) {
				if(Number.isFinite(this.radiusFormValue)) {
					this.answerValue = 2 * Math.PI * this.radiusFormValue ;
					this.answerValueMessage = 'Tha perimeter of your circle with radius ' + this.radiusFormValue + ' ' + this.unitSelected + ' is: ' + this.answerValue + ' ' + this.unitSelected + ' sq'; 
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