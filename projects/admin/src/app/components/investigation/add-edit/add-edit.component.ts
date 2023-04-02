import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../services/core.service';
import { InspectionService } from '../../../services/inspection.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  inspectionForm: FormGroup;
  members!:Member[];
  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private inspectionService: InspectionService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService,
    private memberService: MemberService
  ) {
    this.inspectionForm = this.formBuilder.group({
      team_id: '',
      type: '',
      datetime: '',
      unit: '',
      deployment_of_personel: '',
      other_inspection_conducted: '',
      location: '',
      ts: '',
      ap: '',
      aa: '',
      dispatched: '',
      absent: '',
    });
    this.memberService.getMemberAll()
    .subscribe({
      next: (res)=>{
        this.members=res;
      },
      error:(err)=>{
        console.error(err);
      }
    });
  }
  ngOnInit(): void {
    this.inspectionForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.inspectionForm.valid) {
      this.inspectionForm.value.datetime = this.datePipe.transform(this.inspectionForm.value.datetime, 'yyyy-MM-dd');
      if (this.data) {
        this.inspectionService
          .updateInspection(this.data.id, this.inspectionForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Investigation detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.inspectionService.addInspection(this.inspectionForm.value)
        .subscribe({
          next: (val: any) => {
            this.coreService.openSnackBar('Investigation added successfully');
            this.dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }
}
