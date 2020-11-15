<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMenuSubmenuSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_submenu_settings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('root_id');
            $table->integer('ware_id')->unsigned();
            $table->integer('sequence_id');
            $table->integer('type')->comment('menu=1,submenu=2,module=3');
            $table->tinyInteger('status');
            $table->tinyInteger('trash')->default('1')->comment("delete=2");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_submenu_settings');
    }
}
