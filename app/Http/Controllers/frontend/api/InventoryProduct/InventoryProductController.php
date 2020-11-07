<?php

namespace App\Http\Controllers\frontend\api\InventoryProduct;

use App\Http\Controllers\Controller;
use App\Model\InventoryProduct\InventoryProduct;
use App\Model\WareHouse\WareHouseDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryProductController extends Controller
{
    public function index()
    {
        $products = DB::table('inventory_products')
            ->join('inventory_categories', 'inventory_products.category_id', 'inventory_categories.id')
            ->join('ware_house_details', 'inventory_products.warehouse_id', 'ware_house_details.id')
            ->join('units', 'inventory_products.unit_id', 'units.id')
            ->select('inventory_products.*', 'inventory_categories.category_name', 'ware_house_details.name', 'units.unit_name')
            ->get();

        return response()->json([
            'products' => $products,
        ]);
    }

    public function getall_warehouse()
    {
        $warehouses = WareHouseDetails::all();
        return response()->json([
            'warehouses' => $warehouses,
        ]);
    }

    // public function get_category_autocode($id)
    // {
    //     $invoicnumber = DB::table('inventory_categories')
    //         ->join('users', 'store_invoices.ware_id', 'users.ware_id')
    //         ->select('store_invoices.*')
    //         ->where('type', 2)
    //         ->orderBy('id', "desc")
    //         ->first();

    //     if (!empty($invoicnumber)) {
    //         $invoice_number = $invoicnumber->invoice_number + 1;
    //     } else {
    //         $invoice_number = 2000;
    //     }

    //     return response()->json([
    //         'invoice_number' => $invoice_number,
    //     ]);
    // }

    public function save_product(Request $request)
    {

        // return $request->all();
        // exit();
        $categoryCode = DB::table('inventory_categories')
            ->where('id', $request->category_id)
            ->orderBy('id', "desc")
            ->first();

        $productCode = DB::table('inventory_products')
            ->where('category_id', $categoryCode->id)
            ->where('category_autocode', $categoryCode->category_code)
            ->orderBy('id', "desc")
            ->first();

        if (isset($productCode)) {
            $cate_code = $productCode->category_autocode + 1;
        } else {
            $cate_code = $categoryCode->category_code;
        }

        print_r($cate_code);
        exit();

        $product = new InventoryProduct();
        $product->category_id = $request->category_id;
        $product->product_code = $request->product_code;
        $product->product_name = $request->product_name;
        $product->pices_of_carton = $request->pices_of_carton;
        $product->warehouse_id = $request->warehouse_id;
        $product->category_autocode = $cate_code;
        $product->sorting = $request->sorting;
        $product->reorder_level = $request->reorder_level;
        $product->unit_id = $request->unit_id;
        $product->opening_stock = $request->opening_stock;
        $product->buy_price = $request->buy_price;
        $product->cost = $request->cost;
        $product->selling_price = $request->selling_price;
        $product->price_type = $request->price_type;
        // $product->product_image = $directory.$imageName;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => "Product Saved Successfully!!",
        ]);
    }

    public function edit_product($id)
    {
        $product = InventoryProduct::find($id);
        return response()->json([
            'status' => 200,
            'product' => $product,
        ]);
    }

    public function update_product(Request $request, $id)
    {
        $product = InventoryProduct::find($id);
        $product->category_id = $request->category_id;
        $product->product_code = $request->product_code;
        $product->product_name = $request->product_name;
        $product->pices_of_carton = $request->pices_of_carton;
        $product->warehouse_id = $request->warehouse_id;
        $product->sorting = $request->sorting;
        $product->unit = $request->unit;
        $product->opening_stock = $request->opening_stock;
        $product->buy_price = $request->buy_price;
        $product->cost = $request->cost;
        $product->selling_price = $request->selling_price;
        $product->price_type = $request->price_type;
        // $product->product_image = $directory.$imageName;
        $product->save();

        return response()->json([
            'status' => 200,
            'message' => "Product Updated Successfully!!",
        ]);
    }
}
