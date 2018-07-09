import {Component, Input, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../services/api/product.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Order} from "../../model/order";
import {Product} from "../../model/product";
import {Observable} from "rxjs/Observable";
import {OrderItem} from "../../model/order-item";
import DateTimeFormat = Intl.DateTimeFormat;
import {OrderService} from "../../services/api/order.service";
import {Page} from "@clr/angular/data/datagrid/providers/page";
// import {OrdersComponent} from "../orders/orders.component";

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
    orderItems: OrderItem[];
    tmpOrderItems: OrderItem[];
    orderItem: OrderItem;
    rows: any[];
    columns: any[];
    orderItemsColumns: any[];

    quantity: number;
    static orderId : number = 1;

    @Input() quantityInput: number;

    orderForm: FormGroup;
    orderItemForm:FormGroup;

    constructor(private productService: ProductService, private orderService: OrderService,
                private route: ActivatedRoute, private router: Router, private fb: FormBuilder
                // ,private ordersComponent: OrdersComponent
                ) {
        this.order = new Order();
        this.orderItems = [];
        this.orderItem = new OrderItem();
    }

    ngOnInit() {
        this.createOrderForm();
        this.createForm();
        let me = this;
        me.getPolicyData();

        this.columns = [
            {prop: "productCode", name: "Code", width: 60},
            {prop: "productName", name: "Name", width: 200},
            {prop: "standardCost", name: "Standard Cost", width: 100},
            {prop: "listPrice", name: "List Price", width: 100},
            {prop: "category", name: "Category", width: 100},
           // {prop: "quantity", name: "Quantity", width: 100, cellTemplate: this.productQuantity},
            {prop: "", name: "Quantity", width: 200, cellTemplate: this.orderItemAdd}
        ];

        this.orderItemsColumns = [
            {prop: "orderItemKey", name: "Code", width: 60},
            // {prop: "productName", name: "Name", width: 200},
            {prop: "quantity", name: "Quantity", width: 100},
            {prop: "unitPrice", name: "Total price", width: 100},
            {prop: "orderItemStatus", name: "Status", width: 150},
            {prop: "dateAllocated", name: "Date", width: 200},
        ];
    }

    createForm(){
        this.orderItemForm = this.fb.group(
            {
                quantity  :['', Validators.required]
            }
        );
    }

    createOrderForm(){
        this.orderForm = this.fb.group(
            {
                customerId  :['',Validators.required],
                shipAddress  :['',Validators.required],
                shipCity  :['',Validators.required],
                shipPostalCode: ['',Validators.required],
                shippingFee: ['',Validators.required],
                paymentType:['',Validators.required]
            }
        );
    }

    getPolicyData() {
        this.productService.getProducts().subscribe((policyData) => {
            this.rows = policyData;
        });
    }

    addOrderItem(productId: number, price: string) {

      const  formModel = this.orderItemForm.value;
        this.orderItem.quantity = formModel.quantity as number;

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

        console.log("Item", this.orderItem);

        this.orderItems.push(this.orderItem);
        this.orderItems = [...this.orderItems]

        this.orderItem = new OrderItem();

        console.log("Items",this.orderItems);
    }


    prepareOrder():Order{
        const formModel = this.orderForm.value;
        const newOrder:Order = {
            id:OrderAddComponent.orderId,
            employeeId:0, //SMENI
            customerId:formModel.customerId as number,
            orderDate: new Date(Date.now()),
            shippedDate: null,
            paidDate: null,
            shipName:null,
            shipAddress1:formModel.shipAddress as string,
            shipAddress2:null,
            shipCity:formModel.shipCity as string,
            shipState:null,
            shipPostalCode:formModel.shipPostalCode as string,
            shipCountry:null,
            shippingFee:formModel.shippingFee as number,
            paymentType:formModel.paymentType as string,
            orderStatus:"On hold"

        };
        return newOrder;
    }

    public submitOrder(): void{

        console.log("PRODUCT JSON!!!" ,JSON.stringify(this.prepareOrder()));
        this.orderService.save(this.prepareOrder()).subscribe(
            // Page<OrderInfo> pg = orderInfoRepo.findAll(org.springframework.data.domain.Example.of(qry), pageable);
       );
    //
        this.order.id = OrderAddComponent.orderId;
        OrderAddComponent.orderId++;
    //
    //
        this.orderItems = [];
    //     // this.router.navigate(['/home/orders']);
    }

}
