<?php

namespace App\Http\Controllers\frontend\api\PaymentVoucher;

use App\Http\Controllers\Controller;
use App\Model\InvoiceAccountDetails\InvoiceAccountDetails;
use App\Model\InvoiceAccountTransecDetails\InvoiceAccountTransecDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentVoucherController extends Controller
{
    public function save_payment_voucher(Request $request)
    {
        $iad = new InvoiceAccountDetails();
        $iad->ware_id = $request->ware_id;
        $iad->invoice_type = $request->invoice_type;
        if ($request->invoice_type == 2) {
            $iad->cash_id = $request->cashAccount_id;
        } elseif ($request->invoice_type == 1) {
            $iad->bank_id = $request->bank_id;
        }
        $iad->ref_no = $request->ref_no;
        // $iad->doctype_id = $request->doctype_id;//
        $iad->voucher_no = 0;
        $iad->date = $request->date;
        $iad->gross_amount = $request->gross_amount;
        $iad->description = $request->description;
        $iad->cost_center_id = $request->costcenter_id;
        $iad->posting_type_id = $request->postingType_id;
        $iad->doctype_id = $request->docType_id;
        $iad->doc_no = $request->doc_no;
        $iad->status = $request->status;
        $iad->save();
        $alldata = $request->allData;

        foreach ($alldata as $value) {
            $iatd = new InvoiceAccountTransecDetails();
            if ($request->invoice_type == 2) {
                $iatd->credit_id = $request->cashAccount_id;
            } elseif ($request->invoice_type == 1) {
                $iatd->credit_id = $request->bank_id;
            }
            $iatd->invoice_acc_details_id = $iad->id;
            $iatd->debit_id = $value['accounts_id'];
            $iatd->group_account_code = $value['setting_id'];
            $iatd->date = $request->date;
            $iatd->ware_id = $request->ware_id;
            $iatd->remarks = $value['remarks'];
            $iatd->amount = $value['amount'];
            $iatd->cost_center_id = $request->costcenter_id;
            if ($request->invoice_type == 1) {
                $iatd->cheque_number = $request->cheque_number;
                $iatd->cheque_date = $request->cheque_date;
            } else {
                $iatd->cheque_number = 0;
                $iatd->cheque_date = 0;
            }
            $iatd->save();
        }

        return response()->json([
            'status' => 200,
            'message' => "Payment Voucher Saved Successfully!!",
        ]);

    }

    public function Manage_payment_voucher()
    {
        $all = DB::table('invoice_account_details')
            ->join('ware_house_details', 'invoice_account_details.ware_id', 'ware_house_details.id')
            ->join('cost_centers', 'invoice_account_details.cost_center_id', 'cost_centers.id')
            ->select('invoice_account_details.*', 'ware_house_details.name as cost_name', 'ware_house_details.name as ware_name')
            ->orderBy('invoice_account_details.id','desc')
            ->get();

        return response()->json([
            'status' => 200,
            'all' => $all,
        ]);
    }

    public function Edit_payment_voucher($id)
    {
        $accountDetails = InvoiceAccountDetails::find($id);

        $accountTransec = DB::table('invoice_account_transec_details')
            ->join('invoice_account_details', 'invoice_account_transec_details.invoice_acc_details_id', 'invoice_account_details.id')
            ->select('invoice_account_transec_details.*', 'invoice_account_transec_details.group_account_code as setting_id', 'invoice_account_transec_details.debit_id as accounts_id', )
            ->where('invoice_acc_details_id', $id)
            ->get();
        return response()->json([
            'accountDetails' => $accountDetails,
            'accountTransec' => $accountTransec,
        ]);
    }

    public function update_payment_voucher(Request $request, $id)
    {

        $iad = InvoiceAccountDetails::find($id);
        $iad->ware_id = $request->ware_id;
        $iad->invoice_type = $request->invoice_type;
        if ($request->invoice_type == 2) {
            $iad->cash_id = $request->cashAccount_id;
        } elseif ($request->invoice_type == 1) {
            $iad->bank_id = $request->bank_id;
        }
        $iad->ref_no = $request->ref_no;
        $iad->voucher_no = 0;
        $iad->date = $request->date;
        $iad->gross_amount = $request->gross_amount;
        $iad->description = $request->description;
        $iad->cost_center_id = $request->costcenter_id;
        $iad->posting_type_id = $request->postingType_id;
        $iad->doctype_id = $request->docType_id;
        $iad->doc_no = $request->doc_no;
        $iad->status = $request->status;

        $iad->save();
        $alldata = $request->allData;

        DB::table('invoice_account_transec_details')->where('invoice_acc_details_id', $id)->delete();

        foreach ($alldata as $value) {
            $iatd = new InvoiceAccountTransecDetails();
            if ($request->invoice_type == 2) {
                $iatd->credit_id = $request->cashAccount_id;
            } elseif ($request->invoice_type == 1) {
                $iatd->credit_id = $request->bank_id;
            }
            $iatd->invoice_acc_details_id = $iad->id;
            $iatd->debit_id = $value['accounts_id'];
            $iatd->group_account_code = $value['setting_id'];
            $iatd->date = $request->date;
            $iatd->ware_id = $request->ware_id;
            $iatd->remarks = $value['remarks'];
            $iatd->amount = $value['amount'];
            $iatd->cost_center_id = $request->costcenter_id;
            if ($request->invoice_type == 1) {
                $iatd->cheque_number = $request->cheque_number;
                $iatd->cheque_date = $request->cheque_date;
            } else {
                $iatd->cheque_number = 0;
                $iatd->cheque_date = 0;
            }
            $iatd->save();
        }

        return response()->json([
            'status' => 200,
            'message' => "Payment Voucher Updated Successfully!!",
        ]);

    }
}
