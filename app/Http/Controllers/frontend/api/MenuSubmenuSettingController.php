<?php

namespace App\Http\Controllers\frontend\api;

use App\Http\Controllers\Controller;
use App\Model\MenuSubmenuSetting\MenuSubmenuSetting;
use DB;
use Illuminate\Http\Request;

class MenuSubmenuSettingController extends Controller
{

    public function get_menu_submenu()
    {

        $menu = MenuSubmenuSetting::where('root_id', 0)->where('status', 1)->where('trash', 1)->where('type', '!=', 3)->get();
        $res["list"] = array();

        foreach ($menu as $vsubmenu) {
            $ara = array();
            $ara['name'] = $vsubmenu->name;
            $ara['id'] = $vsubmenu->id;
            $ara['isChecked'] = false;
            $ara['sub_menu'] = $vsubmenu->getSubMenuList;

            array_push($res["list"], $ara);
        }

        return response()->json([
            'list' => $res,
        ]);

    }

    public function getMenuSubmenuInfoAsTree()
    {
        $others = array();
        $res = array();

        $data = self::getMenuSubmenuDataSet($res, 0, "", '-1', 0);
        $info["list"] = $data;
        echo json_encode($info);
    }
    public function getMenuSubmenuDataSet(&$res, $id, $title, $fid = 0, $is_store = 0)
    {

        $data['ware'] = $w = 0;
        $info = MenuSubmenuSetting::where(function ($q) use ($w) {
            $q->where("ware_id", $w)->orWhere("ware_id", 0);
        })->where(function ($q) use ($id, $fid) {
            if ($id == $fid) {
                $q->where("id", $id);
            } else {
                $q->where("root_id", $id);
            }
        })->where('trash', 1)->where('status',1)
            ->get();

        foreach ($info as $val) {
            $ara = array();
            $ara["id"] = $val->id;
            $ara["text"] = $val->name;
            $ara["name"] = $val->name;
            if (!empty($val->root_id)) {
                $ara["root_menu"] = $val->submenu->name;
            }
            $ara["root"] = $val->root_id;
            $ara["type"] = $val->type;
            $ara["children"] = array();
            self::getMenuSubmenuDataSet($ara["children"], $val->id, $val->name, '-90', $is_store);
            array_push($res, $ara);
        }

        if ($id == $fid || $id == '0') {
            return $res;
        }

    }

    public function getModuleSubmoduleInfoAsTree()
    {
        $others = array();
        $res = array();

        $data = self::getModuleSubmoduleDataSet($res, 0, "", '-1', 0);
        $info["list"] = $data;
        echo json_encode($info);
    }
    public function getModuleSubmoduleDataSet(&$res, $id, $title, $fid = 0, $is_store = 0)
    {

        $data['ware'] = $w = 0;
        $info = MenuSubmenuSetting::where(function ($q) use ($w) {
            $q->where("ware_id", $w)->orWhere("ware_id", 0);
        })->where(function ($q) use ($id, $fid) {
            if ($id == $fid) {
                $q->where("id", $id);
            } else {
                $q->where("root_id", $id);
            }
        })->where('trash', 1)->where('type', 3)
            ->get();

        foreach ($info as $val) {
            $ara = array();
            $ara["id"] = $val->id;
            $ara["text"] = $val->name;
            $ara["name"] = $val->name;
            if (!empty($val->root_id)) {
                $ara["root_menu"] = $val->submenu->name;
            }
            $ara["root"] = $val->root_id;
            $ara["type"] = $val->type;
            $ara["children"] = array();
            self::getModuleSubmoduleDataSet($ara["children"], $val->id, $val->name, '-90', $is_store);
            array_push($res, $ara);
        }

        if ($id == $fid || $id == '0') {
            return $res;
        }

    }

    public function save_menu_submenu(Request $request)
    {
        $menu = new MenuSubmenuSetting();
        // if (!empty($menu->root_id)) {
        $menu->root_id = $request->root_id;
        // } else {
        //     $menu->root_id = 0;
        // }
        $menu->name = $request->invent_category;
        $menu->link_id = $request->link_id;
        $menu->type = $request->type;
        $menu->status = $request->status;
        $menu->save();
        return response()->json([
            'status' => 200,
            'message' => 'Menu Saved Successfully!!',
        ]);
    }

    public function update_menu_submenu(Request $request, $id)
    {
        $menu = MenuSubmenuSetting::find($id);
        $menu->name = $request->invent_category;
        $menu->link_id = $request->link_id;
        $menu->type = $request->type;
        $menu->status = $request->status;
        $menu->save();
        return response()->json([
            'status' => 200,
            'message' => 'Menu Updated Successfully!!',
        ]);
    }

    public function delete_menu_submenu($id)
    {

        $menu = DB::table('menu_submenu_settings')
            ->where('root_id', $id)
            ->first();
        if ($menu) {
            return response()->json([
                'message' => 'this Menu Contain Sub Menu, You Cannot Delete It !!',
            ]);
        } else {
            $delete = MenuSubmenuSetting::find($id);
            $delete->trash = 2;
            $delete->save();
            return response()->json([
                'message' => 'Menu deleted Successfully!!',
            ]);

        }
    }

    public function savemodule_submodule(Request $request)
    {
        $menu = new MenuSubmenuSetting();
        // if (!empty($menu->root_id)) {
        $menu->root_id = $request->root_id;
        // } else {
        //     $menu->root_id = 0;
        // }
        $menu->name = $request->invent_category;
        $menu->type = 3;
        $menu->status = $request->status;
        $menu->save();
        return response()->json([
            'status' => 200,
            'message' => 'Module Saved Successfully!!',
        ]);
    }

    public function update_module(Request $request, $id)
    {
        $menu = MenuSubmenuSetting::find($id);
        $menu->name = $request->invent_category;
        $menu->status = $request->status;
        $menu->save();
        return response()->json([
            'status' => 200,
            'message' => 'Menu Saved Successfully!!',
        ]);
    }

    public function delete_module($id)
    {
        $menu = DB::table('menu_submenu_settings')
            ->where('root_id', $id)
            ->first();
        if ($menu) {
            return response()->json([
                'message' => 'this Menu Contain Sub Menu, You Cannot Delete It !!',
            ]);
        } else {
            $delete = MenuSubmenuSetting::find($id);
            $delete->trash = 2;
            $delete->save();
            return response()->json([
                'message' => 'Menu deleted Successfully!!',
            ]);

        }
    }

}
