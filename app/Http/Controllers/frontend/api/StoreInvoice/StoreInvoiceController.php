<?php

namespace App\Http\Controllers\frontend\api\StoreInvoice;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\StoreInvoice\StoreInvoice;
use App\Model\InvoiceTrasection\InvoiceTrasection;
use App\Model\Store\Store;
use App\Model\Vat;
use Session;
use Illuminate\Support\Facades\DB;
use App\Model\WareHouse\WareHouseDetails;

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
        if ($request->idx == 1 or $request->idx == 4) {
            $invotran->d_id = $request->product_id;
            $invotran->party_id = $request->vendor_id;
        } elseif ($request->idx == 3 or $request->idx == 2) {
            $invotran->c_id = $request->product_id;
            $invotran->party_id = $request->customer_id;
        }
        $invotran->ware_id = $request->warehouse_id;

        $invotran->status = 1;
        $invotran->date = $request->date;
        $invotran->store_id = $request->store_id;
        $invotran->quantity = $request->quantity;
        $invotran->price = $request->price;
        $invotran->discount_taka = $request->discount_taka;
        $invotran->discount_percent = $request->discount_percent;
        $invotran->vat = $request->vat_id;
        $invotran->publishing_by = $request->user_id;
        // $invotran->publishing_by = (int)$request->user_id;
        $invotran->type = $request->idx;
        $invotran->save();

        return response()->json([
            'status' => 200,
            'message' => "Invoices Transection Saved Successfully!!"
        ]);
    }

    public function getallinvoicetransection()
    {
        $invotransec = DB::table('invoice_trasections')
            ->leftJoin('inventory_products as dip', 'invoice_trasections.d_id', '=', 'dip.id')
            ->leftJoin('inventory_products as cip', 'invoice_trasections.c_id', '=', 'cip.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            // ->leftJoin('ware_house_details', 'invoice_trasections.ware_id', '=', 'ware_house_details.id')
            // ->leftJoin('vats', 'ware_house_details.id', '=', 'vats.ware_id')
            ->select('invoice_trasections.*', 'dip.product_name as dp_name', 'vats.vat_name', 'vats.value', 'cip.product_name as cp_name')
            ->get();

        // $nettotal  =

        return response()->json([
            'status' => 200,
            'invotransec' => $invotransec
        ]);
    }


    public function fetch_all_data()
    {

        $products = DB::table('inventory_products')
            ->join('inventory_categories', 'inventory_products.category_id', 'inventory_categories.id')
            ->join('ware_house_details', 'inventory_products.warehouse_id', 'ware_house_details.id')
            ->select('inventory_products.*', 'inventory_categories.category_name', 'ware_house_details.name')
            ->get();

        $stores = DB::table('stores')
            ->join('ware_house_details', 'stores.ware_id', 'ware_house_details.id')
            ->select('stores.*', 'ware_house_details.name as wname')
            ->get();

        $vendors = DB::table('vendors')
            ->join('ware_house_details', 'vendors.ware_id', 'ware_house_details.id')
            ->select('vendors.*', 'ware_house_details.name as wname')
            ->get();

        $customers = DB::table('customers')
            ->join('ware_house_details', 'customers.ware_id', 'ware_house_details.id')
            ->select('customers.*', 'ware_house_details.name as wname')
            ->get();

        // $vats = DB::table('vats')
        //     ->join('ware_house_details', 'vats.ware_id', 'ware_house_details.id')
        //     ->select('vats.*', 'ware_house_details.name as wname')
        //     ->get();
        $vats = Vat::all();
        $warehouses = WareHouseDetails::all();


        return response()->json([
            'status' => 200,
            'products' => $products,
            'stores' => $stores,
            'vendors' => $vendors,
            'warehouses' => $warehouses,
            'customers' => $customers,
            'vats' => $vats,
        ]);
    }



    public function get_invoice_number_for_type1()
    {
        $invoicnumber = DB::table('store_invoices')
            ->join('users', 'store_invoices.ware_id', 'users.ware_id')
            ->select('store_invoices.*')
            ->where('type', 1)
            ->orderBy('id', "desc")
            ->first();

        if (!empty($invoicnumber)) {
            $invoice_number = $invoicnumber->invoice_number + 1;
        } else {
            $invoice_number = 1000;
        }

        return response()->json([
            'invoice_number' => $invoice_number
        ]);
    }

    public function get_invoice_number_for_type2()
    {
        $invoicnumber = DB::table('store_invoices')
            ->join('users', 'store_invoices.ware_id', 'users.ware_id')
            ->select('store_invoices.*')
            ->where('type', 2)
            ->orderBy('id', "desc")
            ->first();

        if (!empty($invoicnumber)) {
            $invoice_number = $invoicnumber->invoice_number + 1;
        } else {
            $invoice_number = 2000;
        }

        return response()->json([
            'invoice_number' => $invoice_number
        ]);
    }
    public function get_invoice_number_for_type3()
    {
        $invoicnumber = DB::table('store_invoices')
            ->join('users', 'store_invoices.ware_id', 'users.ware_id')
            ->select('store_invoices.*')
            ->where('type', 3)
            ->orderBy('id', "desc")
            ->first();

        if (!empty($invoicnumber)) {
            $invoice_number = $invoicnumber->invoice_number + 1;
        } else {
            $invoice_number = 3000;
        }

        return response()->json([
            'invoice_number' => $invoice_number
        ]);
    }

    public function getwarehouse($id)
    {
        $store = DB::table('stores')
            ->join('ware_house_details', 'stores.ware_id', 'ware_house_details.id')
            ->select('stores.*', 'ware_house_details.name')
            ->where('ware_id', $id)
            ->get();
        return response()->json([
            'store' => $store
        ]);
    }

    public function get_invoice_number_for_type4()
    {
        $invoicnumber = DB::table('store_invoices')
            ->join('users', 'store_invoices.ware_id', 'users.ware_id')
            ->select('store_invoices.*')
            ->where('type', 4)
            ->orderBy('id', "desc")
            ->first();

        if (!empty($invoicnumber)) {
            $invoice_number = $invoicnumber->invoice_number + 1;
        } else {
            $invoice_number = 4000;
        }

        return response()->json([
            'invoice_number' => $invoice_number
        ]);
    }

    public function editinvoicetransection($id)
    {
        $invoice  = InvoiceTrasection::find($id);
        return response()->json([
            'invoice' => $invoice
        ]);
    }

    public function delete_invoice_transec($id)
    {
        $invoice  = InvoiceTrasection::find($id);
        $invoice->delete();
        return response()->json([
            'message' => 'success'
        ]);
    }


    public function update_invoice_transection(Request $request, $id)
    {

        // return $request->all();

        // exit();
        $invotran = InvoiceTrasection::find($id);
        $invotran->status = 1;
        $invotran->date = $request->date;
        $invotran->quantity = $request->quantity;
        $invotran->price = $request->price;
        $invotran->discount_taka = $request->discount_taka;
        $invotran->discount_percent = $request->discount_percent;
        $invotran->save();

        return response()->json([
            'status' => 200,
            'message' => "Invoices Transectionm  Saved Successfully!!"
        ]);
    }
}
