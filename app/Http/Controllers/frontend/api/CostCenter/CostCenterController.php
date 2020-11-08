<?php

namespace App\Http\Controllers\frontend\api\CostCenter;

use App\Http\Controllers\Controller;
use App\Model\CostCenter\CostCenter;
use DB;
use Illuminate\Http\Request;

class CostCenterController extends Controller
{

    public function index()
    {
        $costs = DB::table('cost_centers')
            ->join('ware_house_details', 'cost_centers.ware_id', 'ware_house_details.id')
            ->select('cost_centers.*', 'ware_house_details.name as wname')
            ->get();
        return response()->json([
            'status' => 200,
            'costs' => $costs,
        ]);
    }

    public function add_cost(Request $request)
    {

        $codecode = DB::table('cost_centers')
            ->orderBy('id', 'desc')
            ->first();

        if (!empty($codecode->code)) {
            $cost_Codes = $codecode->code + 1;

        } else {
            $cost_Codes = 200;
        }

        $cost = new CostCenter();
        $cost->name = $request->name;
        $cost->code = $cost_Codes;
        $cost->ware_id = $request->wareHouse_id;
        $cost->status = $request->status;
        $cost->save();

        return response()->json([
            'status' => 200,
            'message' => "suceess",
        ]);

    }

    public function edit_cost($id)
    {
        $cost = CostCenter::find($id);
        return response()->json([
            'cost'=>$cost
        ]);

    }

    public function update_cost(Request $request, $id)
    {
        $cost = CostCenter::find($id);
        $cost->name = $request->name;
        $cost->ware_id = $request->ware_id;
        $cost->status = $request->status;
        $cost->save();

        return response()->json([
            'status' => 200,
            'message' => "suceess",
        ]);
    }
}
