<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserRoleDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_role_details', function (Blueprint $table) {
            $table->id();
            $table->integer('root_id');
            $table->integer('sub_id');
            $table->integer('module_id');
            $table->integer('add_permission')->comment('permit=1');
            $table->integer('edit_permission')->comment('permit=1');
            $table->integer('delete_permission')->comment('permit=1');
            $table->integer('view_permission')->comment('permit=1');
            $table->integer('print_permission')->comment('permit=1');
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
        Schema::dropIfExists('user_role_details');
    }
}
