<?php

namespace App\Http\Controllers\frontend\api\StockReport;
use App\Model\Common\CommonReport;
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


        $sql="SELECT t.*,pl.* from inventory_products as pl left join (
                    SELECT item_id,sum((oqty+pqty+srq+irq)-(orqty+prqty+sq+iq)) as c_qty, sum(oqty-orqty) as oqty,sum(orqty) as orqty,
                            sum(pqty) as pqty,sum(prqty) as prqty,
                            sum(sq) as sq,sum(srq) as srq,
                            sum(iq) as iq,sum(irq) as irq from (
                    
                    
                    SELECT `item_id`,sum(quantity) as  oqty,0 orqty, 0 pqty,0 prqty,0 sq,0 srq,0 iq,0 irq FROM `invoice_trasections` 
                            WHERE type in (1,4,7) and  date < '".$start."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,SUM(quantity) as orqty, 0 pqty,0 prqty,0 sq,0 srq,0 iq,0 irq FROM `invoice_trasections` 
                            WHERE type in (2,3,6) and  date < '".$start."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,0 orqty, SUM(quantity) as pqty,0 prqty,0 sq,0 srq,0 iq,0 irq 
                        FROM `invoice_trasections` 
                            WHERE type=1 and date >= '".$start."' and date <= '".$end."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,0 orqty, 0 pqty,SUM(quantity) as prqty,0 sq,0 srq,0 iq,0 irq 
                        FROM `invoice_trasections` 
                            WHERE type=2 and date >= '".$start."' and date <= '".$end."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,0 orqty, 0 pqty,0 prqty,SUM(quantity) as sq,0 srq,0 iq,0 irq 
                        FROM `invoice_trasections` 
                            WHERE type=3 and date >= '".$start."' and date <= '".$end."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,0 orqty, 0 pqty,0 prqty,0 sq,SUM(quantity) as srq,0 iq,0 irq 
                        FROM `invoice_trasections` 
                            WHERE type=4 and date >= '".$start."' and date <= '".$end."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`,0 oqty,0 orqty, 0 pqty,0 prqty,0 sq,0 srq,SUM(quantity) as iq,0 irq 
                        FROM `invoice_trasections` 
                            WHERE type=6 and date >= '".$start."' and date <= '".$end."' and status=1 and trash=1
                            
                                UNION
                            
                    SELECT `item_id`, 0 oqty,0 orqty, 0 pqty,0 prqty,0 sq,0 srq,0 iq,SUM(quantity) as irq 
                        FROM `invoice_trasections` 
                        WHERE type=7 and date >= '".$start."' and date <= '".$end."' 
                            and status=1 and trash=1
                    
                    ) as t GROUP by item_id
                ) as t on pl.id=t.item_id WHERE pl.warehouse_id='1' and pl.status='1' 
                and pl.trash='1' ORDER by pl.product_name asc";

        $info=CommonReport::getRawSqlData($sql);                            

        return response()->json([
            'status' => 200,
            'list' => $info,
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
