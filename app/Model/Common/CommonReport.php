<?php

namespace App\Model\Common;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class CommonReport extends Model
{
    //
    public static function getRawSqlData($sql){
        return $info=  DB::select(DB::raw($sql));
    }
}
