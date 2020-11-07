<?php

namespace App\Http\Controllers\frontend\api\Unit;

use App\Http\Controllers\Controller;
use App\Model\Unit\Unit;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class UnitController extends Controller
{
    public function index()
    {
        $unit = Unit::all();
        return response()->json([
            'status' => 200,
            'unit' => $unit,
        ]);
    }

    public function add_unit(Request $request)
    {
        $unitcode = DB::table('units')
            ->orderBy('id', 'desc')
            ->first();

        if (!empty($unitcode->unit_code)) {
            $unitCodes = $unitcode->unit_code + 1;

        } else {
            $unitCodes = 100;
        }

        $unit = new Unit();
        $unit->unit_name = $request->unit_name;
        $unit->unit_code = $unitCodes;
        $unit->status = $request->status;
        $unit->save();
        return response()->json([
            'status' => 200,
            'message' => 'success',
        ]);

    }

    public function edit_unit($id)
    {
        $unit = Unit::find($id);
        return response()->json([
            'status' => 200,
            'unit' => $unit,
        ]);
    }

    public function update_unit(Request $request, $id)
    {
        $unit = Unit::find($id);
        $unit->unit_name = $request->unit_name;
        $unit->unit_code = $request->unit_code;
        $unit->status = $request->status;
        $unit->save();
        return response()->json([
            'status' => 200,
            'message' => 'success',
        ]);
    }

}
