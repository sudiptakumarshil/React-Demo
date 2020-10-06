<?php

namespace App\Model\WareHouse;

use Illuminate\Database\Eloquent\Model;

class WareHouseDetails extends Model
{
    protected $guarded = [];

    public function store()
    {
        return $this->hasMany("App\Model\Store\Store", 'id');
    }
}
