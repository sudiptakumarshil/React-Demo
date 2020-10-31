<?php

namespace App\Model\StoreInvoice;

use Illuminate\Database\Eloquent\Model;

class StoreInvoice extends Model
{
    protected $guarded = [];

    public function wareHouse()
    {
        return $this->belongsTo('App\Model\WareHouse\WareHouseDetails', 'id', 'ware_id');
    }

    public function vendor()
    {
        return $this->belongsTo('App\Model\Vendor\Vendor', 'id', 'vendor_id');
    }

    public function store()
    {
        return $this->belongsTo('App\Model\Store\Store', 'id', 'store_id');
    }
}
