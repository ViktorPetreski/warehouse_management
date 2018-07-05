import { Component, OnInit,TemplateRef, ViewChild,HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/api/customer.service';

@Component({
	selector: 's-customers-pg',
	templateUrl: './customers.component.html',
    styleUrls: [ './customers.scss'],
})

export class CustomersComponent implements OnInit {


    @ViewChild('customerDeleteTpl') customerDeleteTpl: TemplateRef<any>;

    columns:any[];
    rows:any[];
    pageSize:number=10;
    currentPage:number=0;
    isLastPageLoaded:boolean=false;
    isLoading:boolean=false;

    constructor(private router: Router, private customerService: CustomerService) { }

    ngOnInit() {
        let me = this;
        me.getPageData();

        this.columns=[
            {prop:"id"       , name: "ID"          , width:50  },
            {prop:"firstName", name: "First Name"  , width:120 },
            {prop:"lastName" , name: "Last Name"   , width:120 },
            {prop:"company"  , name: "Company"     , width:120 },
            {prop:"email"    , name: "Email"       , width:200 },
            {prop:"phone"    , name: "Phone"       , width:160 },
            {prop:"address"  , name: "Address"     , width:220 },
            {prop:"",name:"",width:100,cellTemplate:this.customerDeleteTpl}
        ];
    }

    getPageData(isAppend:boolean=false) {

        if (this.isLastPageLoaded===false){
            let me = this;
            me.isLoading=true;
            this.customerService.getCustomers(this.currentPage,this.pageSize).subscribe((data) => {
                me.isLastPageLoaded=data.last;
                me.currentPage = data.currentPageNumber+1;
                if (isAppend===true){
                    me.rows = me.rows.concat(data.items);
                }
                else{
                    me.rows = data.items;
                }
                me.isLoading=false;
            });
        }
    }

    onScroll() {
        console.log("bottom")
        if (this.isLoading===false){
            this.getPageData(true);
        }
	}

    delete(id:number):void{
        console.log("ID:   ",id);
        this.customerService.delete(id).subscribe(
            success => {
                this.getPageData();
            }
        );
        this.router.navigate(['/home/customers']);
    }


}
