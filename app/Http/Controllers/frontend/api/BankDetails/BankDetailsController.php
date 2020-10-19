<?php

namespace App\Http\Controllers\frontend\api\BankDetails;

use App\Http\Controllers\Controller;
use App\Model\BankDetails\BankDetails;
use Illuminate\Http\Request;

class BankDetailsController extends Controller
{
    public function index()
    {
        $bankdetails = BankDetails::all();
        return response()->json([
            'status' => 200,
            'bankdetails' => $bankdetails,
        ]);

    }

    public function save_bank_details(Request $request)
    {
        $addbankDetails = new BankDetails();
        $addbankDetails->bank_no = $request->bank_no;
        $addbankDetails->bank_name = $request->bank_name;
        $addbankDetails->address = $request->address;
        $addbankDetails->account_number = $request->account_number;
        $addbankDetails->branch = $request->branch;
        $addbankDetails->account_id = $request->accounts_id;
        $addbankDetails->save();
        return response()->json([
            'status' => 200,
            'message' => "Bank Details  Created Successfully!!",
        ]);
    }

    public function edit_bank_details($id)
    {
        $editbankdetails = BankDetails::find($id);
        return response()->json([
            'status' => 200,
            'editbankdetails' => $editbankdetails,
        ]);
    }

    public function update_bank_details(Request $request, $id)
    {
        $addbankDetails = BankDetails::find($id);
        $addbankDetails->bank_no = $request->bank_no;
        $addbankDetails->bank_name = $request->bank_name;
        $addbankDetails->address = $request->address;
        $addbankDetails->account_number = $request->account_number;
        $addbankDetails->branch = $request->branch;
        $addbankDetails->account_id = $request->accounts_id;
        $addbankDetails->save();
        return response()->json([
            'status' => 200,
            'message' => "Bank Details  Updated Successfully!!",
        ]);
    }
}
