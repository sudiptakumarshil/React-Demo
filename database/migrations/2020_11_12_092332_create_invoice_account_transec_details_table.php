<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInvoiceAccountTransecDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_account_transec_details', function (Blueprint $table) {
            $table->id();
            $table->integer('debit_id')->unsigned();
            $table->integer('credit_id')->unsigned();
            $table->integer('group_account_code');
            $table->integer('invoice_acc_details_id')->unsigned();
            $table->date('date');
            $table->integer('ware_id')->unsigned();
            $table->text('remarks');
            $table->string('ammount');
            $table->integer('cost_center_id');
            $table->integer('cheque_number');
            $table->integer('cheque_date');
            $table->integer('trash')->comment('delete=2')->default(1);
            $table->tinyInteger('status')->comment('active=1,inactive=2')->default(1);
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
        Schema::dropIfExists('invoice_account_transec_details');
    }
}
