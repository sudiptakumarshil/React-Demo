<?php

namespace App\Http\Controllers\frontend\api\Store;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Model\Store\Store;

class StoreController extends Controller
{
    public function index()
    {
        $stores = DB::table('stores')
            ->join('ware_house_details', 'stores.ware_id', 'ware_house_details.id')
            ->select('stores.*', 'ware_house_details.name as wname')
            ->get();

        return response()->json([
            'status' => 200,
            'stores' => $stores
        ]);
    }

    public function save_store(Request $request)
    {
        $store = new Store();
        $store->store_name = $request->store_name;
        $store->remarks = $request->remarks;
        $store->ware_id = $request->warehouse_id;
        $store->status = $request->status;
        $store->save();

        return response()->json([
            'status' => 200,
            'message' => 'Store Saved Successfully!!'
        ]);
    }



    public function edit_store($id)
    {
        $store = Store::find($id);
        return response()->json([
            'status' => 200,
            'store' => $store
        ]);
    }

    public function update_store(Request $request, $id)
    {
        $store = Store::find($id);
        $store->store_name = $request->store_name;
        $store->remarks = $request->remarks;
        $store->ware_id = $request->warehouse_id;
        $store->status = $request->status;
        $store->save();

        return response()->json([
            'status' => 200,
            'message' => 'Store Updated Successfully!!'
        ]);
    }
}
