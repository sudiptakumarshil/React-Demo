<?php

namespace App\Http\Controllers\Frontend\Api\Customer;

use App\Http\Controllers\Controller;
use App\Model\Customer\Customer;
use App\Model\Vendor\Vendor;
use DB;
use Illuminate\Http\Request;

class CustomerController extends Controller
{

    public function index()
    {
        // $vendors = Vendor::all();
        $customer = DB::table('vendors')
            ->join('ware_house_details', 'vendors.ware_id', 'ware_house_details.id')
            ->select('vendors.*', 'ware_house_details.name as wname')
            ->where('type', 2)
            ->get();

        return response()->json([
            'status' => 200,
            'customer' => $customer,
        ]);
    }

    public function create_customer(Request $request)
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

        $customer = new Vendor();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->type = $request->type;
        $customer->remarks = $request->remarks;
        $customer->accounts_no = $request->accounts_id;
        $customer->ware_id = $request->warehouse_id;
        $customer->save();
        return response()->json([
            'status' => 200,
            'message' => "Customer Created Successfully!!",
        ]);
    }

    public function edit_customer($id)
    {
        $customer = Vendor::find($id);
        return response()->json([
            'status' => 200,
            'customer' => $customer,
        ]);
    }

    public function update_customer(Request $request, $id)
    {

        //        return $request->all();
        //        exit();
        $request->validate([
            'name' => 'required|max:12',
            'warehouse_id' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'accounts_id' => 'required',
            'type' => 'required',
            'remarks' => 'required',
        ]);
        $customer = Vendor::find($id);
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->remarks = $request->remarks;
        $customer->accounts_no = $request->accounts_id;
        $customer->save();
        return response()->json([
            'status' => 200,
            'message' => "Customer Updated Successfully!!",
        ]);
    }
}
