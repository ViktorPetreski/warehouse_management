import {Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProductService} from "../../services/api/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../model/order";
import {Product} from "../../model/product";
import {Observable} from "rxjs/Observable";
import {OrderItem} from "../../model/order-item";
import DateTimeFormat = Intl.DateTimeFormat;

@Component({
    selector: 'app-order-add',
    templateUrl: './order-add.component.html',
    styleUrls: ['./order-add.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class OrderAddComponent implements OnInit {

    @ViewChild('productQuantity') productQuantity: TemplateRef<any>;
    @ViewChild('orderItemAdd') orderItemAdd: TemplateRef<any>;

    private order: Order;
    private orderItems: OrderItem[];
    private orderForm: FormGroup;
    orderItem: OrderItem;
    rows: any[];
    columns: any[];
    quantity: number;
    static orderId : number = 1;

    @Input() quantityInput: number;


    constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router, private fb: FormBuilder) {
        this.order = new Order();
        this.orderItems = [];
        this.orderItem = new OrderItem();
    }

    ngOnInit() {
        let me = this;
        me.getPolicyData();

        this.columns = [
            {prop: "productCode", name: "Code", width: 60},
            {prop: "productName", name: "Name", width: 200},
            {prop: "standardCost", name: "Standard Cost", width: 100},
            {prop: "listPrice", name: "List Price", width: 100},
            {prop: "category", name: "Category", width: 100},
            {prop: "quantity", name: "Quantity", width: 100, cellTemplate: this.productQuantity},
            {prop: "", name: "", width: 100, cellTemplate: this.orderItemAdd}
        ];
    }

    getPolicyData() {
        this.productService.getProducts().subscribe((policyData) => {
            this.rows = policyData;
        });
    }

    addOrderItem(productId: number, price: string) {
        price = price.substr(1,).replace(',', '');
        let priceNum: number = parseInt(price);
        console.log("Input:", this.quantityInput);
        // this.orderItem = {
        //     orderItemKey: {productId: productId, orderId: this.order.id},
        //     quantity: this.quantity,
        //     unitPrice: this.quantity * priceNum,
        //     discount: 1,
        //     orderItemStatus: "On Order",
        //     dateAllocated: Date.now()
        // };

        this.orderItem.dateAllocated = Date.now();
        this.orderItem.orderItemStatus = "On order";
        this.orderItem.discount = 1;
        this.orderItem.unitPrice = this.orderItem.quantity * priceNum;
        this.orderItem.orderItemKey = {productId: productId, orderId: OrderAddComponent.orderId};
        this.order.id = OrderAddComponent.orderId;
        OrderAddComponent.orderId++ ;

        console.log("Item", this.orderItem);
        this.orderItems.push(this.orderItem);
        this.orderItem = new OrderItem();
    }


}
