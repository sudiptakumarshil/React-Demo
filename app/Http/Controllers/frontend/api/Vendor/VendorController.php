<?php

namespace App\Http\Controllers\Frontend\Api\Vendor;

use App\Http\Controllers\Controller;
use App\Model\Vendor\Vendor;
use DB;
use Illuminate\Http\Request;

class VendorController extends Controller
{

    public function index()
    {
        // $vendors = Vendor::all();
        $vendors = DB::table('vendors')
            ->join('ware_house_details', 'vendors.ware_id', 'ware_house_details.id')
            ->select('vendors.*', 'ware_house_details.name as wname')
            ->where('type', 1)
            ->get();

        return response()->json([
            'status' => 200,
            'vendors' => $vendors,
        ]);
    }

    public function create_vendor(Request $request)
    {
        $request->validate([
            'name' => 'required|max:12',
            'warehouse_id' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'accounts_id' => 'required',
            'type' => 'required',
            'remarks' => 'required',
        ]);

        $vendor = new Vendor();
        $vendor->name = $request->name;
        $vendor->email = $request->email;
        $vendor->address = $request->address;
        $vendor->phone = $request->phone;
        $vendor->remarks = $request->remarks;
        $vendor->accounts_no = $request->accounts_id;
        $vendor->ware_id = $request->warehouse_id;
        $vendor->type = $request->type;
        $vendor->status = $request->status;
        $vendor->save();
        return response()->json([
            'status' => 200,
            'message' => "Vendor Created Successfully!!",
        ]);
    }

    public function edit_vendor($id)
    {
        $vendor = Vendor::find($id);
        return response()->json([
            'status' => 200,
            'vendor' => $vendor,
        ]);
    }

    public function update_vendor(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|max:12',
            'warehouse_id' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'accounts_id' => 'required',
            'type' => 'required',
            'remarks' => 'required',
        ]);

        $vendor = Vendor::find($id);
        $vendor->name = $request->name;
        $vendor->email = $request->email;
        $vendor->address = $request->address;
        $vendor->phone = $request->phone;
        $vendor->remarks = $request->remarks;
        $vendor->accounts_no = $request->accounts_id;
        $vendor->status = $request->status;
        $vendor->save();
        return response()->json([
            'status' => 200,
            'message' => "Vendor Updated Successfully!!",
        ]);
    }
}
