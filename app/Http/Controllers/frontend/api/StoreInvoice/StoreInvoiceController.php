<?php

namespace App\Http\Controllers\frontend\api\StoreInvoice;

use App\common\ItemModel;
use App\Http\Controllers\Controller;
use App\Model\AccountsInput\AccountsInput;
use App\Model\Accounts\Ledger;
use App\Model\Accounts\Setting;
use App\Model\BankDetails\BankDetails;
use App\Model\CashAccount\CashAccountDetails;
use App\Model\CostCenter\CostCenter;
use App\Model\InvoiceTrasection\InvoiceParameter;
use App\Model\InvoiceTrasection\InvoiceTrasection;
use App\Model\SalesMan\SalesMan;
use App\Model\Size\Size;
use App\Model\StoreInvoice\StoreInvoice;
use App\Model\Store\Store;
use App\Model\Unit\Unit;
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
        $types = $request->type;
        $invoice_id = $request->invoice_id;
        $user = $request->user_id;
        $invotran = new InvoiceTrasection();
        $invotran->invoice_id = $request->invoice_id;
        if ($request->idx == 1 || $request->idx == 2) {
            $invotran->d_id = $request->product_id;
            $invotran->party_id = $request->vendor_id;
        } elseif ($request->idx == 3 || $request->idx == 4 || $request->idx == 6 || $request->idx == 7) {
            $invotran->c_id = $request->product_id;
            $invotran->party_id = $request->vendor_id; // vendor id &customer id = idx 6 and 7
        }
        // $invotran->party_id = $request->vendor_id;
        $invotran->ware_id = $request->warehouse_id;
        $invotran->item_id = $request->product_id;
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

        $invotransec = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'vats.vat_name', 'vats.value', 'inventory_products.product_name', 'inventory_products.id as pid')
            ->where('invoice_id', $invoice_id)
            ->where('type', $types)
            ->where('invoice_trasections.trash', 1)
            ->where("invoice_trasections.status", 1)
            ->where('invoice_trasections.publishing_by', $user)
            ->get();

        return response()->json([
            'status' => 200,
            'invotransec' => $invotransec,
            'message' => "Invoices Transection Saved Successfully!!",
        ]);
    }

    public function save_store_invoice(Request $request)
    {

        $getreturnQuantity = 0;
        $return_msg = "";
        $invoice_id = $request->invoice_id;
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
        $storeinvoice->total_quantity = $request->totalQuantity;
        $storeinvoice->save();
        $data['invoice_id'] = $storeinvoice->id;
        DB::table('invoice_trasections')
            ->where('publishing_by', "=", $storeinvoice->posting_by)
            ->where('invoice_id', $invoice_id)
            ->update($data);

        return response()->json([
            'status' => 200,
            // 'message' => "Store Invoice Save Successfully!!",
            'message' => $getreturnQuantity,
        ]);

    }
    public function returnsave_store_invoice(Request $request)
    {
        // return $request->all();

        $getreturnQuantity = 0;
        $return_msg = "";
        if ($request->idx == 7) {
            $invoice_id = $request->invoice_id;
            $returnQuantity = $request->return_quantity;
            $transec_id_count = count($returnQuantity);

            $storeinvoice = new StoreInvoice();
            $storeinvoice->ref_inv = $request->invoice_id;
            $storeinvoice->return_quantity = 0;
            $storeinvoice->ref_product_id = 0;
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
            $storeinvoice->total_quantity = $request->totalQuantity;
            $storeinvoice->save();

            for ($i = 0; $i < $transec_id_count; $i++) {
                if ($returnQuantity[$i]) {
                    $rowInfo = $returnQuantity[$i];
                    $qty = $rowInfo["qty"];
                    $ref_id = $rowInfo["ref_id"];
                    $ref_pid = $rowInfo["ref_pid"];
                    $invotran = new InvoiceTrasection();
                    $invotran->invoice_id = $storeinvoice->id;
                    $invotran->c_id = $ref_pid;
                    $invotran->party_id = $request->vendor_id; //thats mean vendor id= customer id for idx 6 and 7
                    $invotran->ware_id = $request->warehouse_id;
                    $invotran->item_id = $ref_pid;
                    $invotran->status = 1;
                    $invotran->date = date($request->date);
                    $invotran->store_id = $request->store_id;
                    $invotran->quantity = $qty;
                    $invotran->price = 0;
                    $invotran->discount_taka = 0;
                    $invotran->discount_percent = 0;
                    $invotran->vat = 0;
                    $invotran->publishing_by = $request->user_id;
                    $invotran->type = $request->idx;
                    $invotran->save();

                }
                // $updateinvoice = StoreInvoice::find($storeinvoice->id);
                // // $updateinvoice->return_quantity = $qty;
                // $updateinvoice->ref_product_id = $ref_pid;
                // $updateinvoice->save();

                $getreturnQuantity = DB::table('invoice_trasections')->where('invoice_id', $invoice_id)
                    ->sum('quantity');
                // $getreturnQuantity = DB::table('store_invoices')->where('ref_inv', $invoice_id)
                // ->sum('return_quantity');

                $data['total_rqty'] = $getreturnQuantity;
                DB::table('store_invoices')
                    ->where('id', $invoice_id)
                    ->update($data);
            }
        }

        return response()->json([
            'status' => 200,
            // 'message' => "Store Invoice Save Successfully!!",
            'message' => $getreturnQuantity,
        ]);

    }
    // public function returnsave_store_invoice(Request $request)
    // {

    //     $getreturnQuantity = 0;
    //     $return_msg = "";
    //     if ($request->idx == 7) {
    //         $invoice_id = $request->invoice_id;
    //         $returnQuantity = $request->return_quantity;
    //         $transec_id_count = count($returnQuantity);
    //         for ($i = 0; $i < $transec_id_count; $i++) {
    //             if ($returnQuantity[$i]) {
    //                 $rowInfo = $returnQuantity[$i];
    //                 $qty = $rowInfo["qty"];
    //                 $ref_id = $rowInfo["ref_id"];
    //                 $ref_pid = $rowInfo["ref_pid"];
    //                 $storeinvoice = new StoreInvoice();
    //                 $storeinvoice->ref_inv = $request->invoice_id;
    //                 $storeinvoice->return_quantity = $qty;
    //                 $storeinvoice->ref_product_id = $ref_pid;
    //                 $storeinvoice->invoice_number = $request->invoice_code;
    //                 $storeinvoice->type = $request->idx;
    //                 $storeinvoice->vendor_id = $request->vendor_id;
    //                 $storeinvoice->ware_id = $request->warehouse_id;
    //                 $storeinvoice->date = date($request->date);
    //                 $storeinvoice->posting_by = $request->user_id;
    //                 $storeinvoice->store_id = $request->store_id;
    //                 $storeinvoice->gross_amount = $request->gross_amount;
    //                 $storeinvoice->discount_taka = $request->discountTaka;
    //                 $storeinvoice->discount_percent = $request->final_discount_percent;
    //                 $storeinvoice->cash_amount = $request->cash_amount;
    //                 $storeinvoice->cash_id = $request->cashamount_id;
    //                 $storeinvoice->bank_amount = $request->bank_amount;
    //                 $storeinvoice->bank_id = $request->bankdetails_id;
    //                 $storeinvoice->remarks = $request->remarks;
    //                 $storeinvoice->total_quantity = $request->totalQuantity;
    //                 $storeinvoice->save();

    //             }

    //             $getreturnQuantity = DB::table('store_invoices')->where('ref_inv', $invoice_id)
    //                 ->sum('return_quantity');
    //             // $saveRqty = StoreInvoice::find($invoice_id);
    //             // $saveRqty->total_rqty = $getreturnQuantity;
    //             // $saveRqty->save();

    //             $data['total_rqty'] = $getreturnQuantity;
    //             DB::table('store_invoices')
    //                 ->where('id', $invoice_id)
    //                 ->update($data);

    //             // DB::table('invoice_trasections')
    //             // ->where('publishing_by', "=", $storeinvoice->posting_by)
    //             // ->where('invoice_id', $invoice_id)
    //             // ->update($data);
    //         }
    //     } else {
    //         $invoice_id = $request->invoice_id;
    //         $storeinvoice = new StoreInvoice();
    //         $storeinvoice->invoice_number = $request->invoice_code;
    //         $storeinvoice->type = $request->idx;
    //         $storeinvoice->vendor_id = $request->vendor_id;
    //         $storeinvoice->ware_id = $request->warehouse_id;
    //         $storeinvoice->date = date($request->date);
    //         $storeinvoice->posting_by = $request->user_id;
    //         $storeinvoice->store_id = $request->store_id;
    //         $storeinvoice->gross_amount = $request->gross_amount;
    //         $storeinvoice->discount_taka = $request->discountTaka;
    //         $storeinvoice->discount_percent = $request->final_discount_percent;
    //         $storeinvoice->cash_amount = $request->cash_amount;
    //         $storeinvoice->cash_id = $request->cashamount_id;
    //         $storeinvoice->bank_amount = $request->bank_amount;
    //         $storeinvoice->bank_id = $request->bankdetails_id;
    //         $storeinvoice->remarks = $request->remarks;
    //         $storeinvoice->total_quantity = $request->totalQuantity;
    //         $storeinvoice->save();
    //         $data['invoice_id'] = $storeinvoice->id;
    //         DB::table('invoice_trasections')
    //             ->where('publishing_by', "=", $storeinvoice->posting_by)
    //             ->where('invoice_id', $invoice_id)
    //             ->update($data);
    //     }

    //     return response()->json([
    //         'status' => 200,
    //         // 'message' => "Store Invoice Save Successfully!!",
    //         'message' => $getreturnQuantity,
    //     ]);

    // }

    public function getallinvoicetransection(Request $request)
    {
        $invotransec = DB::table('invoice_trasections')
            ->leftJoin('inventory_products as dip', 'invoice_trasections.d_id', '=', 'dip.id')
            ->leftJoin('inventory_products as cip', 'invoice_trasections.c_id', '=', 'cip.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
        // ->leftJoin('ware_house_details', 'invoice_trasections.ware_id', '=', 'ware_house_details.id')
        // ->leftJoin('vats', 'ware_house_details.id', '=', 'vats.ware_id')
            ->select('invoice_trasections.*', 'dip.product_name as dp_name', 'vats.vat_name', 'vats.value', 'cip.product_name as cp_name')
            ->where('publishing_by', $request->user_id)
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
        $invoice_id = $request->invoice_id;
        $user = $request->user_id;
        // print_r($invoice_id = $request->invoice_id);
        $invoice_number = 0;
        if (isset($types) && empty($invoice_id)) {

            $invoicnumber = DB::table('store_invoices')
                ->join('users', 'store_invoices.ware_id', 'users.ware_id')
                ->select('store_invoices.*')
                ->where('type', $types)
                ->orderBy('id', "desc")
                ->first();
            if (!empty($invoicnumber->id)) {
                $invoice_number = $invoicnumber->invoice_number + 1;
            } else {
                //$invoice_number = 1000;
                $info = InvoiceParameter::where("type", trim($types))->first();
                $invoice_number = $info->invoice_start_no;
            }

        } else if (isset($request->isRefIssue)) {
            $invoicnumber = DB::table('store_invoices')
                ->join('users', 'store_invoices.ware_id', 'users.ware_id')
                ->select('store_invoices.*')
                ->where('type', $request->isRefIssue)
                ->orderBy('id', "desc")
                ->first();
            if (!empty($invoicnumber->id)) {
                $invoice_number = $invoicnumber->invoice_number + 1;
            } else {
                $info = InvoiceParameter::where("type", trim($request->isRefIssue))->first();
                $invoice_number = $info->invoice_start_no;
            }
        }
        $salesMan = SalesMan::all();

        $products = DB::table('inventory_products')
            ->select('inventory_products.*')
            ->where("status", 1)
            ->get();

        $stores = DB::table('stores')
            ->join('ware_house_details', 'stores.ware_id', 'ware_house_details.id')
            ->select('stores.*', 'ware_house_details.name as wname')
            ->where("stores.status", 1)
            ->get();

        $vendors = DB::table('vendors')
            ->join('ware_house_details', 'vendors.ware_id', 'ware_house_details.id')
            ->select('vendors.*', 'ware_house_details.name as wname')
            ->where('vendors.type', 1)
            ->where("vendors.status", 1)
            ->get();
        $customer = DB::table('vendors')
            ->join('ware_house_details', 'vendors.ware_id', 'ware_house_details.id')
            ->select('vendors.*', 'ware_house_details.name as wname')
            ->where('vendors.type', 2)
            ->where("vendors.status", 1)
            ->get();

        $vats = Vat::orderBy('id', 'desc')->where("status", 1)
            ->get();
        $warehouses = WareHouseDetails::where("status", 1)->get();
        $bankdetails = BankDetails::where("status", 1)->get();
        $cashaccount = CashAccountDetails::where("status", 1)->get();
        $costcenter = CostCenter::where("status", 1)->get();
        $unitlist = Unit::where("status", 1)->get();
        #AccountsInput for posting type ...
        $postingType = AccountsInput::where('input_type', 1)->where("status", 1)->get();
        #AccountsInput for doctype type ...
        $docType = AccountsInput::where('input_type', 2)->where("status", 1)->get();

        $invotransec = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'vats.vat_name', 'vats.value', 'inventory_products.product_name', 'inventory_products.id as pid')
            ->where('invoice_id', $invoice_id)
            ->where('type', $types)
            ->where('invoice_trasections.trash', 1)
            ->where("invoice_trasections.status", 1)
            ->where('invoice_trasections.publishing_by', $user)
            ->get();

        $returned_issues = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->join('store_invoices', 'invoice_trasections.invoice_id', '=', 'store_invoices.id')
            ->select('invoice_trasections.*', 'inventory_products.product_name', 'inventory_products.id as pid')
            ->where('invoice_trasections.type', $types)
            ->where('invoice_id', $invoice_id)
            ->where("invoice_trasections.status", 1)
            ->where('invoice_trasections.trash', 1)
            ->get();

        $invoiceParams = DB::table('invoice_parameters')
            ->where('type', '=', $types)
            ->where('status', 1)
            ->first();
        $allSize = Size::all();
        $setting = Setting::all();
        $ledgers = Ledger::where("id", 751)->get();
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
            'unitlist' => $unitlist,
            'costcenter' => $costcenter,
            'postingType' => $postingType,
            'docType' => $docType,
            'invoice_number' => $invoice_number,
            'returned_issues' => $returned_issues,
            'customer' => $customer,
            'salesMan' => $salesMan,
            'allSize' => $allSize,
            "setting" => $setting,
            "ledgers" => $ledgers,
        ]);
    }

    // public function product_wise_price($id)
    // {
    //     $productPrice = DB::table('inventory_products')
    //         ->where('id', $id)
    //         ->first();

    //     $closing_stock = DB::select(DB::raw("SELECT item_id, sum(d_qty) as d_qty,sum(d_qty) as c_qty,sum(d_qty-c_qty) as closing from (

    //         SELECT d_id as item_id, sum(quantity) as d_qty,0 c_qty FROM `invoice_trasections` WHERE d_id='$id' and trash != '2'

    //             UNION

    //         SELECT c_id as item_id, 0 d_qty,sum(quantity) as c_qty FROM `invoice_trasections` WHERE c_id='$id' and trash != '2'

    //              ) as t WHERE item_id is not null GROUP by item_id"));

    //     // print_r($closing_stock);
    //     // exit();

    //     return response()->json([
    //         'productPrice' => $productPrice,
    //         'closing_stock' => $closing_stock,
    //     ]);
    // }

    public function product_wise_price($id)
    {
        $productPrice = DB::table('inventory_products')
            ->where('id', $id)
            ->first();

        $op = 0;
        if (!empty($productPrice)) {
            $op = $productPrice->opening_stock;
        }

        $closing_stock = DB::select(DB::raw("SELECT item_id, sum(d_qty) as d_qty,sum(d_qty) as c_qty,sum(d_qty-c_qty ) as closing
            from (

                SELECT d_id as item_id, sum(quantity) as d_qty,0 c_qty FROM `invoice_trasections`
                        WHERE d_id='$id' and status=1 and trash=1

                    UNION

                SELECT c_id as item_id, 0 d_qty,sum(quantity) as c_qty FROM `invoice_trasections`
                        WHERE c_id='$id' and status=1 and trash=1

                 ) as t WHERE item_id is not null GROUP by item_id"));

        // print_r($closing_stock);
        // exit();
        $closing_stock[0]->closing = $op + $closing_stock[0]->closing;

        return response()->json([
            'productPrice' => $productPrice,
            'closing_stock' => $closing_stock,
        ]);
    }

    public function getwarehouse($id)
    {
        if (!empty($id)) {
            $store = Store::where('ware_id', $id)->get();
        } else {
            $store = Store::all();
        }

        return response()->json([
            'store' => $store,
        ]);
    }

    public function editinvoicetransection($id)
    {
        $result = 0;

        $invoice = InvoiceTrasection::find($id);
        $closing_stock = ItemModel::getItemClosing($invoice->item_id);

        $plusClosingStock = $invoice->quantity + $result;
        return response()->json([
            'invoice' => $invoice,
            'plusClosingStock' => ($closing_stock + $invoice->quantity),
        ]);
    }

    public function delete_invoice_transec(Request $request, $id)
    {
        $types = $request->type;
        $invoice_id = $request->invoice_id;
        $user = $request->user_id;
        $invoice = InvoiceTrasection::find($id);
        $invoice->trash = 2;
        $invoice->save();

        $invotransec = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'vats.vat_name', 'vats.value', 'inventory_products.product_name', 'inventory_products.id as pid')
            ->where('invoice_id', $invoice_id)
            ->where('type', $types)
            ->where('invoice_trasections.trash', 1)
            ->where("invoice_trasections.status", 1)
            ->where('invoice_trasections.publishing_by', $user)
            ->get();
        return response()->json([
            'status' => 200,
            'message' => 'success',
            'invotransec' => $invotransec,
        ]);
    }

    public function update_invoice_transection(Request $request, $id)
    {

        // return $request->product_id;
        // exit();
        $types = $request->type;
        $invoice_id = $request->invoice_id;
        $user = $request->user_id;
        $invotran = InvoiceTrasection::find($id);
        // if ($request->idx == 1 or $request->idx == 2) {
        //     $invotran->d_id = $request->product_id;
        // } elseif ($request->idx == 3 or $request->idx == 4) {
        //     $invotran->c_id = $request->product_id;
        // }
        // if ($request->idx == 1 or $request->idx == 2 or $request->idx == 7) {
        //     $invotran->d_id = $request->product_id;
        //     $invotran->party_id = $request->vendor_id;
        // } elseif ($request->idx == 3 or $request->idx == 4 or $request->idx == 6) {
        //     $invotran->c_id = $request->product_id;
        //     $invotran->party_id = $request->customer_id;
        // }
        if ($request->idx == 1 || $request->idx == 2) {
            $invotran->d_id = $request->product_id;
        } elseif ($request->idx == 3 || $request->idx == 4 || $request->idx == 6 || $request->idx == 7) {
            $invotran->c_id = $request->product_id;
        }
        $invotran->item_id = $request->product_id;

        $invotran->status = 1;
        $invotran->date = $request->date;
        $invotran->quantity = $request->quantity;
        $invotran->price = $request->price;
        $invotran->discount_taka = $request->discount_taka;
        $invotran->discount_percent = $request->discount_percent;
        $invotran->save();

        // $invotransec = DB::table('invoice_trasections')
        //     ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
        //     ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
        //     ->select('invoice_trasections.*', 'inventory_products.product_name', 'vats.vat_name', 'vats.value')
        //     ->where('type', $request->idx)
        //     ->where('invoice_id', $invoice_id)
        //     ->where('inventory_products.trash', 1)
        //     ->get();

        $invotransec = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'vats.vat_name', 'vats.value', 'inventory_products.product_name', 'inventory_products.id as pid')
            ->where('invoice_id', $invoice_id)
            ->where('type', $types)
            ->where('invoice_trasections.trash', 1)
            ->where("invoice_trasections.status", 1)
            ->where('invoice_trasections.publishing_by', $user)
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
        $store = Store::all();
        return response()->json([
            'editinvoice' => $editinvoice,
            'store' => $store,
            // 'invwisetrans'=>$invwisetrans
        ], 200);
    }

    public function edit_issuestoreInvoice($id)
    {
        $editinvoice = StoreInvoice::find($id);
        $store = Store::all();
        return response()->json([
            'editinvoice' => $editinvoice,
            'store' => $store,
            // 'invwisetrans'=>$invwisetrans
        ], 200);
    }

    public function update_storeInvoice(Request $request, $id)
    {
        $storeinvoice = StoreInvoice::find($id);
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
        $customer_id = (int) $request->customer_id;
        $ware_id = (int) $request->warehouse_id;
        $invoice_code = (int) $request->invoice_code;
        $store_id = (int) $request->store_id;
        $start_page = $request->start_page;
        $limit = $request->limit;
        $start = date($request->start_date);
        $end = date($request->end_date);
        $type = $request->type;

        $range = 0;
        if ($start_page > 1) {
            $range = ($start_page - 1) * $limit;
        }

        $SearchInvoice = StoreInvoice::query()
            ->join('ware_house_details', 'store_invoices.ware_id', '=', 'ware_house_details.id')
            ->join('vendors', 'store_invoices.vendor_id', '=', 'vendors.id')
            ->join('stores', 'store_invoices.store_id', '=', 'stores.id')
            ->select('store_invoices.*', 'vendors.name as vendor', 'ware_house_details.name as ware_name', 'stores.store_name')
            ->where(function ($filter) use ($vendor_id, $customer_id, $ware_id, $invoice_code, $store_id, $start, $end, $type) {
                if (!empty($invoice_code)) {
                    $filter->where('store_invoices.invoice_number', 'LIKE', "%{$invoice_code}");
                }

                if (!empty($vendor_id)) {
                    $filter->where('store_invoices.vendor_id', $vendor_id);
                }
                if (!empty($customer_id)) {
                    $filter->where('store_invoices.vendor_id', $customer_id);
                }

                if (!empty($ware_id)) {
                    $filter->where('store_invoices.ware_id', $ware_id);
                }

                if (!empty($store_id)) {
                    $filter->where('store_invoices.store_id', $store_id);
                }
                if (!empty($start) && !empty($end)) {
                    // echo "hello world";
                    $filter->whereBetween('store_invoices.created_at', [$start, $end]);
                }

                if (!empty($type)) {
                    $filter->where('store_invoices.type', $type);
                }

            })->orderBy('id', 'desc')->skip($range)->take($limit)->get();

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

    public function delete_store_invoice($id)
    {
        $del_invoice = StoreInvoice::find($id);
        $del_invoice->delete();

        return response()->json([
            'status' => 200,
            'del_invoice' => $del_invoice,
        ]);

    }

    public function store_invoice_print($id)
    {
        $invoicePrint = DB::table('store_invoices')
            ->join('ware_house_details', 'store_invoices.ware_id', '=', 'ware_house_details.id')
            ->join('vendors', 'store_invoices.vendor_id', '=', 'vendors.id')
            ->join('stores', 'store_invoices.store_id', '=', 'stores.id')
            ->select('store_invoices.*', 'vendors.name as vendor', 'vendors.type as vtype', 'ware_house_details.name as ware_name', 'ware_house_details.address as ware_address', 'stores.store_name')
            ->where('store_invoices.id', $id)
            ->first();

        $invotransec = DB::table('invoice_trasections')
            ->Join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->Join('units', 'inventory_products.unit_id', '=', 'units.id')
            ->leftJoin('vats', 'invoice_trasections.vat', 'vats.id')
            ->select('invoice_trasections.*', 'vats.vat_name', 'vats.value', 'inventory_products.product_name', 'inventory_products.id as pid', 'units.unit_name')
            ->where('invoice_id', $id)
            ->where('invoice_trasections.trash', 1)
            ->where("invoice_trasections.status", 1)
            ->get();

        return response()->json([
            'status' => 200,
            'invoicePrint' => $invoicePrint,
            'invotransec' => $invotransec,
        ]);
    }

}
