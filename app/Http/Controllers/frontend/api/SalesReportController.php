<?php

namespace App\Http\Controllers\frontend\api;

use App\Http\Controllers\Controller;
use App\Model\InvoiceTrasection\InvoiceTrasection;
use Illuminate\Http\Request;

class SalesReportController extends Controller
{

    public function salesReport(Request $request)
    {
        $size_id = $request->size_id;
        $start = date($request->start_date);
        $end = date($request->end_date);

        $report = InvoiceTrasection::query()
            ->leftjoin('sizes', 'invoice_trasections.size_id', '=', 'sizes.id')
            ->join('inventory_products', 'invoice_trasections.item_id', '=', 'inventory_products.id')
            ->select('invoice_trasections.*', 'inventory_products.product_name', 'inventory_products.product_code', 'sizes.name as sname')
            ->where(function ($filter) use ($start, $end, $size_id) {
                if (!empty($size_id)) {
                    $filter->where('invoice_trasections.size_id', $size_id);
                }
                if (!empty($start) && !empty($end)) {
                    $filter->whereBetween('invoice_trasections.created_at', [$start, $end]);
                }

            })->where('type', 3)->orderBy('id', 'desc')->get();

        return response()->json([
            'status' => 200,
            'report' => $report,
        ]);
    }
}
