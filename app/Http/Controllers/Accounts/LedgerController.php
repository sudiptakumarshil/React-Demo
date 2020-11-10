<?php

namespace App\Http\Controllers\Accounts;

use App\Http\Controllers\Controller;
use App\Model\Accounts\Ledger;
use App\Model\Accounts\Setting;

class LedgerController extends Controller
{

    public function index()
    {

        $ledgers = Ledger::all();
        return response()->json([
            "status" => 200,
            "ledgers" => $ledgers,
        ]);
    }

    public function all_setting()
    {
        $setting = Setting::all();
        return response()->json([
            "status" => 200,
            "setting" => $setting,
        ]);
    }

}
