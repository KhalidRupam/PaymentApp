import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';


@Component({
  selector: 'app-payment-details-form',
  templateUrl: './payment-details-form.component.html',
  styles: [
  ]
})
export class PaymentDetailsFormComponent implements OnInit {

  constructor(public service:PaymentDetailService,private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    if(this.service.fromData.paymentDetailsId==0)
    {
      this.insertData(form);
    }
    else{
      this.updateData(form);
    }
  }
  insertData(form:NgForm)
  {
    this.service.postPaymentDetail().subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.success("Successfully Added Data","Payment Details Register");
        this.resetFrom(form);
      },
      
    )
  }
  updateData(form:NgForm){
    this.service.putPaymentDetails().subscribe(
      res=>{
        this.service.refreshList();
        this.toastr.info("Successfully Updated Data","Payment Details Register");
        this.resetFrom(form);
      },
      
    )
  }
  resetFrom(form:NgForm){
    form.form.reset;
    this.service.fromData=new PaymentDetail()
  }

}
