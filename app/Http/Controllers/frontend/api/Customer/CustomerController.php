<?php

namespace App\Http\Controllers\Frontend\Api\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Customer\Customer;

class CustomerController extends Controller
{


    public function index()
    {
        $customers = Customer::all();
        return response()->json([
            'status' => 200,
            'customers' => $customers
        ]);
    }


    public function create_customer(Request $request)
    {
        $customer = new Customer();
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->remarks = $request->remarks;
        $customer->accounts_no = $request->accounts_id;
        $customer->save();
        return response()->json([
            'status' => 200,
            'message' => "Customer Created Successfully!!"
        ]);
    }


    public function edit_customer($id)
    {
        $customer = Customer::find($id);
        return response()->json([
            'status' => 200,
            'customer' => $customer
        ]);
    }


    public function update_customer(Request $request, $id)
    {

//        return $request->all();
//        exit();
        $customer = Customer::find($id);
        $customer->name = $request->name;
        $customer->email = $request->email;
        $customer->address = $request->address;
        $customer->phone = $request->phone;
        $customer->remarks = $request->remarks;
        $customer->accounts_no = $request->accounts_id;
        $customer->save();
        return response()->json([
            'status' => 200,
            'message' => "Customer Updated Successfully!!"
        ]);
    }
}
