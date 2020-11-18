<?php

namespace App\Http\Controllers\frontend\api;

use App\Http\Controllers\Controller;
use App\Model\MenuSubmenuSetting\MenuSubmenuSetting;
use Illuminate\Http\Request;

class MenuSubmenuSettingController extends Controller
{

    public function get_menu_submenu()
    {

        $menu = MenuSubmenuSetting::where('root_id', 0)->get();
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

    public function save_menu(Request $request)
    {
        $submenu = count($request->submenuList);
        for ($i = 0; $i < $submenu; $i++) {
            $menu = $submenu[$i];
        }
    }

}
