<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceAccountDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_account_details', function (Blueprint $table) {
            $table->id();
            $table->integer('ware_id');
            $table->integer('invoice_type');
            $table->string('voucher_no');
            $table->date('date');
            $table->integer('ammount');
            $table->integer('description');
            $table->integer('cost_center_id');
            $table->string('ref_no');
            $table->string('doc_no');
            $table->string('trash')->comment('delete=2')->default(1);
            $table->string('status')->comment('active=1,inactive=2')->default(1);
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
        Schema::dropIfExists('invoice_account_details');
    }
}
