import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {CustomerService} from "../../services/api/customer.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../../model/employee";
import {Customer} from "../../model/customer";
import {EmployeeService} from "../../services/api/employee.service";

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class EmployeeAddComponent implements OnInit {

    private employee:Employee;
    employeeForm:FormGroup;

  constructor(private employeeService:EmployeeService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder) {

      this.employee = new Employee();
  }

  ngOnInit() {
      this.createForm();
  }

     createForm() {
        this.employeeForm = this.fb.group({
            id             : ['',Validators.required],
            lastName       : ['',Validators.required],
            firstName      : ['',Validators.required],
            email          : ['',Validators.required],
            avatar         : [''],
            jobTitle       : ['',Validators.required],
            department     : ['',Validators.required],
            managerId      : [''],
            phone          : ['',Validators.required],
            address1       : ['',Validators.required],
            address2       : [''],
            city           : ['',Validators.required],
            state          : ['',Validators.required],
            postalCode     : ['',Validators.required],
            country        : ['',Validators.required],

        })
    }

    prepareSaveEmployee():Employee{
        const formModel = this.employeeForm.value;
        const saveEmployee:Employee = {
            id:formModel.id as number,
            lastName:formModel.lastName as string,
            firstName:formModel.firstName as string,
            email:formModel.email as string,
            avatar:formModel.avatar as string,
            jobTitle:formModel.jobTitle as string,
            department:formModel.department as string,
            managerId:formModel.managerId as number,
            phone:formModel.phone as string,
            address1:formModel.address1 as string,
            address2:formModel.address2 as string,
            city:formModel.city as string,
            state:formModel.state as string,
            postalCode:formModel.postalCode as string,
            country:formModel.country as string
        };

        return saveEmployee;

    }

    public save():void{

        console.log("EMPLOYEE JSON!!!" ,JSON.stringify(this.prepareSaveEmployee()));
        this.employeeService.save(this.prepareSaveEmployee());

        this.employee = new Employee();
        this.router.navigate(['/home/employees']);
    }

}
