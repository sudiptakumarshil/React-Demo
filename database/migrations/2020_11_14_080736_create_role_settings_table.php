<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRoleSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('role_settings', function (Blueprint $table) {
            $table->id();
            $table->string('role_name');
            $table->integer('role_type');
            $table->tinyInteger('status')->comment('active=1,inactive=2')->default('1');
            $table->tinyInteger('trash')->comment('delete=2');
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
        Schema::dropIfExists('role_settings');
    }
}
