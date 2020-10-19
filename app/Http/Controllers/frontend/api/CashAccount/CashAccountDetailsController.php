<?php

namespace App\Http\Controllers\frontend\api\CashAccount;

use App\Http\Controllers\Controller;
use App\Model\CashAccount\CashAccountDetails;
use Illuminate\Http\Request;

class CashAccountDetailsController extends Controller
{
    public function index()
    {
        $cashall = CashAccountDetails::all();
        return response()->json([
            'status' => 200,
            'cashall' => $cashall,
        ]);

    }

    public function save_cash_account(Request $request)
    {
        $save_cash = new CashAccountDetails();
        $save_cash->cash_no = $request->cash_no;
        $save_cash->cash_name = $request->cash_name;
        $save_cash->remarks = $request->remarks;
        $save_cash->account_no = $request->accounts_id;
        $save_cash->save();
        return response()->json([
            'status' => 200,
            'message' => "Cash Account Details Saved Successfully!!",
        ]);

    }

    public function edit_cash_account($id)
    {
        $editcash = CashAccountDetails::find($id);
        return response()->json([
            'status' => 200,
            'editcash' => $editcash,
        ]);
    }

    public function update_cash_account(Request $request, $id)
    {
        $update_cash = CashAccountDetails::find($id);
        $update_cash->cash_no = $request->cash_no;
        $update_cash->cash_name = $request->cash_name;
        $update_cash->remarks = $request->remarks;
        $update_cash->account_no = $request->accounts_id;
        $update_cash->save();
        return response()->json([
            'status' => 200,
            'message' => "Cash Account Details Updated Successfully!!",
        ]);
    }

}
