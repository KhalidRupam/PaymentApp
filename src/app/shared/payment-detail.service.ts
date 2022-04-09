import { Injectable } from '@angular/core';
import { PaymentDetail } from './payment-detail.model';
import  {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  constructor(private http:HttpClient) { }

  fromData:PaymentDetail = new PaymentDetail();
  readonly baseURL ="http://localhost:57824/api/PaymentDetail"

  list:PaymentDetail[];

  postPaymentDetail(){
    return this.http.post(this.baseURL,this.fromData);
  }
  putPaymentDetails(){
    return this.http.put(`${this.baseURL}/${this.fromData.paymentDetailsId}`,this.fromData);
  }
  deletePaymentDetails(id:number){
    return this.http.delete(`${this.baseURL}/${id}`);
  }
  refreshList(){
    this.http.get(this.baseURL).toPromise()
    .then(res=>this.list=res as PaymentDetail[])
    console.log(this.http.get(this.baseURL));
  }
  refreshList1():Observable<any>{
    console.log("in refresh list");
    return this.http.get(this.baseURL);
    
  }
}
