import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatDialogContent} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {PrimitiveFormValue, PrimitiveType} from '../models/three-geometry/primitive.model';

@Component({
  selector: 'add-group-popup',
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatDialogContent,
    MatButton,
    MatRadioGroup,
    MatRadioButton,
  ],
  standalone: true,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent implements OnInit {

  public form!: FormGroup;

  @Output() addPrimitives: EventEmitter<PrimitiveFormValue>= new EventEmitter();
  @Output() closePopup: EventEmitter<void>= new EventEmitter();


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }


  public onSubmit():void {
    this.addPrimitives.emit(this.form.value as PrimitiveFormValue)
  }

  public cancel() {
    this.closePopup.emit();
  }

  private initForm(): void {
    this.form = this.fb.group({
      type: [PrimitiveType.BOX, Validators.required],
      length: [null, Validators.required],
      width: [null, Validators.required],
      height: [null, Validators.required],
      quantity: [null, Validators.required],
    })
  }
}
