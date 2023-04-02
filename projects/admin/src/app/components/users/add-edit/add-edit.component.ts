import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../../services/core.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

interface role {code:string,name:string}


@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {
  userForm: FormGroup;
  roles:role[] = [
    { code:'ad',name:'Admin' },
    { code:'ia',name:'Investigator' },
  ]
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User,
    private coreService: CoreService
  ) {
    this.userForm = this.formBuilder.group({ email: '', password: '', role: '', confirm: '0' });
  }
  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this.userService.updateUser(this.data.id, this.userForm.value).subscribe({
            next: (res: User) => {
              this.coreService.openSnackBar('User detail updated!');
              // console.log(res);
              this.dialogRef.close(true);
            },
            error: (err: User) => {
              console.error(err);
            },
          });
      } else {
        // console.log(this.userForm.value);
        this.userService.addUser(this.userForm.value).subscribe({
          next: (res: User) => {
            this.coreService.openSnackBar('User added successfully');
            // console.log(res);
            this.dialogRef.close(true);
          },
          error: (err: User) => {
            console.error(err);
          },
        });
      }
    }
  }
}
