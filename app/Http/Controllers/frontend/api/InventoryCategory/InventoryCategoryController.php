<?php

namespace App\Http\Controllers\frontend\api\InventoryCategory;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Model\InventoryCategory\InventoryCategory;
use Illuminate\Support\Facades\DB;
class InventoryCategoryController extends Controller
{

    public function manage_invent_category()
    {
        $categories = InventoryCategory::where('root_id',0)->get();
        return response()->json([
            'status'=>200,
            'categories'=>$categories
        ]);
    }


    public function manage_invent_subcategory($id)
    {
        $category   = InventoryCategory::find($id);
        $categories = InventoryCategory::where('root_id',$id)->get();
        return response()->json([
            'status' => 200,
            'category'=>$category,
            'categories'=>$categories
        ]);

    }

    public function getAccountsInfoAsTree()
    {
        $others = array();
        $res = array();

        $data = self::getAccountsDataSet($res, 0, "", '-1', 0);
        $info["list"] = $data;
        $info["others"] = $others;
        echo json_encode($info);
    }
    public function getAccountsDataSet(&$res, $id, $title, $fid = 0, $is_store = 0)
    {

        $data['ware'] = $w = 0;
        $info=InventoryCategory::where(function($q) use ($w){
            $q->where("ware_id",$w)->orWhere("ware_id",0);
        })->where(function($q) use ($id,$fid){
            if ($id == $fid)
                $q->where("id",$id);
            else
                $q->where("root_id",$id);

        })->get();

        foreach ($info as $val) {
            $ara = array();
            $acc_ledger_id = 0;
            $acc_ledger_acc_id = 0;

            $ara["id"] = $val->id;
            $ara["text"] = $val->category_name;
            $ara["head_title"] = 0;
            $ara["name"] = $val->category_name;
            $ara["category_code"] = $val->category_code;
            $ara["invent_category"] ="";
            if(!empty($val->root_id))
                $ara["root_category"] = $val->subcategory->category_name;

            $ara["acc_code"] = $val->root_id;
            $ara["status"] = $val->status;
            $ara["tags"] = $val->status;
            $ara["note"] = 0;
            $ara["acc_ledger_id"] = 0;
            $ara["acc_ledger_acc_id"] = 0;
            $ara["children"] = array();
            //$this->getAccountsLedgerData($ara["nodes"], $val["id"], $val["name"]);
            self::getAccountsDataSet($ara["children"],$val->id, $val->category_name,  '-90', $is_store);
            array_push($res, $ara);
        }
        if ($id == $fid || $id == '0') {
            return $res;
        }
    }


    public function save_category(Request $request){


        // return $request->all();
        // exit();

        // $category = array();
        // $category['root_id'] = $request->root_id;
        // $category['category_name'] = $request->invent_category;
        // $category['status'] = $request->status;
        // DB::table('inventory_categories')->insert($category);

        $category  = new InventoryCategory();
        $category->root_id = $request->root_id;
        $category->category_name = $request->invent_category;
        $category->category_code = $request->category_code;
        $category->save();
        return response()->json([
            'status'=>200,
            'message'=>'Category Saved Successfully!!'
        ]);
    }


    public function update_category(Request $request,$id)
    {
        $category  = InventoryCategory::find($id);
        $category->category_name = $request->invent_category;
        // $category->status = $request->status;
        $category->save();
        return response()->json([
            'status'=>200,
            'message'=>'Category Updated Successfully!!'
        ]);
    }



}
