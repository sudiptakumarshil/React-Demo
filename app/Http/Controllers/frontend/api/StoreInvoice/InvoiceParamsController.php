<?php

namespace App\Http\Controllers\frontend\api\StoreInvoice;

use App\Http\Controllers\Controller;
use App\Model\InvoiceTrasection\InvoiceParameter;
use Symfony\Component\HttpFoundation\Request;
use DB;
class InvoiceParamsController extends Controller
{

    public function index()
    {
        $params = InvoiceParameter::all();
        return response()->json([
            'status' => 200,
            'params' => $params,
        ]);
    }


    public function edit_params($id)
    {
        $params = InvoiceParameter::find($id);
        return response()->json([
            'status' => 200,
            'params' => $params,
        ]);
    }

    public function update_params(Request $request,$id)
    {
        $params = InvoiceParameter::find($id);
        $params->type = $request->type;
        $params->discount_method = $request->discount_method;
        $params->status = $request->status;
        $params->save();
        return response()->json([
            'status' => 200,
            'message' => "Invoice Params Updated Successfully!!",
        ]);


    }

    public function get_productCode(Request $request)
    {
        $productCode = DB::table('inventory_products')->where('product_code',$request->product_code)->first();
        return response()->json([
            'status' => 200,
            'productCode' => $productCode,
        ]);
    }
}
