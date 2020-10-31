<?php

namespace App\Model\Vendor;

use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    protected $guarded = [];

    public function storeInvoice()
    {
        return $this->hasMany('App\Model\StoreInvoice\StoreInvoice','id','vendor_id');
    }
}
