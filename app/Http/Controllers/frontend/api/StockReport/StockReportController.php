<?php

namespace App\Http\Controllers\frontend\api\StockReport;

use App\Http\Controllers\Controller;
use App\Model\InventoryCategory\InventoryCategory;
use Illuminate\Http\Request;
use DB;
class StockReportController extends Controller
{
    public function get_category()
    {
        $category = InventoryCategory::all();
        return response()->json([
            'category' => $category,
        ]);
    }

    public function stock_reports(Request $request)
    {

        $category_id = (int) $request->category_id;
        $start_page = $request->start_page;
        $limit = $request->limit;
        $start = date($request->start_date);
        $end = date($request->end_date);
        $type = $request->type;
        $StockReport = DB::select(DB::raw("SELECT SUM(quantity) as newPurshase, inventory_products.product_name as product_name,
        (SELECT SUM(quantity)  from invoice_trasections WHERE type=2 and invoice_trasections.item_id = item_id) as purshaseReturn,
        (SELECT SUM(quantity)  from invoice_trasections WHERE type=3 and invoice_trasections.item_id = item_id) as sale,
        (SELECT SUM(quantity)  from invoice_trasections WHERE type=4 and invoice_trasections.item_id = item_id) as saleReturn,
        (SELECT SUM(quantity)  from invoice_trasections WHERE type=6 and invoice_trasections.item_id = item_id) as issue
        from invoice_trasections as invoice_trasections
        INNER JOIN inventory_products ON invoice_trasections.item_id=inventory_products.id
        WHERE type=1
        WHERE inventory_products.category_id = '$category_id'
        GROUP BY item_id"));
            // ->where(function ($filter) use ($category_id, $start, $end, $type) {
            //     if (!empty($category_id)) {
            //         $filter->where('inventory_products.category_id', $category_id);
            //     }
            //     if (!empty($start) && !empty($end)) {
            //         $filter->whereBetween('invoice_trasections.created_at', [$start, $end]);
            //     }
            // })
            // ->get();

        return response()->json([
            'status' => 200,
            'StockReport' => $StockReport,
        ]);
    }
    // public function stock_reports(Request $request)
    // {

    //     $category_id = (int) $request->category_id;
    //     $start_page = $request->start_page;
    //     $limit = $request->limit;
    //     $start = date($request->start_date);
    //     $end = date($request->end_date);
    //     $type = $request->type;
    //     $StockReport = InvoiceTrasection::query()
    //         ->join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')

    //         ->where(function ($filter) use ($category_id, $start, $end, $type) {
    //             if (!empty($category_id)) {
    //                 $filter->where('inventory_products.category_id', $category_id);
    //             }
    //             if (!empty($start) && !empty($end)) {
    //                 $filter->whereBetween('invoice_trasections.created_at', [$start, $end]);
    //             }
    //         })
    //         ->groupBy('invoice_trasections.item_id')
    //         ->get();

    //     return response()->json([
    //         'status' => 200,
    //         'StockReport' => $StockReport,
    //     ]);
    // }
    //     SELECT SUM(quantity) as newPurshase,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=2 and a.item_id = item_id) as purshaseReturn,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=3 and a.item_id = item_id) as sale,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=4 and a.item_id = item_id) as saleReturn,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=6 and a.item_id = item_id) as issue
    // from invoice_trasections a
    // WHERE type=1
    // GROUP BY item_id

    
    // SELECT SUM(quantity) as newPurshase, inventory_products.product_name as product_name,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=2 and invoice_trasections.item_id = item_id) as purshaseReturn,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=3 and invoice_trasections.item_id = item_id) as sale,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=4 and invoice_trasections.item_id = item_id) as saleReturn,
    // (SELECT SUM(quantity)  from invoice_trasections WHERE type=6 and invoice_trasections.item_id = item_id) as issue
    // from invoice_trasections as invoice_trasections
    // INNER JOIN inventory_products ON invoice_trasections.item_id=inventory_products.id
    // WHERE type=1
    // GROUP BY item_id

}
