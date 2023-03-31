import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../services/core.service';
import { MemberService } from '../../../services/member.service';
import { Member } from '../../../models/member.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  memberForm: FormGroup;
  users:User[] = [
    {
      id: 1,
      email: "kalvinkarl@gmail.com",
      password: "asddsaasd",
      role: "ai",
      confirm:1
    },{
      id: 2,
      email: "Jovylyn@gmail.com",
      password: "asddsaasd",
      role: "ai",
      confirm:1
    },
  ]
  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Member,
    private coreService: CoreService
  ) {
    this.memberForm = this.formBuilder.group({ id: '', team_name: '', members: '', userid: '', });
  }
  ngOnInit(): void {
    this.memberForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.memberForm.valid) {
      if (this.data) {
        this.memberService.updateMember(this.data.id, this.memberForm.value).subscribe({
            next: (res: Member) => {
              this.coreService.openSnackBar('Member detail updated!');
              // console.log(res);
              this.dialogRef.close(true);
            },
            error: (err: Member) => {
              console.error(err);
            },
          });
      } else {
        this.memberService.addMember(this.memberForm.value).subscribe({
          next: (res: Member) => {
            this.coreService.openSnackBar('Member added successfully');
            // console.log(res);
            this.dialogRef.close(true);
          },
          error: (err: Member) => {
            console.error(err);
          },
        });
      }
    }
  }
}