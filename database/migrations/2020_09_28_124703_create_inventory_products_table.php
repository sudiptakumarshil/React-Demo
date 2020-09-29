<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInventoryProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('inventory_products', function (Blueprint $table) {
            $table->id();
            $table->integer("product_code")->unsigned();
            $table->string("product_name");
            $table->integer("pices_of_carton");
            $table->integer("category_id")->unsigned();
            $table->integer("warehouse_id")->unsigned();
            $table->string("sorting");
            $table->string("unit");
            $table->integer("opening_stock")->unsigned();
            $table->float("buy_price");
            $table->float("cost");
            $table->float("selling_price");
            $table->tinyInteger("price_type");
            $table->string("product_image");
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
        Schema::dropIfExists('inventory_products');
    }
}
