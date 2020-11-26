<?php

namespace App\Http\Controllers\Accounts;

use App\Http\Controllers\Controller;
use App\Model\Accounts\Ledger;
use App\Model\Accounts\Setting;
use DB;
use Symfony\Component\HttpFoundation\Request;

class LedgerController extends Controller
{

    public function index()
    {

        // $ledgers = Ledger::all();
        $ledgers = Ledger::where("id", 751)->get();
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

    public function filter_accounts(Request $request)
    {
        $reqData = $request->filterdata;
        if (!empty($reqData)) {
            $result = DB::table('ledgers')
                ->where(function ($filter) use ($reqData) {
                    if (!empty($reqData)) {
                        // $filter->where('accounts_id', 'LIKE', "%{$reqData}");
                        $filter->where('ledger_title', 'LIKE', "%{$reqData}");
                    }
                })->get();
        }

        return response()->json([
            'result' => $result,
        ]);

        // echo json_encode($data);
    }

}
