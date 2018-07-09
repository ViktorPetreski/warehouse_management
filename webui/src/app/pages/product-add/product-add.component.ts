import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {ActivatedRoute,ParamMap} from "@angular/router";
import 'rxjs/add/operator/switchMap';
import { Router } from '@angular/router'
import {ProductService} from "../../services/api/product.service";
import {Product} from "../../model/product";
import { FormControl ,FormGroup,FormBuilder,Validators}            from '@angular/forms';


@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductAddComponent implements OnInit {


   private product:Product;
    productForm:FormGroup;
  constructor(private productService:ProductService,private route:ActivatedRoute,private router:Router,private fb:FormBuilder) {
      this.product = new Product();
  }

  ngOnInit() {
      this.createForm();
  }

    createForm(){
        this.productForm = this.fb.group({
            id             : ['',Validators.required],
            code           : ['',Validators.required],
            name           : ['',Validators.required],
            desc           : [''],
            standard_cost  : ['',Validators.required],
            price          : ['',Validators.required],
            target         : ['',Validators.required],
            reorder        : ['',Validators.required],
            minReorder     : ['',Validators.required],
            quantity       : ['',Validators.required],
            disc           : ['',Validators.required],
            category       : ['',Validators.required],

        })
    }
    prepareSaveProduct():Product{
     const formModel = this.productForm.value;
     const saveProduct:Product = {
         id:formModel.id as number,
         productCode:formModel.code as string,
         productName:formModel.name as string,
         description:formModel.desc as string,
         standardCost:formModel.standard_cost as number,
         listPrice:formModel.price as number,
         targetLevel:formModel.target as number,
         reorderLevel:formModel.reorder as number,
         minimumReorderQuantity:formModel.minReorder as number,
         quantityPerUnit:formModel.quantity as string,
         discontinued:formModel.disc as number,
         category:formModel.category as string,
         warehouseId:null
     };
     return saveProduct;

    }

    public save():void{


        this.productService.getCurrentUserWarehouseId().subscribe(
            serverWarehouseId =>{

                this.product = this.prepareSaveProduct();
                this.product.warehouseId = serverWarehouseId as number;
                this.productService.save(this.product).subscribe();
                console.log("PRODUCT JSON !!!!" , JSON.stringify(this.product));
            }

        );
    //  this.productService.save(this.prepareSaveProduct()).subscribe();

      this.product = new Product();
      this.router.navigate(['/home/products']);
    }
}
