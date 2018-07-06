export class Order {

    id:number;
    employeeId:number;
    customerId:number;
    orderDate:Date;
    shippedDate:Date;
    paidDate:Date;
    shipName:string;
    shipAddress1:string;
    shipAddress2:string;
    shipCity:string;
    shipState:string;
    shipPostalCode:string;
    shipCountry:string;
    shippingFee:number;
    paymentType:string; //(allowableValues = "Check, Cash, Card")
    orderStatus:string; //(allowableValues = "On Hold, Shipped, Complete, New")
}
