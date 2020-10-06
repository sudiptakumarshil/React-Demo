<?php

namespace App\Model\Store;

use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    protected $guarded = [];

    public function warhouse()
    {
        return $this->belongsTo('App\Model\WarHouse\WareHouseDetails', 'war_id');
    }
}
