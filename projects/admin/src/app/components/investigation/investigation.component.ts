import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditComponent } from './add-edit/add-edit.component';
import { InspectionService } from '../../services/inspection.service';
import { CoreService } from '../../services/core.service';
import { Inspection } from '../../models/inspection.model';
import { MemberService } from '../../services/member.service';
import { Member } from '../../models/member.model';

@Component({
  selector: 'app-investigation',
  templateUrl: './investigation.component.html',
  styleUrls: ['./investigation.component.scss']
})

export class InvestigationComponent implements OnInit {
  displayedColumns: any[] = ['id', 'team_id', 'type', 'datetime', 'unit', 'deployment_of_personel', 'other_inspection_conducted', 'location', 'ts', 'ap', 'aa', 'dispatched', 'absent', 'action'];
  dataSource!: MatTableDataSource<Inspection>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  members!: Member[];

  constructor(
    private dialog: MatDialog,
    private InspectionService: InspectionService,
    private coreService: CoreService,
    private memberService: MemberService
  ) {
    
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
    this.getInspectionList();
  }

  openAddEditInspectionForm() {
    const dialogRef = this.dialog.open(AddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getInspectionList();
        }
      },
    });
  }

  getInspectionList() {
    this.InspectionService.getInspectionAll().subscribe({
      next: (res: Inspection[]) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteInspection(id: number) {
    this.InspectionService.deleteInspection(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar('Inspection successfully deleted!', 'done');
        this.getInspectionList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getInspectionList();
        }
      },
    });
  }

  getTeamMembers(team_id:number):any {
    return this.members.find( m => m.id === team_id)?.members;
  }
}
