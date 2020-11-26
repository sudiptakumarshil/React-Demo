<?php

namespace App\common;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
class ItemModel extends Model
{
    //
    public static function getItemClosing($item_id,$status=0){

        $def_status=" and status='1'";
        if(!empty($status))
            $def_status=" and status='2'";

        $closing_stock = DB::select(DB::raw("SELECT item_id, sum(d_qty) as d_qty,sum(d_qty) as c_qty,sum(d_qty-c_qty) as closing from (

            SELECT d_id as item_id, sum(quantity) as d_qty,0 c_qty FROM `invoice_trasections`
                WHERE d_id='$item_id' and trash !='2' ".$def_status."

                UNION

            SELECT c_id as item_id, 0 d_qty,sum(quantity) as c_qty FROM `invoice_trasections`
            WHERE c_id='$item_id' and trash !='2' ".$def_status."

                 ) as t WHERE item_id is not null GROUP by item_id"));

        $result=0;
        foreach ($closing_stock as $v_closing) {
            $result = $v_closing->closing;
        }
        return $result;
    }
}
