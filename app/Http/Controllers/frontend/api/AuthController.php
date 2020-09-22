<?php

namespace App\Http\Controllers\frontend\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    public function UserLogin(Request $request)
    {

        $status=0;$msg="Invalid User";$info=array();
        $username=$request->username;
        $password=$request->password;
        $user_id=0;
        $userInfo=User::where("email",$username)->first();
        if(!empty($userInfo->status) && $userInfo->status == '1')
        {
            if (password_verify($request->password, $userInfo->password)) 
            {
                //
                $status=1;$msg="Success";
                $info=$userInfo;
                $user_id=$userInfo->id;
            }
        }
        
        $res["status"]=$status;
        $res["msg"]=$msg;
        $res["user_id"]=$user_id;
        $res["info"]=$info;
        echo json_encode($res);
        
    }
}
