<?php

namespace App\Http\Controllers\frontend\api\Size;

use App\Http\Controllers\Controller;
use App\Model\Size\Size;
use Illuminate\Http\Request;

class SizeController extends Controller
{

    public function add_size(Request $request)
    {
        $addSize = new Size();
        $addSize->name = $request->name;
        $addSize->status = $request->status;
        $addSize->save();
        return response()->json([
            'status' => 200,
            'message' => "size added successfully",
        ]);

    }

    public function manage_size()
    {
        $size = Size::all();
        return response()->json([
            'status' => 200,
            'size' => $size,
        ]);

    }

    public function edit_size($id)
    {
        $size = Size::find($id);
        return response()->json([
            'status' => 200,
            'size' => $size,
        ]);
    }

    public function update_size(Request $request, $id)
    {
        $updateSize = new Size();
        $updateSize->name = $request->name;
        $updateSize->status = $request->status;
        $updateSize->save();
        return response()->json([
            'status' => 200,
            'message' => "size Updated successfully!!",
        ]);
    }
}
