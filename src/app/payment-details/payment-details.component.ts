import { Component, OnInit } from '@angular/core';
import { ToastrModule,ToastrService } from 'ngx-toastr';
import { PaymentDetail } from '../shared/payment-detail.model';
import { PaymentDetailService } from '../shared/payment-detail.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit {

  constructor(public service: PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.refresh();
  }
  list1:PaymentDetail[];
  populateForm(selectedRecord:PaymentDetail)
  {
    this.service.fromData= Object.assign({}, selectedRecord);
    console.log(selectedRecord.paymentDetailsId);
    this.refresh();
  }
  delete(id:number){
    if(confirm("Are you sure You Want to delete?"))
    {
      this.service.deletePaymentDetails(id).subscribe(
        res=>{
         this.refresh();
          this.toastr.error("Delete Successfully","Payment details Register")
        }
      );
    }
  }
  refresh(){
    this.service.refreshList1().subscribe(
      (response)=>{
        console.log("in refresh");
        this.list1=response;
        console.log(this.list1.length);
      }
    )
  }
}
