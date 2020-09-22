<?php

namespace App\Http\Controllers\Accounts;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Model\Accounts\Ledger;

class LedgerController extends Controller
{


    public function index(){

        $ledgers = Ledger::all();
        return response()->json([
            "status"=>200,
            "ledgers"=> $ledgers
        ]);
    }


}
