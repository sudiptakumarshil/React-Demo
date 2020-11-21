<?php

namespace App\Model\MenuSubmenuSetting;

use Illuminate\Database\Eloquent\Model;

class MenuSubmenuSetting extends Model
{
    public function submenu(){

        return $this->belongsTo(MenuSubmenuSetting::class, 'root_id');

    }
    public function getSubMenuList(){

        return $this->hasMany(MenuSubmenuSetting::class, 'root_id')->where('status',1);

    }
}
