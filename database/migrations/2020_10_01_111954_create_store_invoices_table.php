<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStoreInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('store_invoices', function (Blueprint $table) {
            $table->id();
            $table->integer("invoice_number");
            $table->string("type");
            $table->integer("vendor_id")->unsigned();
            $table->integer("ware_id")->unsigned();
            $table->date("date");
            $table->integer("posting_by")->unsigned();
            $table->integer("store_id")->unsigned();
            $table->float("gross_amount");
            $table->float("discount_taka");
            $table->float("discount_percent");
            $table->float("cash_amount");
            $table->string("bank_account");
            $table->integer("bank_id");
            $table->text("remarks");
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
        Schema::dropIfExists('store_invoices');
    }
}
