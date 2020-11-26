<?php

namespace App\Http\Controllers\frontend\api\SalesMan;

use App\Http\Controllers\Controller;
use App\Model\SalesMan\SalesMan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesManController extends Controller
{

    public function add_salesman(Request $request)
    {
        $addSalesMan = new SalesMan();
        $addSalesMan->name = $request->name;
        $addSalesMan->ware_id = $request->warehouse_id;
        $addSalesMan->status = $request->status;
        $addSalesMan->save();
        return response()->json([
            'status' => 200,
            'message' => "SalesMan Created Successfully!!",
        ]);
    }

    public function edit_salesMan($id)
    {
        $editSalesMan = SalesMan::find($id);
        return response()->json([
            'status' => 200,
            'editSalesMan' => $editSalesMan,
        ]);
    }

    public function ManageSalesMan()
    {
        $allSalesMan = DB::table('sales_men')
            ->join('ware_house_details', 'sales_men.ware_id', 'ware_house_details.id')
            ->select('sales_men.*', 'ware_house_details.name as wname')
            ->get();

        return response()->json([
            'status' => 200,
            'allSalesMan' => $allSalesMan,
        ]);
    }

    public function update_salesMan(Request $request, $id)
    {
        $updateSalesMan = SalesMan::find($id);
        $updateSalesMan->name = $request->name;
        $updateSalesMan->ware_id = $request->ware_id;
        $updateSalesMan->status = $request->status;
        $updateSalesMan->save();
        return response()->json([
            'status' => 200,
            'message' => "SalesMan Updated Successfully!!",
        ]);
    }
}
