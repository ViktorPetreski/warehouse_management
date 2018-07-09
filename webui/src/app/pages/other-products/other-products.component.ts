import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ProductService} from "../../services/api/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-other-products',
  templateUrl: './other-products.component.html',
  styleUrls: ['./other-products.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class OtherProductsComponent implements OnInit {

    columns:any[];
    rows:any[];

  constructor( private router: Router, private productService: ProductService) { }

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
          {prop:"warehouseId" , name: "Warehouse Id" , width:100}
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
                this.productService.getProductsByOtherUsers(serverWarehouseId).subscribe( (policyData) => {
                    this.rows = policyData;
                });
                console.log("WAREHOUSE ID !!!!!",serverWarehouseId);
            });



    }

}
