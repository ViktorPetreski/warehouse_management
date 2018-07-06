import {OrderItemKey} from "./order-item-key";

export class OrderItem {

    orderItemKey:OrderItemKey;
    quantity:number;
    unitPrice:number;
    discount:number;
    orderItemStatus:string; //  (allowableValues = "On Order, Allocated, No Stock")
    dateAllocated:number;
}
