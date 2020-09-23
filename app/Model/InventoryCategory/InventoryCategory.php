<?php

namespace App\Model\InventoryCategory;

use Illuminate\Database\Eloquent\Model;

class InventoryCategory extends Model
{
    protected  $table = "inventory_categories";
    protected  $guarded = [];

    public function subcategory(){
        return $this->hasMany('App\Model\InventoryCategory\InventoryCategory', 'root_id');


    }
}
