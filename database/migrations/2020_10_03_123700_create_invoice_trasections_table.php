<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceTrasectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_trasections', function (Blueprint $table) {
            $table->id();
            $table->integer("invoice_id")->unsigned();
            $table->integer("d_id")->unsigned();
            $table->integer("c_id")->unsigned();
            $table->integer("parent_id")->unsigned();
            $table->date("date");
            $table->integer("ware_id")->unsigned();
            $table->tinyInteger("status");
            $table->integer("store_id")->unsigned();
            $table->float("quantity");
            $table->integer("price");
            $table->float("discount_taka");
            $table->float("discount_percent");
            $table->float("vat")->unsigned();
            $table->integer("publishing_by")->unsigned();
            $table->integer("type");
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
        Schema::dropIfExists('invoice_trasections');
    }
}
