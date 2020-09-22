<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\File;

class BackupList extends Controller
{
    //
    public function backup_list()
    {
        return view('backup_list');
    }
    function getFile($filename)
    {
        $file=Storage::disk('local')->get("Laravel/".$filename);
        return (new Response($file, 200))
            ->header('Content-Type', 'zip');
    }
}
