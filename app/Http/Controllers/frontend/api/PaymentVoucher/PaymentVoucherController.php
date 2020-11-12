<?php

namespace App\Http\Controllers\frontend\api\PaymentVoucher;

use App\Http\Controllers\Controller;
use App\Model\InvoiceAccountDetails\InvoiceAccountDetails;
use App\Model\InvoiceAccountTransecDetails\InvoiceAccountTransecDetails;
use Illuminate\Http\Request;

class PaymentVoucherController extends Controller
{
    public function save_payment_voucher(Request $request)
    {
        $iad = new InvoiceAccountDetails();
        $iad->ware_id = $request->ware_id;
        $iad->invoice_type = $request->invoice_type;
        $iad->voucher_no = 0;
        $iad->ref_no = 0;
        $iad->doc_no = 0;
        $iad->voucher_no = 0;
        $iad->date = $request->date;
        $iad->ammount = $request->ammount;
        $iad->description = $request->description;
        $iad->cost_center_id = $request->cost_center_id;
        $iad->posting_type_id = $request->posting_type_id;
        $iad->save();

        $iatd = new InvoiceAccountTransecDetails();
        if ($request->invoice_type == 2) {
            $iatd->credit_id = $request->cashAccount_id;
        } elseif ($request->invoice_type == 1) {
            $iatd->credit_id = $request->bank_id;
        }
        $iatd->invoice_acc_details_id = $iad->id;
        $iatd->debit_id = $request->accounts_id;
        $iatd->group_account_code = 0;
        $iatd->date = $request->date;
        $iatd->ware_id = $request->ware_id;
        $iatd->remarks = $request->remarks;
        $iatd->ammount = $request->ammount;
        $iatd->cost_center_id = $request->cost_center_id;
        if ($request->invoice_type == 1) {
            $iatd->cheque_number = $request->cheque_number;
            $iatd->cheque_date = $request->cheque_date;
        } else {
            $iatd->cheque_number = 0;
            $iatd->cheque_date = 0;
        }
        $iatd->save();

    }
}
