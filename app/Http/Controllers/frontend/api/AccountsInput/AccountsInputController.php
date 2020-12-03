<?php

namespace App\Http\Controllers\frontend\api\AccountsInput;

use App\Http\Controllers\Controller;
use App\Model\AccountsInput\AccountsInput;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Request;

class AccountsInputController extends Controller
{

    public function index()
    {
        $inputs = DB::table('accounts_inputs')
            ->join('modules', 'accounts_inputs.input_type', 'modules.id')
            ->select('accounts_inputs.*', 'modules.name as m_name')
            ->get();
        return response()->json([
            'status' => 200,
            'inputs' => $inputs,
        ]);
    }

    public function add_input(Request $request)
    {
        $input = new AccountsInput();
        $input->name = $request->name;
        $input->input_type = $request->input_type;
        $input->status = $request->status;
        $input->save();
        return response()->json([
            'status' => 200,
            'message' => 'success',
        ]);
    }

    public function edit_input($id)
    {
        $input = AccountsInput::find($id);
        return response()->json([
            'status' => 200,
            'input' => $input,
        ]);
    }

    public function Update_input(Request $request, $id)
    {
        $input = AccountsInput::find($id);
        $input->name = $request->name;
        $input->input_type = $request->input_type;
        $input->save();
        return response()->json([
            'status' => 200,
            'input' => $input,
        ]);
    }


    public function all_module()
    {
        $module = DB::table('modules')->get();
        return response()->json([
            'status' => 200,
            'module' => $module,
        ]);
    }
}
