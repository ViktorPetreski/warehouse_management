import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../../model/customer";

import {CustomerService} from "../../services/api/customer.service";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CustomerAddComponent implements OnInit {

    private customer:Customer;
    customerForm:FormGroup;
  constructor(private customerService:CustomerService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder) {
      this.customer = new Customer();
  }

  ngOnInit() {
      this.createForm();
  }
    createForm(){
        this.customerForm = this.fb.group({
            id             : ['',Validators.required],
            lastName       : ['',Validators.required],
            firstName      : ['',Validators.required],
            email          : ['',Validators.required],
            company        : ['',Validators.required],
            phone          : ['',Validators.required],
            address1       : ['',Validators.required],
            address2       : [''],
            city           : ['',Validators.required],
            state          : ['',Validators.required],
            postalCode     : ['',Validators.required],
            country        : ['',Validators.required],

        })
    }

    prepareSaveCustomer():Customer{
        const formModel = this.customerForm.value;
        const saveCustomer:Customer = {
            id:formModel.id as number,
            lastName:formModel.lastName as string,
            firstName:formModel.firstName as string,
            email:formModel.email as string,
            company:formModel.company as string,
            phone:formModel.phone as string,
            address1:formModel.address1 as string,
            address2:formModel.address2 as string,
            city:formModel.city as string,
            state:formModel.state as string,
            postalCode:formModel.postalCode as string,
            country:formModel.country as string
        };

        return saveCustomer;

    }

    public save():void{

        console.log("CUSTOMER JSON!!!" ,JSON.stringify(this.prepareSaveCustomer()));
        this.customerService.save(this.prepareSaveCustomer());

        this.customer = new Customer();
        this.router.navigate(['/home/customers']);
    }
}
