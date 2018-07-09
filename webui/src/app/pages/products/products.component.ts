import { Component, OnInit,TemplateRef, ViewChild } from '@angular/core';
import { ProductService } from '../../services/api/product.service';
import { Router } from '@angular/router';
import {Observable} from "rxjs/Observable";

@Component({
	selector: 's-products-pg',
	templateUrl: './products.component.html',
    styleUrls: [ './products.scss'],
})

export class ProductsComponent implements OnInit {



    @ViewChild('productDeleteTpl') productDeleteTpl: TemplateRef<any>;
    //ngx-Datatable Variables
    columns:any[];
    rows:any[];




    constructor( private router: Router, private productService: ProductService) {}
    ngOnInit() {
        var me = this;
      //  me.getPolicyData();


          me.getPolicyData2();
        this.columns=[
            {prop:"productCode"  , name: "Code"         , width:60  },
            {prop:"productName"  , name: "Name"         , width:200 },
            {prop:"standardCost" , name: "Standard Cost", width:100 },
            {prop:"listPrice"    , name: "List Price"   , width:100 },
            {prop:"category"     , name: "Category"     , width:100 },
            {prop:"targetLevel"  , name: "Target Level" , width:100 },
            {prop:"reorderLevel" , name: "Reorder Level", width:100 },
            {prop:"minimumReorderQuantity", name: "Min Order", width:100 },
            {prop:"",name:"",width:100,cellTemplate:this.productDeleteTpl}
    ];

    }


    getPolicyData() {


        this.productService.getProducts().subscribe( (policyData) => {
            this.rows = policyData;
        });
    }



    getPolicyData2() {

        this.productService.getCurrentUserWarehouseId().subscribe(
            serverWarehouseId => {
             //   this.user = serverUser;
             //   console.log("!!!!!!!",this.user.warehouseId);
                this.productService.getProductsByUserWarehouseId(serverWarehouseId).subscribe( (policyData) => {
                    this.rows = policyData;
                });
                console.log("WAREHOUSE ID !!!!!",serverWarehouseId);
            });



    }


    delete(id:number):void{
        console.log("ID:   ",id);
        this.productService.delete(id).subscribe(
            success => {
            this.getPolicyData();
        }
      );
        this.router.navigate(['/home/products']);
    }


}
