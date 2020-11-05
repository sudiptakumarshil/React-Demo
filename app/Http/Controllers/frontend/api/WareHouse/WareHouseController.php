<?php

namespace App\Http\Controllers\Frontend\Api\WareHouse;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\WareHouse\WareHouseDetails;
use DB;
class WareHouseController extends Controller
{
    public function index(Request $req)
    {
        $start_page=$req->start_page;
        $limit=$req->limit;

        $range=0;
        if($start_page > 1){
            $range=($start_page * $limit)-1;
        }

        $warehouses = WareHouseDetails::skip($range)->take($limit)->get();
        // $warehouses = DB::table('ware_house_details')->paginate(20);

        $count=-1;
        if($start_page == 1)
        {
            $count=WareHouseDetails::count();
        }

        return response()->json([
            'status' => 200,
            'warehouses' => $warehouses,
            'count' => $count,
        ]);
    }



    public function add_warehouse(Request $request)
    {
        $warehouse = WareHouseDetails::Create($request->all());
        return response()->json([
            'status' => 200,
            'message' => 'Ware House Saved Successfully!!'
        ]);
    }

    public function edit_warehouse($id)
    {
        $warehouses = WareHouseDetails::find($id);
        return response()->json([
            'status' => 200,
            'warehouses' => $warehouses
        ]);
    }

    public function update_warehouse(Request $request, $id)
    {
        $warehouse = WareHouseDetails::find($id);
        $warehouse->name = $request->name;
        $warehouse->foreign_name = $request->foreign_name;
        $warehouse->wh_keeper = $request->wh_keeper;
        $warehouse->location = $request->location;
        $warehouse->telephone = $request->telephone;
        $warehouse->sequence = $request->sequence;
        $warehouse->province_no = $request->province_no;
        $warehouse->resign_code = $request->resign_code;
        $warehouse->wh_transfer_interface_account = $request->wh_transfer_interface_account;
        $warehouse->item_activity = $request->item_activity;
        $warehouse->default_cc_code = $request->default_cc_code;
        $warehouse->account_name = $request->account_name;
        $warehouse->branch = $request->branch;
        $warehouse->pricing_level = $request->pricing_level;
        $warehouse->global_location_no = $request->global_location_no;
        $warehouse->longitude = $request->longitude;
        $warehouse->latitude = $request->latitude;
        $warehouse->address = $request->address;
        $warehouse->foreign_address = $request->foreign_address;
        $warehouse->save();

        return response()->json([
            'status' => 200,
            'message' => 'Ware House Updated Successfully!!'
        ]);
    }
}
