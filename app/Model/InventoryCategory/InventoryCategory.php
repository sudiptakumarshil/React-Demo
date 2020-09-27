<?php

namespace App\Model\InventoryCategory;

use Illuminate\Database\Eloquent\Model;

class InventoryCategory extends Model
{
    protected  $table = "inventory_categories";
    protected  $guarded = [];

    public function subcategory(){
        return $this->belongsTo(InventoryCategory::class,'root_id');

    }
}
