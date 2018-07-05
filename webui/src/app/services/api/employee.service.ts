import { Injectable, Inject } from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { ApiRequestService } from './api-request.service';
import { TranslateService } from './translate.service';
import { HttpParams} from "@angular/common/http";
import {Customer} from "../../model/customer";
import {Employee} from "../../model/employee";

@Injectable()
export class EmployeeService {
    constructor(
        private apiRequest: ApiRequestService,
        private translate:TranslateService
    ) {}

    getEmployees(page?:number, size?:number): Observable<any> {
        //Create Request URL params
        let me = this;
        let params: HttpParams = new HttpParams();
        params = params.append('page', typeof page === "number"? page.toString():"0");
        params = params.append('size', typeof size === "number"? size.toString():"1000");
        return this.apiRequest.get('api/employees',params);
    }

    save(employee:Employee):Observable<any>{

        return this.apiRequest.post('api/employees',employee);
    }

    delete(id:number):Observable<any>{
      return  this.apiRequest.delete(`api/Employees/${id}`);
    }
}
