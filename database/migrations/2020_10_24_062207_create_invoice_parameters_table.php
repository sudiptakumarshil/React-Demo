<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceParametersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_parameters', function (Blueprint $table) {
            $table->id();
            $table->tinyInteger("type")->comment("new purshase =1 ,purshase return = 2, sale return =4 sale = 3");
            $table->tinyInteger("discount_method")->comment("invoice wise = 1 product wise = 2");
            $table->Integer("invoice_start_no");
            $table->tinyInteger("is_due_allow")->comment("id due allow = 2 or not allow = 3");
            $table->Integer("ware_id");
            $table->tinyInteger("status")->comment("active = 2 inactive = 3");
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
        Schema::dropIfExists('invoice_parameters');
    }
}
