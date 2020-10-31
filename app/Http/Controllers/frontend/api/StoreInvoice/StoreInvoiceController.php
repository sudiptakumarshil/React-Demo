<?php

namespace App\Http\Controllers\frontend\api\StoreInvoice;

use App\Http\Controllers\Controller;
use App\Model\BankDetails\BankDetails;
use App\Model\CashAccount\CashAccountDetails;
use App\Model\InvoiceTrasection\InvoiceTrasection;
use App\Model\StoreInvoice\StoreInvoice;
use App\Model\Store\Store;
use App\Model\Vat;
use App\Model\WareHouse\WareHouseDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StoreInvoiceController extends Controller
{

    public function save_invoice_transection(Request $request)
    {

        // return $request->all();

        // exit();
        $invotran = new InvoiceTrasection();
        $invotran->invoice_id = 0;
        if ($request->idx == 1 or $request->idx == 2) {
            $invotran->d_id = $request->product_id;
            // $invotran->party_id = $request->vendor_id;
        } elseif ($request->idx == 3 or $request->idx == 4) {
            $invotran->c_id = $request->product_id;
            // $invotran->party_id = $request->customer_id;
        }
        $invotran->party_id = $request->vendor_id;
        $invotran->ware_id = $request->warehouse_id;

        $invotran->status = 1;
        $invotran->date = date($request->date);
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
            'message' => "Invoices Transection Saved Successfully!!",
        ]);
    }

    public function save_store_invoice(Request $request)
    {
        // return $request->all();
        // exit();

        $storeinvoice = new StoreInvoice();
        $storeinvoice->invoice_number = $request->invoice_code;
        $storeinvoice->type = $request->idx;
        $storeinvoice->vendor_id = $request->vendor_id;
        $storeinvoice->ware_id = $request->warehouse_id;
        $storeinvoice->date = date($request->date);
        $storeinvoice->posting_by = $request->user_id;
        $storeinvoice->store_id = $request->store_id;
        $storeinvoice->gross_amount = $request->gross_amount;
        $storeinvoice->discount_taka = $request->discountTaka;
        $storeinvoice->discount_percent = $request->final_discount_percent;
        $storeinvoice->cash_amount = $request->cash_amount;
        $storeinvoice->cash_id = $request->cashamount_id;
        $storeinvoice->bank_amount = $request->bank_amount;
        $storeinvoice->bank_id = $request->bankdetails_id;
        $storeinvoice->remarks = $request->remarks;
        $storeinvoice->save();

        $data['invoice_id'] = $storeinvoice->id;
        DB::table('invoice_trasections')
            ->where('publishing_by', "=", $storeinvoice->posting_by)
            ->where('invoice_id', 0)
            ->update($data);

        return response()->json([
            'status' => 200,
            'message' => "Store Invoices  Saved Successfully!!",
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
            'invotransec' => $invotransec,
        ]);
    }

    public function fetch_all_data(Request $request)
    {

        $types = $request->type;

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

        $vats = Vat::all();
        $warehouses = WareHouseDetails::all();
        $bankdetails = BankDetails::all();
        $cashaccount = CashAccountDetails::all();
        $invotransec = DB::table('invoice_trasections')
            ->leftJoin('inventory_products as dip', 'invoice_trasections.d_id', '=', 'dip.id')
            ->leftJoin('inventory_products as cip', 'invoice_trasections.c_id', '=', 'cip.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'dip.product_name as dp_name', 'vats.vat_name', 'vats.value', 'cip.product_name as cp_name')
            ->where('invoice_id', 0)
            ->where('type', $types)
        // ->where('publishing_by','=',$user_id)
            ->get();

        $invoiceParams = DB::table('invoice_parameters')
            ->where('type', '=', $types)
            ->first();

        return response()->json([
            'status' => 200,
            'products' => $products,
            'stores' => $stores,
            'vendors' => $vendors,
            'warehouses' => $warehouses,
            'vats' => $vats,
            'invotransec' => $invotransec,
            'bankdetails' => $bankdetails,
            'cashaccount' => $cashaccount,
            'invoiceParams' => $invoiceParams,
        ]);
    }

    public function product_wise_price($id)
    {
        $productPrice = DB::table('inventory_products')
            ->where('id', $id)
            ->first();
        return response()->json([
            'productPrice' => $productPrice,
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
            'invoice_number' => $invoice_number,
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
            'invoice_number' => $invoice_number,
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
            'invoice_number' => $invoice_number,
        ]);
    }

    public function getwarehouse($id)
    {
        $store = Store::where('ware_id', $id)->get();
        return response()->json([
            'store' => $store,
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
            'invoice_number' => $invoice_number,
        ]);
    }

    public function editinvoicetransection($id)
    {
        $invoice = InvoiceTrasection::find($id);
        return response()->json([
            'invoice' => $invoice,
        ]);
    }

    public function delete_invoice_transec($id)
    {
        $invoice = InvoiceTrasection::find($id);
        $invoice->delete();
        return response()->json([
            'message' => 'success',
        ]);
    }

    public function update_invoice_transection(Request $request, $id)
    {

        // return $request->all();
        // exit();

        $invotran = InvoiceTrasection::find($id);
        if ($request->idx == 1 or $request->idx == 2) {
            $invotran->d_id = $request->product_id;
        } elseif ($request->idx == 3 or $request->idx == 4) {
            $invotran->c_id = $request->product_id;
        }

        $invotran->status = 1;
        $invotran->date = $request->date;
        $invotran->quantity = $request->quantity;
        $invotran->quantity = $request->quantity;
        $invotran->price = $request->price;
        $invotran->discount_taka = $request->discount_taka;
        $invotran->discount_percent = $request->discount_percent;
        $invotran->save();

        $invotransec = DB::table('invoice_trasections')
            ->leftJoin('inventory_products as dip', 'invoice_trasections.d_id', '=', 'dip.id')
            ->leftJoin('inventory_products as cip', 'invoice_trasections.c_id', '=', 'cip.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'dip.product_name as dp_name', 'vats.vat_name', 'vats.value', 'cip.product_name as cp_name')
            ->get();

        return response()->json([
            'status' => 200,
            'products' => $invotransec,
            'message' => "Invoices Transection  UpdatedSuccessfully!!",
        ]);
    }

    public function all_store_invoice()
    {
        $store_invoices = DB::table('store_invoices')
            ->leftjoin('vendors', 'store_invoices.vendor_id', 'vendors.id')
            ->leftjoin('ware_house_details', 'store_invoices.ware_id', 'ware_house_details.id')
            ->leftjoin('stores', 'store_invoices.store_id', 'stores.id')
            ->leftjoin('bank_details', 'store_invoices.bank_id', 'bank_details.id')
            ->leftjoin('cash_account_details', 'store_invoices.cash_id', 'cash_account_details.id')
            ->select('store_invoices.*', 'vendors.name as vendor', 'ware_house_details.name as ware_name', 'stores.store_name', 'bank_details.bank_name', 'cash_account_details.cash_name')
            ->orderBy("id", "desc")
            ->get();

        return response()->json([
            'store_invoices' => $store_invoices,
        ]);

    }

    public function edit_storeInvoice($id)
    {
        $editinvoice = StoreInvoice::find($id);
        return response()->json([
            'editinvoice' => $editinvoice,
        ], 200);
    }

    public function update_storeInvoice(Request $request, $id)
    {
        $storeinvoice = StoreInvoice::find($id);
        // $storeinvoice->invoice_number = $request->invoice_code;
        // $storeinvoice->type = $request->idx;
        $storeinvoice->vendor_id = $request->vendor_id;
        $storeinvoice->ware_id = $request->warehouse_id;
        $storeinvoice->date = date($request->date);
        // $storeinvoice->posting_by = $request->user_id;
        $storeinvoice->store_id = $request->store_id;
        $storeinvoice->gross_amount = $request->gross_amount;
        $storeinvoice->discount_taka = $request->discountTaka;
        $storeinvoice->discount_percent = $request->final_discount_percent;
        $storeinvoice->cash_amount = $request->cash_amount;
        $storeinvoice->cash_id = $request->cashamount_id;
        $storeinvoice->bank_amount = $request->bank_amount;
        $storeinvoice->bank_id = $request->bankdetails_id;
        $storeinvoice->remarks = $request->remarks;
        $storeinvoice->save();

        return response()->json([
            'status' => 200,
            'message' => "Store Invoice Updated Successfully!!",
        ]);
    }

    public function search_store_invoice(Request $request)
    {
        // return $request->all();
        // exit();
        $vendor_id = (int) $request->vendor_id;
        $ware_id = (int) $request->warehouse_id;
        $invoice_code = (int) $request->invoice_code;
        $store_id = (int) $request->store_id;
        $start_page = $request->start_page;
        $limit = $request->limit;

        $range = 0;
        if ($start_page > 1) {
            $range = ($start_page - 1) * $limit;
        }

        $SearchInvoice = StoreInvoice::query()
            ->leftjoin('ware_house_details', 'store_invoices.ware_id', '=', 'ware_house_details.id')
            ->leftjoin('vendors', 'store_invoices.vendor_id', '=', 'vendors.id')
            ->leftjoin('stores', 'store_invoices.store_id', '=', 'stores.id')
            ->select('store_invoices.*', 'vendors.name as vendor', 'ware_house_details.name as ware_name', 'stores.store_name')

            ->where(function ($filter) use ($vendor_id, $ware_id, $invoice_code, $store_id) {
                if (!empty($invoice_code)) {
                    $filter->where('store_invoices.invoice_number', 'LIKE', "%{$invoice_code}");
                }

                if (!empty($vendor_id)) {
                    $filter->where('store_invoices.vendor_id', $vendor_id);
                }

                if (!empty($ware_id)) {
                    $filter->where('store_invoices.ware_id', $ware_id);
                }

                if (!empty($store_id)) {
                    $filter->where('store_invoices.store_id', $store_id);
                }

            })->skip($range)->take($limit)->get();

        $count = -1;
        if ($start_page == 1) {
            $count = StoreInvoice::count();
        }

        return response()->json([
            'status' => 200,
            'SearchInvoice' => $SearchInvoice,
            'count' => $count,
        ]);
    }

}
