<?php

namespace App\Http\Controllers\frontend\api\StoreInvoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\StoreInvoice\StoreInvoice;
use App\Model\InvoiceTrasection\InvoiceTrasection;
use Session;

class StoreInvoiceController extends Controller
{
    public function save_storeinvoice(Request $request)
    {
        // $storeinvo = new StoreInvoice();
        // $storeinvo->invoice_number = ;
        // $storeinvo->type = $request->type;
        // $storeinvo->vendor_id = $request->vendor_id;
        // $storeinvo->ware_id = $request->ware_id;
        // $storeinvo->posting_by = $request->date;
        // $storeinvo->type = $request->type;
        // $storeinvo->type = $request->type;
        // $storeinvo->type = $request->type;
        // $storeinvo->type = $request->type;

    }


    public function save_invoice_transection(Request $request)
    {

        // return $request->all();

        // exit();
        $invotran = new InvoiceTrasection();
        $invotran->invoice_id = 0;
        if($request->idx == 1 or $request->idx == 4)
        {
            $invotran->d_id = $request->product_id;
            $invotran->party_id = $request->vendor_id;
        }
        elseif ($request->idx == 3 or $request->idx == 2) {
            $invotran->c_id = $request->product_id;
            $invotran->party_id = $request->customer_id;
        }
        $invotran->ware_id = $request->warehouse_id;
        // if($request->idx == 1){
        //     $invotran->party_id = $request->vendor_id;
        // } else{
        //     $invotran->party_id = $request->customer_id;
        // }

        $invotran->status = 1;
        $invotran->date = $request->date;
        $invotran->store_id = $request->store_id;
        $invotran->quantity = $request->quantity;
        $invotran->price = $request->price;
        $invotran->discount_taka = 0;
        $invotran->discount_percent = 0;
        $invotran->vat = 0;
        // $invotran->publishing_by = $request->cookie('user_id');
        $invotran->publishing_by = 0;
        $invotran->type = $request->idx;
        $invotran->save();

        return response()->json([
            'status'=>200,
            'message'=>"Invoices Transectionm  Saved Successfully!!"
        ]);

    }



}
